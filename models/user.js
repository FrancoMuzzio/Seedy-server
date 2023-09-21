// models/user.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
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

  User.associate = (models) => {
    User.belongsToMany(models.Community, {
      through: 'User_Community',
      foreignKey: 'user_id',
      as: 'communities'
    });
  };

  return User;
};
