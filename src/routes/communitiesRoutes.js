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
  communitiesController.checkCommunityName
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
 * /communities/{community_id}/user/{user_id}/role:
 *   get:
 *     summary: Devuelve el rol de un usuario en una determinada comunidad.
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
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol de usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 display_name:
 *                   type: string
 *             example:
 *               role_id: 1
 *               name: "Member"
 *               display_name: "community_member"
 *       400:
 *         description: Parámetros faltantes o incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *                 message: "Parameters missing: user_id, or community_id not present"
 *       404:
 *         description: Usuario no tiene rol en comunidad.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *                 message: "This user have no role in that community"

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
 *                 message: "Internal Server Error"

 */

router.get(
  "/communities/:community_id/user/:user_id/role",
  authenticateJWT,
  communitiesController.getUserRole
);

/**
 * @swagger
 * /communities/{community_id}/category/create:
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
 *       400:
 *         description: Parametros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Parameters missing: name, description, or community_id not present"
 *       409:
 *         description: Categoria existente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "A category with this name already exists in the community"
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
  "/communities/:community_id/category/create",
  authenticateJWT,
  communitiesController.createCategory
);

/**
 * @swagger
 * /communities/{community_id}/categories/check-name:
 *   post:
 *     summary: Verifica la disponibilidad del nombre de una categoria
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
 *                 description: Nombre de la categoria a verificar.
 *               ignore_category_id:
 *                 type: string
 *                 description: ID de la categoria a ignorar.
 *     responses:
 *       200:
 *         description: Nombre de categoria disponible.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Catergory name is available"
 *       409:
 *         description: Nombre de categoria ya en uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Category name already exists"
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
  "/communities/:community_id/categories/check-name",
  authenticateJWT,
  communitiesController.checkCategoryName
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
 *   post:
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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *                 description: Número de página.
 *               limit:
 *                 type: integer
 *                 description: Maximo de items.
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

router.post(
  "/communities/:community_id/categories",
  authenticateJWT,
  communitiesController.getCategories
);

/**
 * @swagger
 * /communities/{community_id}/posts:
 *   post:
 *     summary: Obtiene los posts de una comunidad
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
 *               - community_id
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: ID de la categoria cuyos posts se quieren obtener.
 *               limit:
 *                 type: integer
 *                 description: Límite de posts a traer.
 *                 default: 5
 *               page:
 *                 type: integer
 *                 description: Número de página
 *                 default: 5
 *     responses:
 *       200:
 *         description: Posts de la comunidad obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       category_id:
 *                         type: integer
 *                       category:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       user:
 *                         type: object
 *                         properties:
 *                          id:
 *                            type: integer
 *                          username:
 *                            type: string
 *                          email:
 *                            type: string
 *                          picture:
 *                            type: string
 *                          userCommunities:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                role_id:
 *                                  type: integer
 *                                role:
 *                                  type: object
 *                                  properties:
 *                                    name:
 *                                      type: string
 *                   totalPages:
 *                     type: int
 *             example:
 *               posts:
 *                 - id: 1
 *                   title: "Better care for your cacti"
 *                   category_id: 1
 *                   category:
 *                     name: "general"
 *                   createdAt: "2023-04-12T15:00:00Z"
 *                   user:  # Ejemplo de objeto de usuario
 *                     id: 2
 *                     username: "JohnDoe"
 *                     email: "johndoe@example.com"
 *                     picture: "/path/to/profile/picture.jpg"
 *                     userCommunities:
 *                       - role_id: 1
 *                         role:
 *                           name: "community_founder"
 *               totalPages: 5
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
  "/communities/:community_id/posts",
  authenticateJWT,
  communitiesController.getPosts
);

/**
 * @swagger
 * /communities/post/{post_id}:
 *   get:
 *     summary: Obtiene la publicación con el ID requerido
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID de la publicación.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categorías de la comunidad obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *                 category_id:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *                 id: 1
 *                 title: "Tipos de suculentas"
 *                 content: "<div>lorem ipsum</div>"
 *                 user_id: 1
 *                 category_id: 1
 *                 createdAt: "2023-12-05 22:22:11"
 *                 updatedAt: "2023-12-05 22:22:11"
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
  "/communities/posts/:post_id",
  authenticateJWT,
  communitiesController.getPost
);

/**
 * @swagger
 * /communities/categories/{category_id}/posts/create:
 *   post:
 *     summary: Crea una nueva publicación
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
 *               - title
 *               - content
 *               - categoy_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Titulo de la publicación.
 *               description:
 *                 type: string
 *                 description: Contenido html de la publicación.
 *               picture:
 *                 type: string
 *                 description: ID de la categoria de la publicación.
 *     responses:
 *       200:
 *         description: Publicación creada con éxito.
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
 *               message: "Post registered successfully"
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
  "/communities/categories/:category_id/posts/create",
  authenticateJWT,
  communitiesController.createPost
);

/**
 * @swagger
 * /communities/{community_id}:
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
