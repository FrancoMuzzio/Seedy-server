// models/user.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    // Aquí irán las definiciones de tus columnas, por ejemplo:
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  // Si tienes métodos asociados o relaciones, los defines aquí.

  return Role;
};
