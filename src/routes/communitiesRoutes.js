const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');
const authenticateJWT = require('../middlewares/authMiddleware');

router.get('/communities', communitiesController.list);

router.post('/communities/check-name', communitiesController.checkName);

router.post('/communities/create', authenticateJWT, communitiesController.create);

router.delete('/communities/delete', authenticateJWT, communitiesController.delete);

router.post('/communities/:community_id/change-image', authenticateJWT, communitiesController.changeImage);

router.post('/communities/:community_id/give-role-to-user', authenticateJWT, communitiesController.giveUserCommunityRole);

router.get('/communities/:community_id/members', communitiesController.getMembers);

module.exports = router;
