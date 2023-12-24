const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticateJWT = require("../middlewares/authMiddleware");


// ... Documentación de Swagger ...

/**
 * @swagger
 * /chat/history/{communityId}:
 *   get:
 *     summary: Recupera el historial de mensajes de una comunidad específica
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene todos los mensajes de una comunidad específica almacenados en la base de datos.
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         description: ID numérico de la comunidad.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial de mensajes obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del mensaje.
 *                     example: 1
 *                   text:
 *                     type: string
 *                     description: El contenido del mensaje.
 *                     example: "Hola, ¿cómo estás?"
 *                   user_id:
 *                     type: integer
 *                     description: El ID del usuario que envió el mensaje.
 *                     example: 123
 *                   community_id:
 *                     type: integer
 *                     description: El ID de la comunidad a la que pertenece el mensaje.
 *                     example: 456
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
 *               message: "Error processing request."
 */
router.get("/chat/history/:communityId", authenticateJWT, chatController.getChatHistory);


module.exports = router;
