const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = decodeURI(req.params.folderName) || 'default'; // Si folderName es undefined, usará 'default'

    const uploadPath = path.join('uploads', folderName);

    // Se asegura de que la carpeta exista o crea una nueva si no existe.
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
