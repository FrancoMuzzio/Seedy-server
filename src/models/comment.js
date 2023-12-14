module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      as: "post",
    });

    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return Comment;
};
