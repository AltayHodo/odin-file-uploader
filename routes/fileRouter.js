const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const ensureAuthenticated = require('../middleware/auth');

router.get('/:id', ensureAuthenticated, fileController.viewFile);

module.exports = router;
