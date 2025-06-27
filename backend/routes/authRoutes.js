// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/api/signup/data', signup);
router.post('/api/signup/data/login', login);

module.exports = router;