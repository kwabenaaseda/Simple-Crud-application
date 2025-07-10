// routes/helpRoutes.js
const express = require('express');
const { submitHelp } = require('../controllers/help.controller');
const { protect, verify } = require('../utils/auth');
const router = express.Router();

router.post('/', protect, verify, submitHelp);

module.exports = router;
