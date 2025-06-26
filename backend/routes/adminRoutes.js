const express = require('express');
const router = express.Router();
const { adminSignup, adminLogin } = require('../controllers/adminController');

// POST /api/admin/signup
router.post('/signup', adminSignup);

// POST /api/admin/login
router.post('/login', adminLogin);

module.exports = router;