const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    community_id: {
      type: DataTypes.INTEGER,
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.Community, {
      foreignKey: "community_id",
      as: "community",
    });
    Category.hasMany(models.Post, {
      foreignKey: "category_id",
      as: "posts",
    });
  };

  return Category;
};
