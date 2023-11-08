const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Plant = sequelize.define("Plant", {
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    family: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    common_names: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Plant.associate = (models) => {
    Plant.belongsToMany(models.User, {
      through: models.UserPlant,
      foreignKey: 'plant_id',
      as: 'users'
    });
  };

  return Plant;
};
