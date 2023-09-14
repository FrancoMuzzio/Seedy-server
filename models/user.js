// models/user.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    // Aquí irán las definiciones de tus columnas, por ejemplo:
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    picture: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE
  });

  // Si tienes métodos asociados o relaciones, los defines aquí.
  User.associate = (models) => {
    User.belongsToMany(models.Community, {
      through: 'UserCommunity',
      foreignKey: 'user_id',
      as: 'communities'
    });
  };

  return User;
};
