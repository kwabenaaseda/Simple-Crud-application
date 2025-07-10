// models/HelpRequest.js
const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  userLocation: String,
  status: {
    type: String,
    enum: ['pending', 'answered'],
    default: 'pending'
  },
  answer: String
}, { timestamps: true });

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
