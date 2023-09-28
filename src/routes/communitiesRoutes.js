const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');

router.get('/communities', communitiesController.list);
router.post('/communities/check-name', communitiesController.checkName);
router.post('/communities/create', communitiesController.create);
// router.post('/communities/:userId/change-image', communitiesController.changeImage);

module.exports = router;
