const mongoose = require('mongoose');

// models/task.js
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high', 'undetermined'], default: 'undetermined' },
  schedule: Date,
  share: Boolean,
  collab: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 Add this
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Task', taskSchema);
