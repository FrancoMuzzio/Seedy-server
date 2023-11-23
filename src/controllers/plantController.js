require("dotenv").config();
const { User, Plant, UserPlant } = require("../models");

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
        user_id: userId,
        plant_id: plantId,
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

exports.getPlantIdByName = async (req, res) => {
  try {
    const scientificName = req.params.scientificName;

    const plant = await Plant.findOne({
      where: {
        scientific_name: scientificName,
      },
    });

    if (plant) {
      return res.status(200).json({ id: plant.id });
    } else {
      return res.status(404).json({ message: "Plant not found" });
    }
  } catch (error) {
    console.error("Error finding plant by name:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getUserPlants = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Obtener parámetros de paginación de los query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Establecer un límite predeterminado
    const offset = (page - 1) * limit;

    const userWithPlants = await User.findByPk(userId, {
      include: [
        {
          model: Plant,
          as: "plants",
          through: { attributes: [] },
          limit: limit,
          offset: offset,
        },
      ],
    });

    if (!userWithPlants) {
      return res.status(404).send({ message: "User not found." });
    }

    return res.status(200).send(userWithPlants.plants);
  } catch (error) {
    console.error("Error fetching users plants:", error);
    return res.status(500).send({ message: "Error processing request." });
  }
};


exports.identifyPlant = async (req, res) => {
  try {
    if (!req.body.photo_url || !req.body.lang) {
      return res.status(400).json({
        message: "Parameters missing: photo_url or lang not present",
      });
    }
    const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${
      process.env.PLANTNET_API_KEY
    }&images=${encodeURI(req.body.photo_url)}&lang=${
      req.body.lang
    }&include-related-images=true`;
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      return res.status(200).json(responseData.results);
    } else {
      const errorData = await response.json();
      return res.status(response.status).json({
        message: errorData.error_message || "Error from external API.",
      });
    }
  } catch (error) {
    console.error("Error identifying plant:", error);
    return res.status(500).send({ message: "Error processing request." });
  }
};
