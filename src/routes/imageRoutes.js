const express = require('express');
const upload = require('../utils/imageUpload');
const imageController = require('../controllers/imageController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/image/upload/:folderName', authenticateJWT, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }
  res.status(200).send({
    imageUrl: `/uploads/${decodeURI(req.params.folderName)}/${req.file.originalname}`
  });
});

router.post('/image/random-filepath', authenticateJWT, imageController.getRandomDefaultFilepath);

module.exports = router;
