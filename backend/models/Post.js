// models/Post.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reactionType: {
    type: String,
    enum: ['like', 'love', 'laugh', 'wow', 'sad', 'angry'],
    default: 'like'
  }
}, { _id: false });

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  mediaUrl: String,
  reactions: [reactionSchema],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  visibility: {
    type: String,
    enum: ['public', 'friends', 'private'],
    default: 'friends'
  }
}, { timestamps: true });

// Index for faster querying
postSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);