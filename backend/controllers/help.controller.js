// controllers/helpController.js
const HelpRequest = require('../models/HelpRequest');

exports.submitHelp = async (req, res) => {
  try {
    const request = new HelpRequest({
      user: req.user._id,
      question: req.body.question,
      userLocation: req.body.userLocation || req.originalUrl
    });

    await request.save();
    res.apiSuccess(request, "Help request submitted");
  } catch (err) {
    console.error("Help request error:", err);
    res.apiError("Could not submit help request", 500);
  }
};
