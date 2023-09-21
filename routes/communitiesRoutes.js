const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');

router.get('/communities', communitiesController.communities);

module.exports = router;
