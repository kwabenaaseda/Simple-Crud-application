const HelpRequest = require('../models/HelpRequest');
const Admin = require('../models/admin');
const Activity = require('../models/activity');
const { notifyAll } = require('../utils/notify');
const sendEmail = require('../utils/mailer');

const getTimeStamp = () => {
  const time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}--${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}`;
};

exports.submitHelp = async (req, res) => {
  try {
    const user = req.user;
    const question = req.body.question;
    const location = req.body.userLocation || req.originalUrl;

    if (!question || typeof question !== "string") {
      return res.apiError("Question field is required", 400);
    }

    const request = new HelpRequest({
      user: user._id,
      question,
      userLocation: location
    });

    await request.save();

    // Log activity
    await Activity.create({
      message: `Help request submitted by ${user.email}`,
      timestamp: getTimeStamp()
    });

    // Notify admins via email
    const admins = await Admin.find({}, "email");
    const adminEmails = admins.map(a => a.email).join(",");

    await sendEmail({
      to: adminEmails,
      subject: "🆘 New Help Request",
      html: `
        <h2>Help Request Received</h2>
        <p><strong>User:</strong> ${user.email}</p>
        <p><strong>Question:</strong> ${question}</p>
        <p><strong>Page:</strong> ${location}</p>
        <small>Snappod Admin Portal</small>
      `
    });

    // WhatsApp + email to OWNER
    await notifyAll({
      subject: "🆘 Help Request",
      message: `User ${user.email} asked:\n"${question}"`
    });

    res.apiSuccess(request, "Help request submitted");
  } catch (err) {
    console.error("Help request error:", err);

    await Activity.create({
      message: `Error submitting help request from ${req.user?.email || 'unknown user'}`,
      timestamp: getTimeStamp()
    });

    res.apiError("Could not submit help request", 500);
  }
};
