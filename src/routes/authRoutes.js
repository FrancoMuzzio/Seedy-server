const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateJWT = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/check-username", authController.checkUsername);
router.post("/check-email", authController.checkEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authenticateJWT, authController.resetPassword);

module.exports = router;
