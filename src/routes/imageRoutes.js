const express = require("express");
const upload = require("../utils/imageUpload");
const imageController = require("../controllers/imageController");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /image/upload/{folderName}:
 *   post:
 *     summary: Sube una imagen a un directorio específico
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folderName
 *         required: true
 *         description: Nombre del directorio donde se subirá la imagen.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen a subir.
 *     responses:
 *       200:
 *         description: Imagen subida con éxito. Retorna la URL de la imagen.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *             example:
 *               imageUrl: "/uploads/myFolder/myImage.png"
 *       400:
 *         description: No se subió ninguna imagen.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "No image uploaded."
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

router.post(
  "/image/upload/:folderName*",
  authenticateJWT,
  upload.single("image"),
  (req, res) => {
    console.log("ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:");
    console.log(req.params);
    if (!req.file) {
      return res.status(400).send("No image uploaded");
    }
    res.status(200).send({
      imageUrl: `/uploads/${req.params.folderName+req.params["0"]}/${
        req.file.originalname
      }`,
    });
  }
);

/**
 * @swagger
 * /image/random-filepath:
 *   post:
 *     summary: Obtiene una ruta de archivo aleatoria para una imagen predeterminada
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo de imagen predeterminada a buscar.
 *     responses:
 *       200:
 *         description: Ruta de archivo aleatoria obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 randomFilePath:
 *                   type: string
 *             example:
 *               randomFilePath: "/uploads/default/type/randomImage.png"
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
 *               message: "An error occurred while reading the directory."
 */

router.post("/image/random-filepath", imageController.getRandomDefaultFilepath);

module.exports = router;
