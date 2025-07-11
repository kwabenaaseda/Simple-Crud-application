const User = require('../models/User');
const Profile = require('../models/Profile');
const Activity = require('../models/activity');
const { sendWelcomeEmail } = require('../utils/emailService');
const { generateToken } = require('../utils/auth');
const { notifyAll } = require('../utils/notify');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({ username, email, password });
    await Profile.create({ user: user._id });

    await Activity.create({
      message: `User ${username} signed up successfully`,
      user: user._id
    });

    const token = generateToken(user._id);
    await sendWelcomeEmail(user.email, user.username);

    const userCount = await User.countDocuments();

    await notifyAll({
      subject: '👤 New User Signup',
      message: `A new user has signed up.\nName: ${user.username}\nTotal Users: ${await User.countDocuments()}`

    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      redirectUrl: "/pages/user/user"
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    await Activity.create({
      message: `User ${user.username} logged in`,
      user: user._id
    });

    await notifyAll({
      subject: '✅ User Login',
      message: `User ${user.username} just logged in`
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      redirectUrl: "/pages/user/user"
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
