const { DataTypes } = require('sequelize');
const { UserCommunity } = require("./user_community");


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
    tableName: 'Communities'
  });

  Community.associate = (models) => {
    Community.belongsToMany(models.User, {
      through: models.UserCommunity,
      foreignKey: 'community_id',
      as: 'users'
    });
  };

  return Community;
};
