const User = require("../models/User");
const Profile = require("../models/Profile")
const Task = require("../models/task")
const Admin = require("../models/admin");
const Feedback = require("../models/feedback");
const Activity = require("../models/activity");

const getTimeStamp = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
};

exports.userUpdate = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
     
      await Activity.create({
        message: `Update Attempt on non-existent user at ${req.url}`,
        timestamp: getTimeStamp(),
      });
      return res.apiError("User not found", 404);
    }

    await Activity.create({
      message: `User at index: ${user.name} is Updated Successfully!!`,
      timestamp: getTimeStamp(),
    });
    res.apiSuccess(
      { userId: user._id, userData: user },
      "User updated successfully",
      { redirectUrl: "https://snappod.netlify.app/pages/user/user.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `Error Updating User ${req.body.name} at index ${req.body.id}`,
      timestamp: getTimeStamp(),
    });
    console.error("Error updating user:", error);
    res.apiError(`Error updating user`,500);}
};
exports.AdminUpdate =  async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
     
      await Activity.create({
        message: `Update Attempt on non-existent user at ${req.url}`,
        timestamp: getTimeStamp(),
      });
      return res.apiError("User not found", 404);
    }

    await Activity.create({
      message: `User at index: ${user.name} is Updated Successfully!!`,
      timestamp: getTimeStamp(),
    });
    res.apiSuccess(
      { userId: user._id, userData: user },
      "User updated successfully",
      { redirectUrl: "https://snappod.netlify.app/pages/homepage.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `Error Updating User ${req.body.name} at index ${req.body.id}`,
      timestamp: getTimeStamp(),
    });
    console.error("Error updating user:", error);
     res.apiError(`Error updating user`,500);}
  
};
//delete (remove the data)/api/data/id
exports.userDelete =  async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id)
    if(!User){
        return res.apiError("User not found", 404);
    }
    await Activity.create({
        message: `User ${req.body.name} at index ${id} is Deleted Successfully!!`,
        timestamp: getTimeStamp(),
    })
    res.apiSuccess(
      { userId: id },
      "User deleted successfully",
    {redirectUrl:"https://snappod.netlify.app/pages/user/user.html"})
  } catch (error) {
    console.error("Error deleting user:", error);
    await Activity.create({
        message: `Error Deleting User ${req.body.name} at index ${req.body.id}`,
        timestamp: getTimeStamp(),
    })
    res.apiError("Error deleting user", 500); 
  }
};
exports.adminDelete =  async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id)
    await Task.findByIdAndDelete(id)
    await Profile.findByIdAndDelete(id)
    if(!User){
        return res.apiError("User not found", 404);
    }
    await Activity.create({
        message: `User ${req.body.name} at index ${id} is Deleted Successfully!!`,
        timestamp: getTimeStamp(),
    })
    res.apiSuccess(
      { userId: id },
      "User deleted successfully",
    {redirectUrl:"https://snappod.netlify.app/pages/user/user.html"})
  } catch (error) {
    console.error("Error deleting user:", error);
    await Activity.create({
        message: `Error Deleting User ${req.body.name} at index ${req.body.id}`,
        timestamp: getTimeStamp(),
    })
    res.apiError("Error deleting user", 500); 
  }
};



// Administator Endpoints
//Admin - Get (Get the Data) /api/data
exports.getallUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.apiSuccess(users, "Users retrieved successfully");
  }catch (error) {
    console.error("Error retrieving users:", error);
    res.apiError("Error retrieving users", 500);
  }
};
//An interface for the admin to see all users


//application history
exports.history=  async(req, res) => {
  try{
    const history = await Activity.find();
    res.apiSuccess(history, "History retrieved successfully");
  }catch (error) {
    console.error("Error retrieving history:", error);
    res.apiError("Error retrieving history", 500);
  }
};
exports.getallAdmins =  async (req, res) => {
  try{
    const user = await Admin.find();
    res.apiSuccess(user, "User retrieved successfully");
  }catch (error) {
    console.error("Error retrieving User:", error);
    res.apiError("Error retrieving User", 500);
  }
};
// POST /api/data/feedback
/**
 * @desc    Add user feedback
 * @route   POST /api/data/feedback
 * @access  Private (User)
 */
exports.addFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const user = req.user; // from protect middleware
    const userLocation = req.headers.referer || req.originalUrl;

    if (!feedback || typeof feedback !== 'string') {
      return res.apiError('Feedback content is required', 400);
    }

    const feedbackData = await Feedback.create({
      user: user.email,
      feedback,
      userLocation,
      userid: user._id,
    });

    res.apiSuccess(feedbackData, 'Feedback submitted successfully');
     await Activity.create({
        message: `User ${user.email} sent feedback succesfully`,
        timestamp: getTimeStamp(),
    })
  } catch (error) {
    console.error('❌ Feedback submission error:', error);
    res.apiError('Error saving feedback', 500);
    await Activity.create({
        message: `User ${user.email} sent feedback unsuccesfully`,
        timestamp: getTimeStamp(),
    })
  }
};

/**
 * @desc    Get all feedback entries
 * @route   GET /api/data/feedback
 * @access  Private (Admin/User)
 */
exports.getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find()
      .populate('userid', 'username email')
      .sort({ createdAt: -1 });

    res.apiSuccess(feedbackList, 'Feedback retrieved successfully');
  } catch (error) {
    console.error('❌ Feedback retrieval error:', error);
    res.apiError('Error retrieving feedback', 500);
  }
};