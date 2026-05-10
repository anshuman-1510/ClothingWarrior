const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
