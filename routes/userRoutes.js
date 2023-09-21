const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/user/:userId/edit', userController.edit);

module.exports = router;
