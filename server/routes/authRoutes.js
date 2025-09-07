// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for Sign Up and Login [cite: 9]
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;