// utils/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin');
const User = require('../models/User');

dotenv.config();

// Generate JWT token
const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Protect routes middleware
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user based on role
    let user;
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password');
    } else {
      user = await User.findById(decoded.id).select('-password');
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

const verify = (req, res, next) => {
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
}

module.exports = { generateToken, protect , verify };