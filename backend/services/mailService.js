// Load environment variables from .env into process.env
const dotenv = require("dotenv");
dotenv.config();

// Import nodemailer to send emails using SMTP
const nodemailer = require("nodemailer");

// Create a transporter object using Gmail SMTP settings.
// The transporter is reused for sending emails.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Export an asynchronous function that sends an OTP email.
// The function accepts the recipient email and the OTP value.
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Self Meter Reading",
    text: `Your One-Time Password (OTP) is ${otp}. It expires in 5 minutes. Please use it before the expiry time.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTP,
};
