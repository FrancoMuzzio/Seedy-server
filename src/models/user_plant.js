// models/UserCommunity.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserPlant = sequelize.define('UserPlant', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'User_Plant',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'plant_id']
      }
    ]
  });

  return UserPlant;
};
