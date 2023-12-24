const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Message = sequelize.define(
    "Message",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Messages",
    }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Message.belongsTo(models.Community, {
      foreignKey: "community_id",
      as: "community",
    });
  };

  return Message;
};
