const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', 
        key: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories', 
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
