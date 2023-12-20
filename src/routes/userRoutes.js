const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /user/{user_id}/edit:
 *   put:
 *     summary: Edita un usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario a editar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nuevo nombre de usuario.
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario.
 *               picture:
 *                 type: string
 *                 description: Nueva imagen de perfil del usuario.
 *     responses:
 *       200:
 *         description: Usuario editado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 picture:
 *                   type: string
 *             example:
 *               id: 1
 *               username: "newUsername"
 *               email: "newEmail@example.com"
 *               picture: "newPicture.jpg"
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
 *               message: "Error editing user"
 */

router.put("/user/:user_id/edit", authenticateJWT, userController.edit);

module.exports = router;
