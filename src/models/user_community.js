const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserCommunity = sequelize.define('UserCommunity', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'User_Community',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'community_id']
      }
    ]
  });
  
  UserCommunity.associate = (models) => {
    UserCommunity.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    UserCommunity.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });
  };

  

  return UserCommunity;
};
