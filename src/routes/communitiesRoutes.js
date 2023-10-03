const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communitiesController');
const authenticateJWT = require('../middlewares/authMiddleware');

router.get('/communities', communitiesController.list);

router.post('/communities/check-name', communitiesController.checkName);

router.post('/communities/create', authenticateJWT, communitiesController.create);

router.delete('/communities/delete', authenticateJWT, communitiesController.delete);

router.post('/communities/:communityId/change-image', authenticateJWT, communitiesController.changeImage);

router.post('/communities/:communityId/give-role-to-user', authenticateJWT, communitiesController.give_user_community_role);

module.exports = router;
