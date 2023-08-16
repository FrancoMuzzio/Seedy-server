const { Sequelize } = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize('seedy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
module.exports = sequelize;
