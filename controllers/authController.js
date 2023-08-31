const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
const { transporter, supportEmail } = require("./emailController");
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  res.send("User registered successfully");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ username: user.username }, "secret-key");
    res.send(token);
  } else {
    res.status(401).send("Invalid credentials");
  }
};

exports.protected = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, "secret-key");
    res.send(`Hello ${payload.username}`);
  } catch {
    res.status(401).send("Not authorized");
  }
};

exports.checkUsername = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    res.json({ message: "Username is available" });
  }
};

exports.checkEmail = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    res.json({ message: "Email is available" });
  }
};

exports.sendTestEmail = (req, res) => {
  let mailOptions = {
    from: supportEmail,
    to: user.email,
    subject: "Restablecimiento de Contraseña",
    text: `Hola, 
           Recibimos una solicitud para restablecer tu contraseña. 
           Por favor, usa el siguiente token para restablecerla: ${resetToken}
           Si no hiciste esta solicitud, ignora este correo.`,
    html: `<b>Hola,</b> 
              <p>Recibimos una solicitud para restablecer tu contraseña.</p>
              <p>Por favor, usa el siguiente token para restablecerla: <strong>${resetToken}</strong></p>
              <p>Si no hiciste esta solicitud, ignora este correo.</p>`,
  };

  // Enviar correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
      return res
        .status(500)
        .send({ message: "Error al enviar el correo de restablecimiento." });
    } else {
      console.log("Correo enviado:", info.response);
      return res.json({
        message: "Correo enviado con instrucciones para restablecer contraseña",
      });
    }
  });
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Generar token
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  console.log("Token generado:", user.resetPasswordToken);
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();

  const mailOptions = {
    from: supportEmail,
    to: user.email,
    subject: "Restablecimiento de Contraseña",
    text: `Hola, 
           Recibimos una solicitud para restablecer tu contraseña. 
           Por favor, usa el siguiente token para restablecerla: ${user.resetPasswordToken}
           Si no hiciste esta solicitud, ignora este correo.`,
    html: `<b>Hola,</b> 
           <p>Recibimos una solicitud para restablecer tu contraseña.</p>
           <p>Por favor, usa el siguiente token para restablecerla: <strong>${user.resetPasswordToken}</strong></p>
           <p>Si no hiciste esta solicitud, ignora este correo.</p>`,
  };

  // Enviar correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
      return res
        .status(500)
        .send({ message: "Error al enviar el correo de restablecimiento." });
    } else {
      console.log("Correo enviado:", info.response);
      return res.json({
        message: "Correo enviado con instrucciones para restablecer contraseña",
      });
    }
  });

  res.json({
    message: "Correo enviado con instrucciones para restablecer contraseña",
  });
};

exports.resetPassword = async (req, res) => {
  const user = await User.findOne({
    where: {
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { [Op.gt]: Date.now() },
    },
  });
  if (!user) {
    return res.status(400).json({ message: "Token expirado" });
  }

  // hasheo de password
  user.password = await bcrypt.hash(req.body.newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: "Contraseña actualizada con éxito" });
};
