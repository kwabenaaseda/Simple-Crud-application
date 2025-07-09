const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc")
const connectDB = require("./config/db");
/* const User = require("./models/User");
const Admin = require("./models/admin");
const Feedback = require("./models/feedback");
const Activity = require("./models/activity"); */
const authRoutes = require("./routes/authRoutes")
/* const {protect} = require("./utils/auth") */
const adminRoutes = require('./routes/adminRoutes');
const dataRoutes = require('./routes/data.routes')
dotenv.config();
connectDB(); // Connect to MongoDB
const PORT = process.env.PORT || 3000;

//Queue
const navigation = [];
//

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:5000", "http://127.0.0.1:5000", "http://127.0.0.2:5500"]
    : ["https://snappod.netlify.app"];
    
const server = express()
server.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // 👈 important!
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
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Snappod API',
    version: '1.0.0',
    description: 'Fullstack CRUD App API Documentation',
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000'
        : 'https://simple-crud-application-0w9e.onrender.com'
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/*.js','./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.get("/api/status", (req, res) => {
  res.json({ success: true, env: process.env.NODE_ENV });
});
//Routes

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/signup/data",authRoutes)
server.use('/api/admin', adminRoutes);
server.use("/api/data",dataRoutes)
server.use("/api/tasks", require("./routes/task.routes"));
// Add this at the END of your middleware chain
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error' 
  });
});
/* const getTimeStamp = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
}; */

//Route Requests
// Temporary route to debug responses
server.get('/api/test', (req, res) => {
  res.json({ status: 'API working' });
});

server.get("/admin", (req,res) => {
    res.redirect("https://snappod.netlify.app/pages/admin/adminlogin.html");
})

server.listen(PORT, () =>
  console.log("🔥 Server is Running! : http://localhost:" + PORT)
);
