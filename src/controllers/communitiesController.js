const {
  Category,
  Post,
  Community,
  UserCommunity,
  Role,
  User,
  Op,
  Sequelize,
} = require("../models");

exports.list = async (req, res) => {
  try {
    const communities = await Community.findAll({
      attributes: ["id", "name", "description", "picture"],
      include: [
        {
          model: User,
          as: "users",
          attributes: [],
          through: {
            model: UserCommunity,
            attributes: [],
          },
        },
      ],
    });

    // contar usuarios de cada comunidad
    const communitiesWithUserCount = await Promise.all(
      communities.map(async (community) => {
        const userCount = await community.countUsers(); // countUsers es un método que Sequelize crea automáticamente
        return {
          ...community.get(), // Obtener los datos de la comunidad como un objeto simple
          userCount, // Añadir la cuenta de usuarios
        };
      })
    );
    res.status(200).json(communitiesWithUserCount);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ message: "Error fetching communities" });
  }
};

exports.checkCommunityName = async (req, res) => {
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
        message:
          "Parameters missing: name, description, picture or user_id not present",
      });
    }
    const community = await Community.create({
      name: req.body.name,
      description: req.body.description,
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

exports.deleteCommunity = async (req, res) => {
  try {
    const communityId = req.params.communityId;

    if (!communityId) {
      return res.status(400).json({
        message: "Parameters missing: communityId not present",
      });
    }
    const userId = req.user.id;

    const userCommunity = await UserCommunity.findOne({
      where: {
        user_id: userId,
        community_id: communityId,
      },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
    if (
      !userCommunity ||
      !["community_founder", "system_administrator"].includes(
        userCommunity.role.name
      )
    ) {
      return res.status(403).json({
        message: "You don't have the necessary permissions to do that.",
      });
    }

    // Encuentra la comunidad por su ID
    const community = await Community.findByPk(communityId);

    // Si no existe la comunidad, devuelve un error
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Elimina la comunidad
    await community.destroy();

    // Envía una respuesta confirmando la eliminación
    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    console.error("Error deleting community:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.giveUserCommunityRole = async (req, res) => {
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
      where: { name: role_name },
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
        community_id,
      },
    });

    if (existingEntry) {
      existingEntry.role_id = role_id;
      await existingEntry.save();
    } else {
      await UserCommunity.create({
        user_id,
        community_id,
        role_id,
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

exports.getUserRole = async (req, res) => {
  try {
    const { community_id, user_id } = req.params;
    if (!user_id || !community_id) {
      return res.status(400).json({
        message: "Parameters missing: user_id, or community_id not present",
      });
    }

    const user_role = await UserCommunity.findOne({
      where: { user_id, community_id },
      attributes: ["role_id"],
    });

    if (!user_role) {
      return res.status(404).json({
        message: "This user has no role in that community",
      });
    }

    const role = await Role.findByPk(user_role.role_id, {
      attributes: ["id", "name", "display_name"],
    });
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.changeImage = async (req, res) => {
  try {
    if (!req.params.community_id || !req.body.picture) {
      return res.status(400).json({
        message: "Parameters missing: community_id or picture not present",
      });
    }
    const community = await Community.findOne({
      where: { id: req.params.community_id },
    });
    if (community === null) {
      res.status(404).json({
        message: `Community not found (id:${req.params.community_id})`,
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

exports.getMembers = async (req, res) => {
  try {
    // Primera consulta para obtener los miembros de la comunidad
    const community = await Community.findOne({
      where: { id: req.params.community_id },
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username", "picture"],
          through: {
            attributes: ["role_id"],
          },
        },
      ],
    });

    if (!community) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    // Segunda consulta para obtener los nombres de los roles
    const roles = await Role.findAll({
      attributes: ["id", "name", "display_name"],
    });

    // Combinar los resultados
    const membersWithRoles = community.users.map((user) => {
      const roleId =
        user.UserCommunity && user.UserCommunity.dataValues
          ? user.UserCommunity.dataValues.role_id
          : null;
      const role = roles.find((r) => r.id === roleId);
      return {
        id: user.dataValues.id,
        username: user.dataValues.username,
        picture: user.dataValues.picture,
        role: role ? role.name : None,
        role_display_name: role ? role.display_name : None,
      };
    });
    res.json({
      data: membersWithRoles,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getCategories = async (req, res) => {
  const { limit = 5, page = 1 } = req.body;
  const { community_id } = req.params;

  try {
    const offset = (page - 1) * limit;
    const { count, rows: categories } = await Category.findAndCountAll({
      where: {
        community_id,
      },
      limit,
      offset,
      attributes: ["id", "name", "description"],
      order: [["createdAt", "DESC"]],
    });
    const totalPages = Math.ceil(count / limit);

    if (count === 0) {
      return res
        .status(404)
        .json({ message: "No categories found for this community." });
    }

    res.status(200).json({ categories, totalPages });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkCategoryName = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Parameters missing: name not present",
      });
    }
    const { name, ignore_category_id } = req.body;
    const { community_id } = req.params;
    let whereConditions = { name, community_id };
    if (ignore_category_id) {
      whereConditions.id = { [Op.ne]: ignore_category_id };
    }
    const category = await Category.findOne({ where: whereConditions });
    if (category) {
      res.status(409).json({ message: "Category name already exists" });
    } else {
      res.json({ message: "Category name is available" });
    }
  } catch (error) {
    console.error("Error checking category name:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { community_id } = req.params;

    if (!community_id || !name || !description) {
      return res.status(400).json({
        message:
          "Parameters missing: name, description, or community_id not present",
      });
    }

    const existingCategory = await Category.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("name")),
            Sequelize.fn("LOWER", name)
          ),
          { community_id: community_id },
        ],
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "A category with this name already exists in the community",
      });
    }

    const category = await Category.create({
      name: name,
      description: description,
      community_id: community_id,
    });

    res.json({
      message: "Category registered successfully",
      id: category.id,
    });
  } catch (error) {
    console.error("Error creating community category:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getPosts = async (req, res) => {
  const { category_id, limit = 5, page = 1 } = req.body;
  const { community_id } = req.params;

  try {
    let whereConditions = {};
    if (category_id) {
      whereConditions.category_id = category_id;
    } else if (community_id) {
      const categories = await Category.findAll({
        where: { community_id },
      });
      const categoryIds = categories.map((category) => category.id);
      whereConditions.category_id = categoryIds;
    }

    const offset = (page - 1) * limit;

    const { count, rows: posts } = await Post.findAndCountAll({
      where: whereConditions,
      limit,
      offset,
      attributes: ["id", "title", "category_id", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "picture"],
          include: [
            {
              model: UserCommunity,
              as: "userCommunities",
              attributes: ["role_id"],
              where: {
                community_id: community_id,
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

    const totalPages = Math.ceil(count / limit);

    if (count === 0) {
      return res.status(404).json({ message: "No posts found." });
    }

    res.status(200).json({ posts, totalPages });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res.status(400).json({
        message: "Parameters missing: post_id not present",
      });
    }
    const post = await Post.findByPk(post_id);
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { category_id } = req.params;
    const user_id = req.user.id;
    if (!title || !body || !category_id) {
      return res.status(400).json({
        message: "Parameters missing: body, category_id or name not present",
      });
    }
    const post = await Post.create({
      title,
      content: body,
      user_id,
      category_id,
    });
    res.json({
      message: "Post registered successfully",
      id: post.id,
    });
  } catch (error) {
    console.error("Error creating community post:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
