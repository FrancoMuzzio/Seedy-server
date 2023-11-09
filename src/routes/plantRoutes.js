const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.post("/plant/firstOrCreate", authenticateJWT, plantsController.firstOrCreate);
router.post("/plant/associate", authenticateJWT, plantsController.associate);

module.exports = router;
