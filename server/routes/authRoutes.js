const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for Sign Up and Login 
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;