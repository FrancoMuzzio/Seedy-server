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
router.get(
  "/plant/getUserPlants",
  authenticateJWT,
  plantsController.getUserPlants
);
router.post("/identifyPlant", authenticateJWT, plantsController.identifyPlant);

module.exports = router;
