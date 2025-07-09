const User = require("../models/User");
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
exports.feedback =  async(req, res) => {
  try{
    const Feedback = await Feedback.find();
    res.apiSuccess(Feedback, "Feedback retrieved successfully");
  }catch (error) {
    console.error("Error retrieving Feedback:", error);
    res.apiError("Error retrieving Feedback", 500);
  }
};
exports.addFeedback =  async (req, res) => {
  try {
    // Find the user in the database (using Mongoose)
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create and save feedback
    const feedbackData = new Feedback({
      user: req.body.mail,
      feedback: req.body.content,
      userLocation: req.url,
      userid: user._id, // Store the user's MongoDB ID
    });

    await feedbackData.save();

    // Redirect back to the previous page
    res.redirect("back"); // or res.redirect(req.headers.referer || '/');
  } catch (err) {
    console.error("Feedback submission error:", err);
    res.status(500).send("router Error");
  }
};