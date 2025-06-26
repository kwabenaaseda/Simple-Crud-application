const Admin = require('../models/admin');
const Activity = require('../models/activity');
const { generateToken } = require('../utils/auth');

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (password!=="admin@2020242914") {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin secret key'
      });
    }
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists'
      });
    }
    
    const admin = await Admin.create({ name, email, password });
    
    await Activity.create({
      message: `Admin ${name} signed up`,
      admin: admin._id
    });
    
    const token = generateToken(admin._id, 'admin');
    
    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      redirectUrl: "/homepage"
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      await Activity.create({
        message: `Failed admin login attempt for ${email}`
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await Activity.create({
        message: `Failed admin login attempt for ${email}`
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const token = generateToken(admin._id, 'admin');
    
    await Activity.create({
      message: `Admin ${admin.name} logged in`,
      admin: admin._id
    });
    
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      redirectUrl: "/homepage"
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};