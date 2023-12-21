const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PostReaction = sequelize.define(
    'PostReaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Post', 
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'id',
        },
      },
      reaction_type: {
        type: DataTypes.ENUM('like', 'dislike'),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      updatedAt: 'updatedAt',
      createdAt: 'createdAt',
      tableName: 'Post_Reactions', 
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'post_id'],
        },
      ],
    }
  );

  PostReaction.associate = function(models) {
    PostReaction.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post',
    });
    PostReaction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return PostReaction;
};
