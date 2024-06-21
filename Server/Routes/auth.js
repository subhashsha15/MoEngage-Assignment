const express = require('express');
const authController = require('../Controllers/Auth.Controller')

const router = express.Router();


router.post('/signup', authController.userSignup);
router.post('/login', authController.userLogin);

module.exports = router;
