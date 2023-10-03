const { Community, UserCommunity, Role, Op } = require("../models");

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
    if (!req.body.name || !req.body.description || !req.body.picture || !req.body.user_id) {
      return res.status(400).json({
        message: "Parameters missing: name, description, picture or user_id not present",
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

exports.delete = async (req, res) => {
  try {
    // Verificar si el community_id está presente en el cuerpo de la solicitud
    if (!req.body.community_id) {
      return res.status(400).json({
        message: "Parameters missing: community_id not present",
      });
    }

    // Buscar y eliminar la comunidad
    const result = await Community.destroy({
      where: {
        id: req.body.community_id,
      },
    });

    // Verificar si la comunidad se eliminó correctamente
    if (result === 0) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    res.json({
      message: "Community deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting community:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};



exports.give_user_community_role = async (req, res) => {
  try {
    const { user_id, role_name } = req.body;
    const { community_id } = req.params;
    if (!user_id || !role_name) {
      return res.status(400).json({
        message: "Parameters missing: user_id, or role_name not present",
      });
    }

    // Buscar el role_id basado en el role_name
    const role = await Role.findOne({
      where: { name: role_name }
    });

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    const role_id = role.id;

    // El resto del código sigue igual...
    const existingEntry = await UserCommunity.findOne({
      where: {
        user_id,
        community_id
      }
    });

    if (existingEntry) {
      existingEntry.role_id = role_id;
      await existingEntry.save();
    } else {
      await UserCommunity.create({
        user_id,
        community_id,
        role_id
      });
    }

    res.json({
      message: "Role assigned successfully",
    });
  } catch (error) {
    console.error("Error assigning role:", error);
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
      where: { id: req.params.communityId },
    });
    if (community === null) {
      res.status(404).json({
        message: `Community not found (id:${req.params.communityId})`,
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
