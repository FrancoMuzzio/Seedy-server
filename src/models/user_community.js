// models/UserCommunity.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserCommunity = sequelize.define('UserCommunity', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // nombre de la tabla, no del modelo
        key: 'id'
      }
    },
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'communities', // nombre de la tabla, no del modelo
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles', // nombre de la tabla, no del modelo
        key: 'id'
      }
    }
  }, {
    tableName: 'user_community',
    // Aquí puedes especificar que user_id y community_id juntos forman una clave primaria
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'community_id']
      }
    ]
  });
  
  UserCommunity.associate = (models) => {
    UserCommunity.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });
  };

  return UserCommunity;
};
