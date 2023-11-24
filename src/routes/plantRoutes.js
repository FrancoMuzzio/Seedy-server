const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.post(
  "/plant/firstOrCreate",
  authenticateJWT,
  plantsController.firstOrCreate
);
router.post("/plant/associate", authenticateJWT, plantsController.associate);
router.delete(
  "/plant/disassociate",
  authenticateJWT,
  plantsController.dissociate
);
router.get(
  "/plant/:plantId/isAssociated",
  authenticateJWT,
  plantsController.isPlantAssociatedWithUser
);
router.get(
  "/plant/name/:scientificName",
  authenticateJWT,
  plantsController.getPlantIdByName
);
router.get("/plant/getUserPlants/:userId", authenticateJWT, (req, res) => {
  const { userId } = req.params;

  const { page, limit } = req.query;

  plantsController.getUserPlants(req, res, userId, page, limit);
});

router.post("/plant/identify", authenticateJWT, plantsController.identifyPlant);

module.exports = router;
