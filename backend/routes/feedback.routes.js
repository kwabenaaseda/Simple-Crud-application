// routes/feedbackRoutes.js
const express = require('express');
const { protect, verify } = require('../utils/auth');
const { addFeedback, getFeedback } = require('../controllers/data.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: User feedback management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - feedback
 *       properties:
 *         feedback:
 *           type: string
 *         userLocation:
 *           type: string
 *         userid:
 *           type: string
 *         user:
 *           type: string
 */

/**
 * @swagger
 * /api/data/feedback:
 *   post:
 *     summary: Submit user feedback
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feedback
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Feedback submitted
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *  */
router.post('/', protect, verify, addFeedback);

/**
 * @swagger
 * /api/data/feedback:
 *  get:
 *     summary: Get all feedback entries
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of feedback
 *       500:
 *         description: Server error
 */
router.get('/', protect, verify, getFeedback);

module.exports = router;
