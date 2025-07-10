// models/Feedback.js
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true
  },
  userLocation: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);
