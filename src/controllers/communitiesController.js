const { Community, Op } = require("../models");

exports.list = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching communnities:", error);
    res.status(500).json({ message: "Error fetching communities" });
  }
};

exports.checkName = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Parameters missing: name not present",
      });
    }
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
  } catch (error) {
    console.error("Error checking community name:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.name || !req.body.description || !req.body.picture) {
      return res.status(400).json({
        message: "Parameters missing: name, description or picture not present",
      });
    }
    const community = await Community.create({
      name: req.body.name,
      description: req.body.description, // Corregido de req.body.email a req.body.description
      picture: req.body.picture,
    });
    res.json({
      message: "Community registered successfully",
      id: community.id,
    });
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.changeImage = async (req, res) => {
  try {
    if (!req.params.userId || !req.body.picture) {
      return res.status(400).json({
        message: "Parameters missing: userId or picture not present",
      });
    }
    const community = await Community.findOne({
      where: { id: req.params.userId },
    });
    if (community === null) {
      res.status(404).json({
        message: `Community not found (id:${req.params.userId})`,
      });
    } else {
      community.picture = req.body.picture;
      await community.save();
      res.json({
        message: "Community registered successfully",
      });
    }
  } catch (error) {
    console.error("Error changing community image:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
