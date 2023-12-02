const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     description: Crea un nuevo usuario con un nombre de usuario, correo electrónico, imagen y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario para el nuevo usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico del usuario.
 *               picture:
 *                 type: string
 *                 description: URL relativa de la imagen de perfil del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "User registered successfully"
 *       400:
 *         description: Nombre de usuario o correo electrónico no disponibles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Username or email already exists"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/register", authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Auth]
 *     description: Autentica a un usuario mediante nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     picture:
 *                       type: string
 *             example: 
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               userInfo:
 *                 id: 1
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *                 picture: "/images/profile/john_doe.png"
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Invalid credentials"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/login", authController.login);

/**
 * @swagger
 * /check-username:
 *   post:
 *     summary: Verifica la disponibilidad de un nombre de usuario
 *     tags: [Auth]
 *     description: Comprueba si un nombre de usuario está disponible para ser utilizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario a verificar.
 *     responses:
 *       200:
 *         description: Nombre de usuario disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Username is available"
 *       409:
 *         description: Nombre de usuario ya en uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Username already exists"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/check-username", authController.checkUsername);

/**
 * @swagger
 * /check-email:
 *   post:
 *     summary: Verifica la disponibilidad de un correo electrónico
 *     tags: [Auth]
 *     description: Comprueba si un correo electrónico está disponible.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico a verificar.
 *     responses:
 *       200:
 *         description: Correo electrónico disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Email is available"
 *       409:
 *         description: Correo electrónico ya en uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Email already exists"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/check-email", authController.checkEmail);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Solicita restablecimiento de contraseña
 *     tags: [Auth]
 *     description: Envía un correo electrónico con un token para restablecer la contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico asociado a la cuenta.
 *     responses:
 *       200:
 *         description: Correo electrónico de restablecimiento enviado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Email sent with instructions to reset password"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "User not found"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error sending reset email"
 */

router.put("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /reset-password:
 *   put:
 *     summary: Restablece la contraseña del usuario
 *     tags: [Auth]
 *     description: Permite a un usuario restablecer su contraseña usando un token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de restablecimiento de contraseña.
 *               newPassword:
 *                 type: string
 *                 description: La nueva contraseña.
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Password successfully updated"
 *       400:
 *         description: Token inválido o expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Expired token"
 *       500:
 *         description: Error interno del servidor.
 */

router.put("/reset-password", authController.resetPassword);

module.exports = router;
