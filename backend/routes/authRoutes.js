const express = require("express");
const router = express.Router();

// Import auth controller functions
const {
  register,
  verifyOtp,
  login,
  verifyLogin,
} = require("../controllers/authController");

// Define POST route for user registration
// Route: POST /api/auth/register
// Calls the register function from authController
router.post("/register", register);

// Define POST route for OTP verification
// Route: POST /api/auth/verify-otp
// Calls the verifyOtp function from authController
router.post("/verify-otp", verifyOtp);

// Define POST route for user login
// Route: POST /api/auth/login
// Calls the login function from authController
router.post("/login", login);

// Define POST route for login OTP verification
// Route: POST /api/auth/verify-login
// Calls the verifyLogin function from authController
router.post("/verify-login", verifyLogin);

// Export the router to be used in server.js
module.exports = router;