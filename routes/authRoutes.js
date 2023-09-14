const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const communitiesController = require('../controllers/communitiesController');

//Auth Controller
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.post('/check-username', authController.checkUsername);
router.post('/check-email', authController.checkEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
//Communities Controller
router.get('/communities', communitiesController.communities);



module.exports = router;
