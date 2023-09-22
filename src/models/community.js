const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Community = sequelize.define('Community', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    picture: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Communities' // Esto especifica que el nombre de la tabla en la base de datos será 'Communities'
  });

  // Si tienes métodos asociados o relaciones, los defines aquí.
  Community.associate = (models) => {
    Community.belongsToMany(models.User, {
      through: 'User_Community',
      foreignKey: 'community_id',
      as: 'users'
    });
  };

  return Community;
};
