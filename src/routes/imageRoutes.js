const express = require('express');
const upload = require('../utils/imageUpload');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.post('/upload/:folderName', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }
  res.status(200).send({
    imageUrl: `/uploads/${req.params.folderName}/${req.file.originalname}`
  });
});


module.exports = router;
