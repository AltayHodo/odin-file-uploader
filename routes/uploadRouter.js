const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/uploadController');
const ensureAuthenticated = require('../middleware/auth');
const { storage } = require('../cloudinary');

const upload = multer({ storage });

router.get('/', ensureAuthenticated, uploadController.uploadGet);
router.post(
  '/',
  ensureAuthenticated,
  upload.single('myFile'),
  uploadController.uploadPost
);

module.exports = router;
