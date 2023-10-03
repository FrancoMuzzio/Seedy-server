const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

router.put('/user/:userId/edit', authenticateJWT, userController.edit);

module.exports = router;
