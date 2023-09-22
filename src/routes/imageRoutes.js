const express = require('express');
const upload = require('../utils/imageUpload'); // Ajusta la ruta según la ubicación

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }
  res.status(200).send({
    imageUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
