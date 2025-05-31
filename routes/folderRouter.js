const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const ensureAuthenticated = require('../middleware/auth');

router.get('/', ensureAuthenticated, folderController.listFolders);
router.post('/', ensureAuthenticated, folderController.createFolder);

router.post('/:id/edit', ensureAuthenticated, folderController.updateFolder);
router.post('/:id/delete', ensureAuthenticated, folderController.deleteFolder);

module.exports = router;
