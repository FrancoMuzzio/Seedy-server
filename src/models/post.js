const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', 
        key: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return Post;
};
