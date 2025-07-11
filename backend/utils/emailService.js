const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (to, username) => {
  const mailOptions = {
    from: `"Snappod" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Welcome to Snappod 🎉',
    html: `
      <h2>Hello ${username},</h2>
      <p>Welcome to <strong>Snappod</strong>! We're excited to have you onboard.</p>
      <p>Feel free to explore and give us feedback anytime.</p>
      <br />
      <p>Cheers,<br/>The Snappod Team 🚀</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };
