const { Plant, UserPlant } = require("../models");

exports.create = async (req, res) => {
  try {
    if (!req.body.scientific_name || !req.body.family || !req.body.images) {
      return res.status(400).json({
        message:
          "Parameters missing: scientific_name, family or images not present",
      });
    }
    const plant = await Plant.create({
      scientific_name: req.body.scientific_name,
      family: req.body.family,
      images: req.body.images,
      ...(req.body.common_names && { common_names: req.body.common_names }),
    });
    res.json({
      message: "Plant registered successfully",
      id: plant.id,
    });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.firstOrCreate = async (req, res) => {
  try {
    if (!req.body.scientific_name || !req.body.family || !req.body.images) {
      return res.status(400).json({
        message:
          "Parameters missing: scientific_name, family or images not present",
      });
    }

    const existingPlant = await Plant.findOne({
      where: { scientific_name: req.body.scientific_name },
    });

    if (existingPlant) {
      return res.status(200).json({
        message: "A plant with the given scientific name already exists",
        id: existingPlant.id,
      });
    }

    const plant = await Plant.create({
      scientific_name: req.body.scientific_name,
      family: req.body.family,
      images: req.body.images,
      ...(req.body.common_names && { common_names: req.body.common_names }),
    });
    res.json({
      message: "Plant registered successfully",
      id: plant.id,
    });
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.associate = async (req, res) => {
  try {
    if (!req.body.plant_id) {
      return res.status(400).json({
        message: "Parameters missing: plant_id not present",
      });
    }
    console.log("req.user.id: ", req.user.id);
    console.log("req.body.plant_id: ", req.body.plant_id);
    // Encuentra o crea la asociación en la tabla pivote UserPlant
    const [userPlantAssociation, created] = await UserPlant.findOrCreate({
      where: { user_id: req.user.id, plant_id: req.body.plant_id },
    });

    if (created) {
      return res.status(201).json({
        message: "Plant associated successfully",
        association: userPlantAssociation,
      });
    } else {
      return res.status(200).json({
        message: "The association already existed",
        association: userPlantAssociation,
      });
    }
  } catch (error) {
    console.error(
      "An error occurred while associating the user with the plant:",
      error
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.isPlantAssociatedWithUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const plantId = req.params.plantId;

    const association = await UserPlant.findOne({
      where: {
        userId: userId,
        plantId: plantId,
      },
    });

    if (association) {
      return res.status(200).json({ associated: true });
    } else {
      return res.status(200).json({ associated: false });
    }
  } catch (error) {
    console.error("Error checking plant association:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

