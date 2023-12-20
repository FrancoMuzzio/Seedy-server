require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models");
const { transporter, supportEmail } = require("./emailController");
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  const { username, email, picture, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required: username, email, picture, password");
  }

  try {
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ username }, { email }] 
      } 
    });

    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      picture, 
      password: hashedPassword,
    });

    res.send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const response = {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
      userInfo: {
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture
      }
    };
    res.send(response);
  } else {
    res.status(401).send("Invalid credentials");
  }
};

exports.checkUsername = async (req, res) => {
  const { username, ignore_user_id } = req.body;
  let whereConditions = { username };
  if (ignore_user_id) {
    whereConditions.id = { [Op.ne]: ignore_user_id };
  }
  const user = await User.findOne({ where: whereConditions });
  if (user) {
    res.status(409).json({ message: "Username already exists" });
  } else {
    res.json({ message: "Username is available" });
  }
};

exports.checkEmail = async (req, res) => {
  const { email, ignore_user_id } = req.body;
  let whereConditions = { email };
  if (ignore_user_id) {
    whereConditions.id = { [Op.ne]: ignore_user_id };
  }
  const user = await User.findOne({ where: whereConditions });
  if (user) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    res.json({ message: "Email is available" });
  }
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  // Generar token
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
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
      console.error("Error al enviar el correo:", error);
      return res
        .status(500)
        .send({ message: "Error sending reset email." });
    } else {
      console.info("Correo enviado:", info.response);
      return res.json({
        message: "Email sent with instructions to reset password",
      });
    }
  });

  res.json({
    message: "Email sent with instructions to reset password",
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
    return res.status(400).json({ message: "Expired token" });
  }

  // hasheo de password
  user.password = await bcrypt.hash(req.body.newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: "Password successfully updated" });
};