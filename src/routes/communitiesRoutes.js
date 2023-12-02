const express = require("express");
const router = express.Router();
const communitiesController = require("../controllers/communitiesController");
const authenticateJWT = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /communities:
 *   get:
 *     summary: Lista todas las comunidades
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comunidades obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   picture:
 *                     type: string
 *                   userCount:
 *                     type: integer
 *             example:
 *               - id: 1
 *                 name: "Houseplanters"
 *                 description: "A community for houseplant lovers."
 *                 picture: "/uploads/communities/1/cp_34324234234.jpg"
 *                 userCount: 157
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

router.get("/communities", authenticateJWT, communitiesController.list);

/**
 * @swagger
 * /communities/check-name:
 *   post:
 *     summary: Verifica la disponibilidad del nombre de una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la comunidad a verificar.
 *               ignore_community_id:
 *                 type: string
 *                 description: ID de la comunidad a ignorar.
 *     responses:
 *       200:
 *         description: Nombre de comunidad disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Community name is available"
 *       409:
 *         description: Nombre de comunidad ya en uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: 
 *               message: "Community name already exists"
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

router.post(
  "/communities/check-name",
  authenticateJWT,
  communitiesController.checkName
);

/**
 * @swagger
 * /communities/create:
 *   post:
 *     summary: Crea una nueva comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - picture
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la nueva comunidad.
 *               description:
 *                 type: string
 *                 description: Descripción de la comunidad.
 *               picture:
 *                 type: string
 *                 description: URL relativa de la nueva imagen de la comunidad.
 *     responses:
 *       200:
 *         description: Comunidad creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *             example:
 *               message: "Community registered successfully"
 *               id: 2
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

router.post(
  "/communities/create",
  authenticateJWT,
  communitiesController.create
);

/**
 * @swagger
 * /communities/{community_id}/change-image:
 *   put:
 *     summary: Cambia la imagen de una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la comunidad.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               picture:
 *                 type: string
 *                 description: URL relativa de la nueva imagen de la comunidad.
 *     responses:
 *       200:
 *         description: Imagen de la comunidad actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Community image updated successfully"
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

router.put(
  "/communities/:community_id/change-image",
  authenticateJWT,
  communitiesController.changeImage
);

/**
 * @swagger
 * /communities/{community_id}/give-role-to-user:
 *   post:
 *     summary: Asigna un rol a un usuario en la comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la comunidad.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - role
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que se le asignará el rol.
 *               role:
 *                 type: string
 *                 description: Rol a asignar al usuario.
 *     responses:
 *       200:
 *         description: Rol asignado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Role assigned successfully"
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

router.post(
  "/communities/:community_id/give-role-to-user",
  authenticateJWT,
  communitiesController.giveUserCommunityRole
);

/**
 * @swagger
 * /communities/{community_id}/create-category:
 *   post:
 *     summary: Crea una categoría en una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la comunidad.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la nueva categoría.
 *               description:
 *                 type: string
 *                 description: Descripción opcional de la categoría.
 *     responses:
 *       200:
 *         description: Categoría creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *             example:
 *               message: "Category created successfully"
 *               id: 4
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

router.post(
  "/communities/:community_id/create-category",
  authenticateJWT,
  communitiesController.createCategory
);

/**
 * @swagger
 * /communities/{community_id}/members:
 *   get:
 *     summary: Obtiene los miembros de una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la comunidad.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Miembros de la comunidad obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   picture:
 *                     type: string
 *                   role:
 *                     type: string
 *                   role_display_name:
 *                     type: string
 *             example:
 *               - id: 1
 *                 username: "user123"
 *                 picture: "/uploads/users/1/pp_15418551.jpg.jpg"
 *                 role: "member"
 *                 role_display_name: "Miembro"
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


router.get(
  "/communities/:community_id/members",
  authenticateJWT,
  communitiesController.getMembers
);

/**
 * @swagger
 * /communities/{community_id}/categories:
 *   get:
 *     summary: Obtiene las categorías de una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la comunidad.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categorías de la comunidad obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *             example:
 *               - id: 1
 *                 name: "Succulents"
 *                 description: "Everything about succulents"
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

router.get(
  "/communities/:community_id/categories",
  authenticateJWT,
  communitiesController.getCategories
);

/**
 * @swagger
 * /communities/posts:
 *   post:
 *     summary: Obtiene los posts de una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - communityId
 *             properties:
 *               communityId:
 *                 type: string
 *                 description: ID de la comunidad cuyos posts se quieren obtener.
 *     responses:
 *       200:
 *         description: Posts de la comunidad obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   user_id:
 *                     type: integer
 *                   category_id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: 1
 *                 title: "Better care for your cacti"
 *                 user_id: 2
 *                 category_id: 1
 *                 date: "2023-04-12T15:00:00Z"
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

router.post(
  "/communities/posts",
  authenticateJWT,
  communitiesController.getPosts
);

/**
 * @swagger
 * /communities/{communityId}:
 *   delete:
 *     summary: Elimina una comunidad
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         description: ID de la comunidad a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comunidad eliminada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Community deleted successfully"
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
            
router.delete(
  "/communities/:communityId",
  authenticateJWT,
  communitiesController.deleteCommunity
);

module.exports = router;
