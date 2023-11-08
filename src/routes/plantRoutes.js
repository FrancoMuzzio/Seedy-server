const express = require("express");
const router = express.Router();
const plantsController = require("../controllers/plantController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.post("/plant/create", authenticateJWT, plantsController.create);
router.post("/plant/associate", authenticateJWT, plantsController.associate);

module.exports = router;
