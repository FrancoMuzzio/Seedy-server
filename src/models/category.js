const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'communities', // nombre de la tabla de referencia
        key: 'id' // campo de la tabla de referencia
      }
    }
  });

  Category.associate = (models) => {
    // Establecer la relación con el modelo Community
    Category.belongsTo(models.Community, {
      foreignKey: 'community_id',
      as: 'community'
    });
  };

  return Category;
};
