const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const Admin = require("./models/admin");
const Feedback = require("./models/feedback");
const Activity = require("./models/activity");
const Profile = require("./models/Profile")
const authRoutes = require("./routes/authRoutes")
const {protect} = require("./utils/auth")
const adminRoutes = require('./routes/adminRoutes');
dotenv.config();
connectDB(); // Connect to MongoDB
const PORT = process.env.PORT || 3000;

//Queue
const navigation = [];
//

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5000", "http://127.0.0.1:5000"]
    : ["https://snappod.netlify.app"];

const server = express();
server.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);
server.use((req, res, next) => {
    res.apiSuccess = (data, message = "Success", options = {}) => {
    const response = { success: true, message, data };
    if (options.redirectUrl) {
      response.redirectUrl = options.redirectUrl;
    }
    res.json(response);
  };
    res.apiError = (message, statusCode = 400 ) => {
      res.status(statusCode).json({
        success: false,
        message
      })
    }
    next();
})

//Routes

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/signup/data",authRoutes)
server.use('/api/admin', adminRoutes);
// Add this at the END of your middleware chain
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error' 
  });
});
const getTimeStamp = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
};

//Route Requests
// Temporary route to debug responses
server.get('/api/test', (req, res) => {
  res.json({ status: 'API working' });
});

//put (update the data) /api/data/id
server.post("/api/data/users/update/",protect, async (req, res) => {
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
      { redirectUrl: "https://snappod.netlify.app/user.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `Error Updating User ${req.body.name} at index ${req.body.id}`,
      timestamp: getTimeStamp(),
    });
    console.error("Error updating user:", error);
    res.apiError(`Error updating user`,500);}
});
server.post("/api/data/users/update/admin",protect, async (req, res) => {
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
      { redirectUrl: "https://snappod.netlify.app/homepage.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `Error Updating User ${req.body.name} at index ${req.body.id}`,
      timestamp: getTimeStamp(),
    });
    console.error("Error updating user:", error);
     res.apiError(`Error updating user`,500);}
  
});
//delete (remove the data)/api/data/id
server.post("/api/data/users/delete",protect, async (req, res) => {
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
    {redirectUrl:"https://snappod.netlify.app/user.html"})
  } catch (error) {
    console.error("Error deleting user:", error);
    await Activity.create({
        message: `Error Deleting User ${req.body.name} at index ${req.body.id}`,
        timestamp: getTimeStamp(),
    })
    res.apiError("Error deleting user", 500); 
  }
});
server.post("/api/data/users/delete/admin",protect, async (req, res) => {
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
    {redirectUrl:"https://snappod.netlify.app/user.html"})
  } catch (error) {
    console.error("Error deleting user:", error);
    await Activity.create({
        message: `Error Deleting User ${req.body.name} at index ${req.body.id}`,
        timestamp: getTimeStamp(),
    })
    res.apiError("Error deleting user", 500); 
  }
});



// Administator Endpoints
//Admin - Get (Get the Data) /api/data
server.get("/api/data/users", async (req, res) => {
  try{
    const users = await User.find();
    res.apiSuccess(users, "Users retrieved successfully");
  }catch (error) {
    console.error("Error retrieving users:", error);
    res.apiError("Error retrieving users", 500);
  }
});
//An interface for the admin to see all users


//application history
server.get("/api/data/history", async(req, res) => {
  try{
    const history = await Activity.find();
    res.apiSuccess(history, "History retrieved successfully");
  }catch (error) {
    console.error("Error retrieving history:", error);
    res.apiError("Error retrieving history", 500);
  }
});
server.get("/api/data/admin", async (req, res) => {
  try{
    const user = await Admin.find();
    res.apiSuccess(user, "User retrieved successfully");
  }catch (error) {
    console.error("Error retrieving User:", error);
    res.apiError("Error retrieving User", 500);
  }
});
server.get("/api/data/feedback", async(req, res) => {
  try{
    const Feedback = await Feedback.find();
    res.apiSuccess(Feedback, "Feedback retrieved successfully");
  }catch (error) {
    console.error("Error retrieving Feedback:", error);
    res.apiError("Error retrieving Feedback", 500);
  }
});
server.post("/api/data/feedback", async (req, res) => {
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
    res.status(500).send("Server Error");
  }
});

server.get("/admin", (req,res) => {
    res.redirect("https://snappod.netlify.app/adminlogin.html");
})

server.listen(PORT, () =>
  console.log("🔥 Server is Running! : http://localhost:" + PORT)
);
