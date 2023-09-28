const { Community } = require("../models");

exports.list = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.status(200).send(communities);
  } catch (error) {
    console.error("Error fetching communnities:", error);
    res.status(500).send({ message: "Error fetching communities" });
  }
};

exports.checkName = async (req, res) => {
  const { name, ignore_community_id } = req.body;
  let whereConditions = { name };
  if (ignore_community_id) {
    whereConditions.id = { [Op.ne]: ignore_community_id };
  }
  const community = await Community.findOne({ where: whereConditions });
  if (community) {
    res.status(409).json({ message: "Community name already exists" });
  } else {
    res.json({ message: "Community name is available" });
  }
};

exports.create = async (req, res) => {
  const community = await Community.create({
    name: req.body.name,
    description: req.body.email,
    picture: imageUrl
  })
  res.json({
    message: "Community registered successfully",
    communityId: community.id
  });};
