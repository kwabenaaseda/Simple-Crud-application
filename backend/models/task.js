// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high','normal'], // ✅ added normal
    default: 'undetermined',
  },
  schedule: Date,
  share: Boolean,
  collab: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
