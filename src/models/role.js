// models/user.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define("Role", {
    // Aquí irán las definiciones de tus columnas, por ejemplo:
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Si tienes métodos asociados o relaciones, los defines aquí.
  Role.associate = (models) => {
    Role.hasMany(models.UserCommunity, {
      foreignKey: "role_id",
      as: "userCommunities",
    });
  };

  return Role;
};
