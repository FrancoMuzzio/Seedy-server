require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User } = require("../models");
const { Op } = require("sequelize");
const sgMail = require("@sendgrid/mail");

exports.register = async (req, res) => {
  const { username, email, picture, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send("All fields are required: username, email, picture, password");
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
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
        picture: user.picture,
      },
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
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
  await user.save();
  console.log("APIKEY")
  console.log(process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.email,
    from: "support@seedy.com.ar",
    subject: "🌱 Reset Your Password at Seedy",
    text: `Hello Plant Lover! 🌿
  
  We've received a request to reset your password for Seedy. We're here to help you quickly get back to our green community.
  
  Password Reset Token: ${user.resetPasswordToken}
  
  Please enter this token in the app to set your new password. This token is valid for 1 hour.
  
  If you did not request a password reset, you can safely ignore this email. Your account is secure.
  
  Thank you for being a part of our Seedy community!
  The Seedy Team 🌼`,

    html: `<div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2E7D32;">Hello Plant Lover! 🌿</h2>
      <p>We've received a request to reset your password for <strong>Seedy</strong>. We're here to help you quickly get back to our green community.</p>
      <p><b>Password Reset Token:</b> <span style="color: #388E3C;"><strong>${user.resetPasswordToken}</strong></span></p>
      <p>Please enter this token in the app to set your new password. This token is valid for 1 hour.</p>
      <p>If you did not request a password reset, you can safely ignore this email. Your account is secure.</p>
      <p>Thank you for being a part of our <strong>Seedy</strong> community!</p>
      <p style="margin-top: 30px; color: #4CAF50;"><b>The Seedy Team</b> 🌼</p>
    </div>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.info("Correo enviado");
      return res.json({
        message: "Email sent with instructions to reset password",
      });
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      return res.status(500).send({ message: "Error sending reset email." });
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
