const { Message, User, UserCommunity, Role } = require("../models");

const getChatHistory = async (req, res) => {
  try {
    const community_id = req.params.communityId;
    const messages = await Message.findAll({
      where: {
        community_id
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "picture"],
          include: [
            {
              model: UserCommunity,
              as: "userCommunities",
              attributes: ["role_id"],
              where: {
                community_id,
              },
              include: [
                {
                  model: Role,
                  as: "role",
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error processing request.");
  }
};

module.exports = {
  getChatHistory
};