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
      through: models.UserCommunity,
      foreignKey: 'user_id',
      as: 'communities'
    });
    User.belongsToMany(models.Plant, {
      through: models.UserPlant,
      foreignKey: 'user_id',
      as: 'plants'
    });
    User.hasMany(models.UserCommunity, {
      foreignKey: 'user_id',
      as: 'userCommunities'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      as: 'comments'
    });
  };

  return User;
};
