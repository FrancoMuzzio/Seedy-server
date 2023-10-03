const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');

router.get('/communities', communitiesController.list);
router.post('/communities/check-name', communitiesController.checkName);
router.post('/communities/create', communitiesController.create);
router.post('/communities/:communityId/change-image', communitiesController.changeImage);
router.post('/communities/give-role-to-user', communitiesController.give_user_community_role);

module.exports = router;
