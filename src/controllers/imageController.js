const fs = require('fs');
const path = require('path');

  exports.getRandomDefaultFilepath = async (req, res) => {
    const type = req.body.type;
    const defaultDir = path.join(__dirname, '../../uploads/default');
    const dirToCheck = `${defaultDir}/${type}`;
  
    fs.readdir(dirToCheck, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "An error occurred while reading the directory: "+err });
      }
  
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const randomFilePath = `/uploads/default/${type}/${randomFile}`;
      res.json({ randomFilePath });
    });
  };
