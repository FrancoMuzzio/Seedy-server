const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CommentReaction = sequelize.define(
    'CommentReaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Comment', 
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
      tableName: 'Comment_Reactions', 
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'comment_id'],
        },
      ],
    }
  );

  CommentReaction.associate = function(models) {
    CommentReaction.belongsTo(models.Comment, {
      foreignKey: 'comment_id',
      as: 'comment',
    });
    CommentReaction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return CommentReaction;
};
