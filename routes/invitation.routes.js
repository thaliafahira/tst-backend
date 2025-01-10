const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const InvitationController = require('../controllers/invitation.controller');

router.post('/generate', authenticateToken, InvitationController.generateInvitation);

module.exports = router;
