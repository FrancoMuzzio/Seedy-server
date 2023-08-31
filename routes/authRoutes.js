const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.post('/check-username', authController.checkUsername);
router.post('/check-email', authController.checkEmail);
router.get('/send-test-email', authController.sendTestEmail);


module.exports = router;
