const Task = require('../models/task');

// controllers/taskController.js
exports.createTask = async (req, res) => {
  try {
    console.log("🚀 createTask: req.body =", req.body);
    console.log("🚀 createTask: req.user =", req.user);

    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    console.log("✅ Task saved:", task);

    res.status(201).json({ success: true, message: 'Task saved', task });
  } catch (err) {
    console.error("❌ createTask error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // 👈 secure ownership
      req.body,
      { new: true }
    );

    if (!task) return res.apiError("Task not found or unauthorized", 404);

    res.apiSuccess(task, "Task updated");
  } catch (err) {
    res.apiError(err.message, 500);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!deleted) return res.apiError("Task not found or unauthorized", 404);

    res.apiSuccess(null, "Task deleted");
  } catch (err) {
    res.apiError(err.message, 500);
  }
};
