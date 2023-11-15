const express = require("express");
const router = express.Router();
const communitiesController = require("../controllers/communitiesController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.get("/communities", communitiesController.list);

router.post("/communities/check-name", communitiesController.checkName);

router.post(
  "/communities/create",
  authenticateJWT,
  communitiesController.create
);

router.post(
  "/communities/:community_id/change-image",
  authenticateJWT,
  communitiesController.changeImage
);

router.post(
  "/communities/:community_id/give-role-to-user",
  authenticateJWT,
  communitiesController.giveUserCommunityRole
);

router.post(
  "/communities/:community_id/create-category",
  authenticateJWT,
  communitiesController.createCategory
);

router.get(
  "/communities/:community_id/members",
  communitiesController.getMembers
);

router.get(
  "/communities/:community_id/categories",
  communitiesController.getCategories
);

router.post(
  "/communities/posts",
  authenticateJWT,
  communitiesController.getPosts
);

router.delete(
  "/communities/:communityId",
  authenticateJWT,
  communitiesController.deleteCommunity
);

module.exports = router;
