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
 * /communities/{community_id}/edit:
 *   put:
 *     summary: Edita una comunidad existente
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID único de la comunidad a editar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la comunidad.
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la comunidad.
 *               imageUrl:
 *                 type: string
 *                 description: URL de la nueva imagen de la comunidad.
 *             example:
 *               name: Comunidad de Jardinería
 *               description: Una comunidad para entusiastas de la jardinería.
 *               imageUrl: /uploads/communities/1/cp_1703744895803.jpg
 *     responses:
 *       200:
 *         description: Comunidad editada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Community'
 *       404:
 *         description: Comunidad no encontrada.
 *       500:
 *         description: Error del servidor.
 */

router.put(
  "/communities/:community_id/edit",
  authenticateJWT,
  communitiesController.edit
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
 *     summary: Asigna un rol a un usuario en la comunidad, asigna automáticamente "system_admin" a administradores
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
 *               - user_id
 *               - role
 *             properties:
 *               user_id:
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
 * /communities/{community_id}/user:
 *   delete:
 *     summary: Elimina un usuario de una comunidad
 *     tags: [Communities]
 *     description: Este endpoint elimina un usuario de una comunidad específica. Puede eliminar un usuario específico o al usuario que realiza la solicitud.
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID de la comunidad
 *       - in: body
 *         name: user_id
 *         required: false
 *         description: id de usuario para eliminar de la comunidad, de no existir se eliminara uno mismo
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: integer
 *               description: El ID del usuario a eliminar. Si no se proporciona, se utilizará el ID del usuario que hace la solicitud.
 *     responses:
 *       200:
 *         description: Usuario eliminado de la comunidad exitosamente
 *         content:
 *           application/json:
 *             examples:
 *               exitoso:
 *                 value: { "message": "User deleted from community successfully" }
 *       404:
 *         description: Usuario no encontrado en la comunidad
 *         content:
 *           application/json:
 *             examples:
 *               noEncontrado:
 *                 value: { "message": "User not found in community" }
 *       500:
 *         description: Error al eliminar el usuario de la comunidad
 *         content:
 *           application/json:
 *             examples:
 *               error:
 *                 value: { "message": "Error deleting user from community" }
 */
router.delete(
  "/communities/:community_id/user",
  authenticateJWT,
  communitiesController.deleteUserFromCommunity
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
 * /communities/category/:category_id/edit:
 *   put:
 *     summary: Edita una categoría
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         description: ID de la categoría a editar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de categoría.
 *               description:
 *                 type: string
 *                 description: Nueva descripcion de categoría.
 *     responses:
 *       200:
 *         description: Categoría editada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *             example:
 *               id: 1
 *               name: "Mercado"
 *               description: "Compra y venta de insumos"
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Category not found"
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
 *               message: "Error editing category"
 */

router.put(
  "/communities/category/:category_id/edit",
  authenticateJWT,
  communitiesController.editCategory
);

/**
 * @swagger
 * /communities/category/{category_id}:
 *   delete:
 *     summary: Elimina una categoría específica
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Category deleted successfully"
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Category not found"
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
 *               message: "Error deleting category"
 */

router.delete(
  "/communities/category/:category_id",
  authenticateJWT,
  communitiesController.deleteCategory
);

/**
 * @swagger
 * /communities/category/posts/migrate:
 *   put:
 *     summary: Migra los posts de una categoría a otra
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
 *               - from_category_id
 *               - to_category_id
 *             properties:
 *               from_category_id:
 *                 type: integer
 *                 description: ID de la categoría desde la cual se migrarán los posts.
 *               to_category_id:
 *                 type: integer
 *                 description: ID de la categoría a la cual se migrarán los posts.
 *     responses:
 *       200:
 *         description: Posts migrados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Posts migrated successfully"
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
 *               message: "Error editing category"
 */

router.put(
  "/communities/category/posts/migrate",
  authenticateJWT,
  communitiesController.migratePosts
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
 *                   postCount:
 *                     type: integer
 *             example:
 *               - id: 1
 *                 name: "Succulents"
 *                 description: "Everything about succulents"
 *                 postCount: 325
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
 *                   user:
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
 * /communities/posts/{post_id}/content:
 *   get:
 *     tags: [Communities]
 *     summary: Obtiene el contenido de un post específico
 *     description: Devuelve el contenido del post identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del post
 *     responses:
 *       200:
 *         description: Contenido del post obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *             examples:
 *               responseExample:
 *                 value:
 *                   content: "<div>Contenido del post</div>"
 *       404:
 *         description: Post no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               responseExample:
 *                 value:
 *                   message: "Post not found."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               responseExample:
 *                 value:
 *                   message: "Internal Server Error"
 */

router.get(
  "/communities/posts/:post_id/content",
  communitiesController.getPostContentById
);

/**
 * @swagger
 * /communities/{community_id}/post/{post_id}:
 *   get:
 *     summary: Obtiene la publicación con el ID requerido
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: community_id
 *         required: true
 *         description: ID de la communidad.
 *         schema:
 *           type: string
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
 *                 category_id:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 user:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: integer
 *                    username:
 *                      type: string
 *                    picture:
 *                      type: string
 *                    userCommunities:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          role_id:
 *                            type: integer
 *                          role:
 *                            type: object
 *                            properties:
 *                              name:
 *                                type: string
 *                 commentReactions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         description: id del usuario que reacciono al comentario
 *                       type:
 *                         type: string
 *                         description: tipo de reacción
 *             example:
 *                 id: 1
 *                 title: "Tipos de suculentas"
 *                 content: "<div>lorem ipsum</div>"
 *                 category_id: 1
 *                 createdAt: "2023-12-05 22:22:11"
 *                 user: 
 *                   id: 2
 *                   username: "JohnDoe"
 *                   picture: "/path/to/profile/picture.jpg"
 *                   userCommunities:
 *                     - role_id: 1
 *                       role:
 *                         name: "community_founder"
 *                 commentReactions: 
 *                   - user_id: 2
 *                     type: "like"
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
  "/communities/:community_id/posts/:post_id",
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
 * /communities/posts/{post_id}/edit:
 *   put:
 *     summary: Edita una publicación
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID de la publicación a editar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nuevo titulo de publicación.
 *               content:
 *                 type: string
 *                 description: Nuevo contenido de publicación.
 *               category_id:
 *                 type: integer
 *                 description: id de nueva categoria de publicación.
 *     responses:
 *       200:
 *         description: Publicación editada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *             example:
 *               id: 1
 *               title: "Como trasplantar cactus"
 *               content: "<h1>Ayuda por favor</h1><div>Quiero saber como trasplantar mis cactus!!!</div>"
 *               category_id: 1
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Post not found"
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
 *               message: "Error editing post"
 */

router.put(
  "/communities/posts/:post_id/edit",
  authenticateJWT,
  communitiesController.editPost
);

/**
 * @swagger
 * /communities/posts/{post_id}:
 *   delete:
 *     summary: Elimina una publicación específica
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID de la publicación a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Post deleted successfully"
 *       404:
 *         description: Publicación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Post not found"
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
 *               message: "Error deleting comment"
 */

router.delete(
  "/communities/posts/:post_id",
  authenticateJWT,
  communitiesController.deletePost
);

/**
 * @swagger
 * /communities/posts/{post_id}/react:
 *   post:
 *     summary: Reaccionar a una publicación.
 *     description: Permite a un usuario darle me gusta o no a una publicación. Si el mismo usuario vuelve a enviar el mismo tipo de reacción, se eliminará la reacción.
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID de la publicación a reaccionar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of reaction ("like" or "dislike").
 *                 example: "like"
 *     responses:
 *       200:
 *         description: Reacción actualizada o eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reaction removed"
 *       201:
 *         description: La reacción se creó con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reaction created"
 *       400:
 *         description: Parámetros faltantes o no válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parameters missing: type or post_id not present"
 *       500:
 *         description: Error Interno del Servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post(
  "/communities/posts/:post_id/react",
  authenticateJWT,
  communitiesController.reactPost
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
 *         name: community_id
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
  "/communities/:community_id",
  authenticateJWT,
  communitiesController.deleteCommunity
);

/**
 * @swagger
 * /communities/posts/{post_id}/comments/create:
 *   post:
 *     summary: Crea un nuevo comentario
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del comentario
 *     responses:
 *       200:
 *         description: Comentario creado con éxito.
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
 *               message: "Comment registered successfully"
 *               id: 2
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
 *                 message: "Parameters missing: ..."
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
  "/communities/posts/:post_id/comments/create",
  authenticateJWT,
  communitiesController.createComment
);

/**
 * @swagger
 * /communities/{community_id}/posts/{post_id}/comments:
 *   get:
 *     tags: [Communities]
 *     summary: Obtiene los comentarios de un post específico en una comunidad
 *     description: >
 *       Este endpoint devuelve todos los comentarios asociados a un post específico dentro de una comunidad, incluyendo detalles del usuario que hizo cada comentario.
 *     parameters:
 *       - name: community_id
 *         in: path
 *         required: true
 *         description: ID de la comunidad
 *         type: integer
 *       - name: post_id
 *         in: path
 *         required: true
 *         description: ID del post
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Número total de comentarios
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: id del comentario
 *                       content:
 *                         type: string
 *                         description: Contenido del comentario
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora de creación del comentario
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: id del usuario que escribnio el comentario
 *                           username:
 *                             type: string
 *                             description: Nombre de usuario del autor del comentario
 *                           picture:
 *                             type: string
 *                             description: URL de la imagen de perfil del usuario
 *                           userCommunities:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 role_id:
 *                                   type: integer
 *                                   description: ID del rol del usuario en la comunidad
 *                                 role:
 *                                   type: object
 *                                   properties:
 *                                     name:
 *                                       type: string
 *                                       description: Nombre del rol
 *                       commentReactions:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             user_id:
 *                               type: integer
 *                               description: id del usuario que reacciono al comentario
 *                             type:
 *                               type: string
 *                               description: tipo de reacción
 *             examples:
 *               application/json:
 *                 value: {
 *                   "count": 2,
 *                   "rows": [
 *                     {
 *                       "id": 1,
 *                       "content": "<div>Test</div>",
 *                       "createdAt": "2023-12-14T15:51:54.000Z",
 *                       "user": {
 *                         "id": 2,
 *                         "username": "FrancoMuzzio",
 *                         "picture": "/uploads/users/1/pp_1702335743611.jpg",
 *                         "userCommunities": [
 *                           {
 *                             "role_id": 1,
 *                             "role": {
 *                               "name": "community_founder"
 *                             }
 *                           }
 *                         ]
 *                       },
 *                       "commentReactions": [
 *                         {
 *                           "user_id": 1,
 *                           "type": "like",
 *                         }
 *                       ]
 *                     },
 *                     {
 *                       "id": 2,
 *                       "content": "<div>Test</div>",
 *                       "createdAt": "2023-12-14T15:50:58.000Z",
 *                       "user": {
 *                         "id": 2,
 *                         "username": "FrancoMuzzio",
 *                         "picture": "/uploads/users/1/pp_1702335743611.jpg",
 *                         "userCommunities": [
 *                           {
 *                             "role_id": 1,
 *                             "role": {
 *                               "name": "community_founder"
 *                             }
 *                           }
 *                         ]
 *                       },
 *                       "commentReactions": [
 *                         {
 *                           "user_id": 1,
 *                           "type": "like",
 *                         }
 *                       ]
 *                     }
 *                   ]
 *                 }
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
 *                 message: "Parameters missing: ..."
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
  "/communities/:community_id/posts/:post_id/comments",
  authenticateJWT,
  communitiesController.getComments
);

/**
 * @swagger
 * /communities/posts/comments/{comment_id}/react:
 *   post:
 *     summary: Reaccionar a un comentario.
 *     description: Permite a un usuario darle me gusta o no a un comentario. Si el mismo usuario vuelve a enviar el mismo tipo de reacción, se eliminará la reacción.
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID del comentario a reaccionar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of reaction ("like" or "dislike").
 *                 example: "like"
 *     responses:
 *       200:
 *         description: Reacción actualizada o eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reaction removed"
 *       201:
 *         description: La reacción se creó con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reaction created"
 *       400:
 *         description: Parámetros faltantes o no válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parameters missing: type or comment_id not present"
 *       500:
 *         description: Error Interno del Servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post(
  "/communities/posts/comments/:comment_id/react",
  authenticateJWT,
  communitiesController.reactComment
);

/**
 * @swagger
 * /communities/posts/comments/{comment_id}:
 *   delete:
 *     summary: Elimina un comentario específico
 *     tags: [Communities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID del comentario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Comment deleted successfully"
 *       404:
 *         description: Comentario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Comment not found"
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
 *               message: "Error deleting comment"
 */

router.delete(
  "/communities/posts/comments/:comment_id",
  authenticateJWT,
  communitiesController.deleteComment
);

module.exports = router;
