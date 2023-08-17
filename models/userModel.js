const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

// Modelo de Usuario
class User extends Model {}

User.init({
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
