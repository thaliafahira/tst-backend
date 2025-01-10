const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const selectionController = require('../controllers/selection.controller');

router.get('/', authenticateToken, selectionController.getSelections);
router.post('/', authenticateToken, selectionController.saveSelections);

module.exports = router;
