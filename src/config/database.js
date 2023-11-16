const { Sequelize } = require('sequelize');
const database = require('./config.js');
const env = process.env.NODE_ENV || 'development';
const dbConfig = database[env];
// Conexión a la base de datos

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});
  
module.exports = sequelize;