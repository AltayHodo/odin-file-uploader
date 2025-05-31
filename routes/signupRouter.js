const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.get('/', signupController.signUpGet);
router.post('/', signupController.signUpPost);

module.exports = router;
