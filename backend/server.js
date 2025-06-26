const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const Admin = require("./models/admin");
const Feedback = require("./models/feedback");
const Activity = require("./models/activity");
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const {protect} = require("./utils/auth")

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
server.use("/api/control/auth",authRoutes)
server.use("/api/control/admin",adminRoutes)

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const getTimeStamp = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
};

//Route Requests

//Post (Sign up data) /api/signup/data
server.post("/api/signup/data",protect, async (req, res) => {
  try {
    /* const user = await User.create(req.body); */
    const {name , mail, password} = req.body;
    if(!name || !mail || !password) {
        return res.apiError("All fields are required",400);
    }
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
        return res.apiError("User already exists", 400);
    }
    const user = await User.create({
        name,mail,password})


    await Activity.create({
      message: `User ${user.username} has signed up successfully!`,
    });
    res.apiSuccess(
      { userId: user._id }, 
      "Signup successful", 
      { redirectUrl: "https://snappod.netlify.app/user.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `User ${req.body.username} failed Signup attempted`,
      timestamp: getTimeStamp(),
    });
    console.error("Error adding user:", error);
    res.apiError("Registration failed. Please try again", 500);
  }
}); //adds a new user to the db array and assigns an id

//put (update the data) /api/data/id
server.post("/api/data/users/update/", async (req, res) => {
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
server.post("/api/data/users/update/admin", async (req, res) => {
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
server.post("/api/data/users/delete", async (req, res) => {
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
server.post("/api/data/users/delete/admin", async (req, res) => {
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

//User login
server.post("/api/signup/data/login",protect, async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail, password });
    
    if (user) {
      await Activity.create({
        message: `User ${user.name} logged in successfully!`
      });
     res.apiSuccess(
        { userId: user._id, userData: user },
        "Login successful",
        { redirectUrl: "https://snappod.netlify.app/user.html" }
     )
    } else {
      await Activity.create({
        message: `Failed login attempt for ${mail}`
      });
      res.apiError("Invalid email or password", 401);
    }
  } catch (error) {
    console.error(error);
    res.apiError("Login failed. Please try again", 500);
  }
});

//get user id
//get user posts
//search for user
//add friend
//remove friend

// Administator Endpoints
//Admin - Get (Get the Data) /api/data
server.get("/api/data/users",protect, async (req, res) => {
  try{
    const users = await User.find();
    res.apiSuccess(users, "Users retrieved successfully");
  }catch (error) {
    console.error("Error retrieving users:", error);
    res.apiError("Error retrieving users", 500);
  }
});
//An interface for the admin to see all users

//adds a new admin
server.post("/api/signup/admin",async (req, res) => {
   try {
    /* const user = await User.create(req.body); */
    const {name , mail, password} = req.body;
    if(!name || !mail || !password) {
        return res.apiError("All fields are required",400);
    }
    const existingUser = await Admin.findOne({ mail });
    if (existingUser) {
        return res.apiError("User already exists", 400);
    }

    if(!password=="admin@2020242914"){
        return res.apiError("Invalid Admin", 400);
    }
    const user = await Admin.create({
        name,mail,password})


    await Activity.create({
      message: `Admin ${user.username} has signed up successfully!`,
    });
    res.apiSuccess(
      { userId: user._id }, 
      "Signup successful", 
      { redirectUrl: "https://snappod.netlify.app/homepage.html" }
    );
  } catch (error) {
    await Activity.create({
      message: `Admin ${req.body.username} failed Signup attempted`,
      timestamp: getTimeStamp(),
    });
    console.error("Error adding user:", error);
    res.apiError("Registration failed. Please try again", 500);
  }
});
//adds a new user to the db array and assigns an id
server.post("/api/signup/data/admin", (req, res) => {
  const userdata = {
    id: db.length > 0 ? `${db.length}` : "0",
    userData: req.body,
  };
  //middleware

  db.push(userdata);
  console.log(db);
  console.log("User Added!!");
  activity.push({
    message: `User ${userdata.userData.name} at index: ${userdata.id} by Admin Successfully!!`,
    timestamp: `${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`,
  });
  res.redirect("https://snappod.netlify.app/homepage.html");
});
//login admin
server.post("/api/login/admin", (req, res) => {
  if (admin.length > 0) {
    for (let i = 0; i < admin.length; i++) {
      if (
        admin[i].adminData.mail == req.body.mail &&
        admin[i].adminData.password == req.body.password
      ) {
        console.log(
          `User ${admin[i].adminData.name} at index: ${admin[i]} exists !!`
        );
        console.log(
          `User ${admin[i].adminData.name} at index: ${admin[i]} is Logged in Successfully!!`
        );
        activity.push({
          message: `User ${admin[i].adminData.name} at index: ${admin[i]} is Logged in Successfully!!`,
          timestamp: `${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`,
        });
        console.log(admin);
        res.redirect("https://snappod.netlify.app/homepage.html");
        //admin dashboard
      } else {
        console.log(`User Doesnt exist!`);
        activity.push({
          message: `User doesnt exist`,
          timestamp: `${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`,
        });
        res.redirect("https://snappod.netlify.app/adminlogin.html");
      }
    }
  } else {
    console.log(`User Doesnt exist!`);
    activity.push({
      message: `User doesnt exist`,
      timestamp: `${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`,
    });
    res.redirect("https://snappod.netlify.app/adminsignup.html");
  }
});

//application history
server.get("/api/data/history",protect, async(req, res) => {
  try{
    const history = await Activity.find();
    res.apiSuccess(history, "History retrieved successfully");
  }catch (error) {
    console.error("Error retrieving history:", error);
    res.apiError("Error retrieving history", 500);
  }
});
server.get("/api/data/admin",protect, async (req, res) => {
  try{
    const user = await Admin.find();
    res.apiSuccess(user, "User retrieved successfully");
  }catch (error) {
    console.error("Error retrieving User:", error);
    res.apiError("Error retrieving User", 500);
  }
});
server.get("/api/data/feedback",protect, async(req, res) => {
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
