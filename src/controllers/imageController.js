const fs = require('fs');
const path = require('path');


exports.get_random_default_filepath = async (type) => {
    const defaultDir = path.join(__dirname, '../../uploads/default');
    const dirToCheck = defaultDir + '/' + type;
    return new Promise((resolve, reject) => {
      fs.readdir(dirToCheck, (err, files) => {
        if (err) {
          return reject(err);
        }
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const randomFilePath = `/uploads/default/${type}/${randomFile}`;
        resolve(randomFilePath);
      });
    });
  };
