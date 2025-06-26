// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 13,
    max: 120
  },
  country: String,
  bio: String,
  avatarUrl: String,
  friendList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  navigationHistory: [{
    path: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);