const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
let envPrefix;

switch (env) {
  case 'development':
    envPrefix = 'DEV';
    break;
  case 'test':
    envPrefix = 'TEST';
    break;
  case 'production':
    envPrefix = 'PROD';
    break;
  default:
    envPrefix = 'DEV';
}

const dbConfig = {
    username: process.env[`${envPrefix}_DB_USERNAME`],
    password: process.env[`${envPrefix}_DB_PASSWORD`],
    database: process.env[`${envPrefix}_DB_NAME`],
    host: process.env[`${envPrefix}_DB_HOST`],
    dialect: process.env[`${envPrefix}_DB_DIALECT`],
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

module.exports = sequelize;
