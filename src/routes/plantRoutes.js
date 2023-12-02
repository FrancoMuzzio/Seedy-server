const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantController");
const authenticateJWT = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /plant/firstOrCreate:
 *   post:
 *     summary: Crea una planta o devuelve una existente
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - scientific_name
 *               - family
 *               - images
 *             properties:
 *               scientific_name:
 *                 type: string
 *                 description: Nombre científico de la planta.
 *               family:
 *                 type: string
 *                 description: Familia de la planta.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: JSON con URLs de imágenes de la planta.
 *               common_names:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: JSON con nombres comunes de la planta.
 *     responses:
 *       200:
 *         description: Planta creada o devuelta con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *             examples:
 *               plantCreated:
 *                 value:
 *                   message: "Plant registered successfully"
 *                   id: 1
 *               plantExists:
 *                 value:
 *                   message: "A plant with the given scientific name already exists"
 *                   id: 1
 *       400:
 *         description: Parámetros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Parameters missing: scientific_name, family or images not present"
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
  "/plant/firstOrCreate",
  authenticateJWT,
  plantsController.firstOrCreate
);

/**
 * @swagger
 * /plant/associate:
 *   post:
 *     summary: Asocia una planta con un usuario
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plant_id
 *             properties:
 *               plant_id:
 *                 type: integer
 *                 description: ID de la planta a asociar.
 *     responses:
 *       201:
 *         description: Planta asociada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 association:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     plant_id:
 *                       type: integer
 *             examples:
 *               created:
 *                 value:
 *                   message: "Plant associated successfully"
 *                   association:
 *                     user_id: 1
 *                     plant_id: 2
 *       200:
 *         description: La asociación ya existía.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 association:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     plant_id:
 *                       type: integer
 *             examples:
 *               existing:
 *                 value:
 *                   message: "The association already existed"
 *                   association:
 *                     user_id: 1
 *                     plant_id: 2
 *       400:
 *         description: Parámetros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               missingParameters:
 *                 value:
 *                   message: "Parameters missing: plant_id not present"
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
 *               serverError:
 *                 value:
 *                   message: "Internal Server Error"
 */

router.post("/plant/associate", authenticateJWT, plantsController.associate);

/**
 * @swagger
 * /plant/disassociate/{plantId}:
 *   delete:
 *     summary: Desasocia una planta de un usuario
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         description: ID de la planta a desasociar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Planta desasociada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               success:
 *                 value:
 *                   message: "Plant dissociated successfully from user"
 *       404:
 *         description: Asociación no encontrada o ya eliminada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               notFound:
 *                 value:
 *                   message: "Association not found or already removed"
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
 *               serverError:
 *                 value:
 *                   message: "Internal Server Error"
 */

router.delete(
  "/plant/disassociate/:plantId",
  authenticateJWT,
  plantsController.dissociate
);

/**
 * @swagger
 * /plant/{plantId}/isAssociated:
 *   get:
 *     summary: Verifica si una planta está asociada con un usuario
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         description: ID de la planta.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado de asociación obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 associated:
 *                   type: boolean
 *             examples:
 *               associatedTrue:
 *                 value:
 *                   associated: true
 *               associatedFalse:
 *                 value:
 *                   associated: false
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
  "/plant/:plantId/isAssociated",
  authenticateJWT,
  plantsController.isPlantAssociatedWithUser
);

/**
 * @swagger
 * /plant/name/{scientificName}:
 *   get:
 *     summary: Obtiene el ID de una planta por su nombre científico
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: scientificName
 *         required: true
 *         description: Nombre científico de la planta.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ID de la planta obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *             example:
 *               id: 1
 *       404:
 *         description: Planta no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Plant not found"
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
  "/plant/name/:scientificName",
  authenticateJWT,
  plantsController.getPlantIdByName
);

/**
 * @swagger
 * /plant/getUserPlants/{userId}:
 *   get:
 *     summary: Obtiene las plantas asociadas a un usuario
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plantas del usuario obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       scientific_name:
 *                         type: string
 *                       family:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       common_names:
 *                         type: array
 *                         items:
 *                           type: string
 *             examples:
 *               plantsFound:
 *                 value:
 *                   plants:
 *                     - id: 1
 *                       scientific_name: "Ficus elastica"
 *                       family: "Moraceae"
 *                       images: ["https://bs.plantnet.org/image/o/c198d8a12dd8cb37d15c01e8d4aab6e83ed2018e", "https://bs.plantnet.org/image/o/486a8fa08f2da01ac8576d723a01690335f0d6ae"]
 *                       common_names: ["Rubber Plant", "Rubber Tree"]
 *               noPlants:
 *                 value:
 *                   plants: []
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

router.get(
  "/plant/getUserPlants/:userId",
  authenticateJWT,
  plantsController.getUserPlants
);

/**
 * @swagger
 * /plant/identify:
 *   post:
 *     summary: Identifica una planta mediante una foto
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - photo_url
 *               - lang
 *             properties:
 *               photo_url:
 *                 type: string
 *                 description: URL de la foto de la planta.
 *               lang:
 *                 type: string
 *                 description: Idioma para la respuesta del API de identificación.
 *     responses:
 *       200:
 *         description: Planta identificada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *             example:
 *               [
 *                          {
 *                            "score": 0.68676,
 *                            "species": {
 *                              "scientificNameWithoutAuthor": "Ficus elastica",
 *                              "scientificNameAuthorship": "Roxb. ex Hornem.",
 *                              "genus": {
 *                                "scientificNameWithoutAuthor": "Ficus",
 *                                "scientificNameAuthorship": "",
 *                                "scientificName": "Ficus"
 *                              },
 *                              "family": {
 *                                "scientificNameWithoutAuthor": "Moraceae",
 *                                "scientificNameAuthorship": "",
 *                                "scientificName": "Moraceae"
 *                              },
 *                              "commonNames": [
 *                                "Rubberplant"
 *                              ],
 *                              "scientificName": "Ficus elastica Roxb. ex Hornem."
 *                            },
 *                            "images": [
 *                              {
 *                                "organ": "leaf",
 *                                "author": "Ramirez Yesenia",
 *                                "license": "cc-by-sa",
 *                                "date": {
 *                                  "timestamp": 1596807844150,
 *                                  "string": "August 7, 2020"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/d0ed2e7ca3292e3dee88756822aa87537058b666",
 *                                  "m": "https://bs.plantnet.org/image/m/d0ed2e7ca3292e3dee88756822aa87537058b666",
 *                                  "s": "https://bs.plantnet.org/image/s/d0ed2e7ca3292e3dee88756822aa87537058b666"
 *                                },
 *                                "citation": "Ramirez Yesenia / Pl@ntNet, cc-by-sa"
 *                              },
 *                              {
 *                                "organ": "leaf",
 *                                "author": "Latrice Beverly",
 *                                "license": "cc-by-sa",
 *                                "date": {
 *                                  "timestamp": 1673755829062,
 *                                  "string": "January 15, 2023"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/9c4c147c060b14a2af5d539642d017fda01ab538",
 *                                  "m": "https://bs.plantnet.org/image/m/9c4c147c060b14a2af5d539642d017fda01ab538",
 *                                  "s": "https://bs.plantnet.org/image/s/9c4c147c060b14a2af5d539642d017fda01ab538"
 *                                },
 *                                "citation": "Latrice Beverly / Pl@ntNet, cc-by-sa"
 *                              },
 *                              {
 *                                "organ": "leaf",
 *                                "author": "Louis Correchet",
 *                                "license": "cc-by-sa",
 *                                "date": {
 *                                  "timestamp": 1579107384945,
 *                                  "string": "January 15, 2020"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/b6146b975aa6e36ce7003966e16c4a06befe997e",
 *                                  "m": "https://bs.plantnet.org/image/m/b6146b975aa6e36ce7003966e16c4a06befe997e",
 *                                  "s": "https://bs.plantnet.org/image/s/b6146b975aa6e36ce7003966e16c4a06befe997e"
 *                                },
 *                                "citation": "Louis Correchet / Pl@ntNet, cc-by-sa"
 *                              },
 *                              {
 *                                "organ": "leaf",
 *                                "author": "González Sofía",
 *                                "license": "cc-by-sa",
 *                                "date": {
 *                                  "timestamp": 1614171593771,
 *                                  "string": "February 24, 2021"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/2cf6c8b868ed2a2509a41c5408789cd25c45194b",
 *                                  "m": "https://bs.plantnet.org/image/m/2cf6c8b868ed2a2509a41c5408789cd25c45194b",
 *                                  "s": "https://bs.plantnet.org/image/s/2cf6c8b868ed2a2509a41c5408789cd25c45194b"
 *                                },
 *                                "citation": "González Sofía / Pl@ntNet, cc-by-sa"
 *                              },
 *                              {
 *                                "organ": "leaf",
 *                                "author": "robert dykstra",
 *                                "license": "cc-by-sa",
 *                                "date": {
 *                                  "timestamp": 1588831271615,
 *                                  "string": "May 7, 2020"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/8c6708ee7a1854bbf27b11966f605abf9ba11c1f",
 *                                  "m": "https://bs.plantnet.org/image/m/8c6708ee7a1854bbf27b11966f605abf9ba11c1f",
 *                                  "s": "https://bs.plantnet.org/image/s/8c6708ee7a1854bbf27b11966f605abf9ba11c1f"
 *                                },
 *                                "citation": "robert dykstra / Pl@ntNet, cc-by-sa"
 *                              },
 *                              {
 *                                "organ": "leaf",
 *                                "author": "Michael Richter",
 *                                "license": "cc-by-sa",
 *                                 "date": {
 *                                  "timestamp": 1591749358323,
 *                                  "string": "June 10, 2020"
 *                                },
 *                                "url": {
 *                                  "o": "https://bs.plantnet.org/image/o/af0e7ef727d852b3b2d2a4cbfea9353433841834",
 *                                  "m": "https://bs.plantnet.org/image/m/af0e7ef727d852b3b2d2a4cbfea9353433841834",
 *                                  "s": "https://bs.plantnet.org/image/s/af0e7ef727d852b3b2d2a4cbfea9353433841834"
 *                                },
 *                                "citation": "Michael Richter / Pl@ntNet, cc-by-sa"
 *                              }
 *                            ],
 *                            "gbif": {
 *                              "id": "5361903"
 *                            },
 *                            "powo": {
 *                              "id": "60458499-2"
 *                            },
 *                            "iucn": {
 *                              "id": "116271522",
 *                              "category": "LC"
 *                            }
 *                          }
 *                        ]
 *       400:
 *         description: Parámetros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Parameters missing: photo_url or lang not present"
 *       500:
 *         description: Error interno del servidor o del API externo.
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

router.post("/plant/identify", authenticateJWT, plantsController.identifyPlant);

/**
 * @swagger
 * /plant:
 *   get:
 *     summary: Obtiene todas las plantas
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plantas obtenidas con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   scientific_name:
 *                     type: string
 *                   family:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   common_names:
 *                     type: array
 *                     items:
 *                       type: string
 *             example:
 *               - id: 1
 *                 scientific_name: "Ficus elastica"
 *                 family: "Moraceae"
 *                 images: ["https://bs.plantnet.org/image/o/c198d8a12dd8cb37d15c01e8d4aab6e83ed2018e"]
 *                 common_names: ["Rubber Plant", "Rubber Tree"]
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

router.get("/plant", authenticateJWT, plantsController.get);

module.exports = router;
