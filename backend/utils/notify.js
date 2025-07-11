// utils/notify.js
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const {
  EMAIL_USER,
  EMAIL_PASS,
  OWNER_EMAIL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  OWNER_WHATSAPP
} = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendEmail = async (subject, message) => {
  return transporter.sendMail({
    from: `"Snappod" <${EMAIL_USER}>`,
    to: OWNER_EMAIL,
    subject,
    text: message,
  });
};

exports.sendWhatsApp = async (message) => {
  return twilioClient.messages.create({
    from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
    to: `whatsapp:${OWNER_WHATSAPP}`,
    body: message,
  });
};

exports.notifyAll = async ({ subject, message }) => {
  try {
    await Promise.all([
      exports.sendEmail(subject, message),
      exports.sendWhatsApp(message)
    ]);
    console.log('📬 Notification sent');
  } catch (error) {
    console.error('❌ Notification error:', error.message);
  }
};
