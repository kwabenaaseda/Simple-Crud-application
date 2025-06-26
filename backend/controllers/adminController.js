// controllers/adminController.js
const Admin = require('../models/admin');
const Activity = require('../models/activity');
const { generateToken } = require('../utils/auth');

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;
    
    // Verify admin secret key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin secret key'
      });
    }
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }
    
    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password
    });
    
    // Log activity
    await Activity.create({
      message: `Admin ${name} signed up`,
      admin: admin._id
    });
    
    // Generate token
    const token = generateToken(admin._id, 'admin');
    
    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};