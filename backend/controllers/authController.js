const db = require("../db/db");
const {generateAndSendOTP, verifyOTP,} = require("../services/otpService");

const {createUser,findUserByEmail,} = require("../services/authService");
// we check for the email formattt 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//  REGISTER 
const register = async (req, res) => {
  const { caNumber, email } = req.body;

  //  CA Number validaationn 
  if (!caNumber || caNumber.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "CA Number is required",
    });
  }

  // Validate Email
  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required field..",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Check CA Number
  db.get(
    "SELECT userId FROM users WHERE caNumber = ?",
    [caNumber],
    (err, row) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "there is an error in database,.",
        });
      }

      if (row) {
        return res.status(409).json({
          success: false,
          message: "caNumber already registered..",
        });
      }

      // Check Email
      db.get(
        "SELECT userId FROM users WHERE email = ?",
        [email],
        async ( row) => {
          if (row) {
            return res.status(400).json({
              success: false,
              message: "This email is already registerd... please login",
            });
          }

          try {
            const result = await generateAndSendOTP(email);

            return res.status(200).json({
              success: true,
              message: "OTP sent successfully",
              data: {
                caNumber,
                email: result.email,
                expiresAt: result.expiresAt,
              },
            });
          } catch (err) {
            console.error(err);

            return res.status(500).json({
              success: false,
              message: "Failed to send OTP",
            });
          }
        }
      );
    }
  );
};
// verify otp 
const verifyOtp = async (req, res) => {
  const { caNumber, email, otp } = req.body;

  // Validate CA Number
  if (!caNumber || caNumber.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "CA Number is required",
    });
  }

  // Validate Email
  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  // Validate OTP
  if (!otp || otp.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }

  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({
      success: false,
      message: "OTP must be exactly 6 digits",
    });
  }

  try {
    // Verify OTP
    await verifyOTP(email, otp);

    // Create new user
    await createUser(caNumber, email);

    return res.status(200).json({
      success: true,
      message: "OTP verified and user registered successfully",
    });
  } catch (err) {
    switch (err.message) {
      case "OTP_NOT_FOUND":
        return res.status(404).json({
          success: false,
          message: "OTP not found",
        });

      case "OTP_ALREADY_USED":
        return res.status(400).json({
          success: false,
          message: "OTP already used",
        });

      case "OTP_EXPIRED":
        return res.status(400).json({
          success: false,
          message: "OTP expired",
        });

      case "INVALID_OTP":
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });

      default:
        // Handle duplicate user
        if (err.message && err.message.includes("UNIQUE")) {
          return res.status(409).json({
            success: false,
            message: "CA Number or Email already registered",
          });
        }

        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Error in database",
        });
    }
  }
};

// login function 
const login = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  try {
    // Check if user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Generate and send OTP
    await generateAndSendOTP(email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email,
      },
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Error in database",
    });

  }
};
// verify login 
const verifyLogin = async (req, res) => {

  const { email, otp } = req.body;

  if (!email || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!otp || otp.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "OTP is required",
    });
  }

  try {

    await verifyOTP(email, otp);

    const user = await findUserByEmail(email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        userId: user.userId,
        caNumber: user.caNumber,
        email: user.email,
      },
    });

  } catch (err) {

    switch (err.message) {

      case "OTP_NOT_FOUND":
        return res.status(404).json({
          success: false,
          message: "OTP not found",
        });

      case "OTP_ALREADY_USED":
        return res.status(400).json({
          success: false,
          message: "OTP already used",
        });

      case "OTP_EXPIRED":
        return res.status(400).json({
          success: false,
          message: "OTP expired",
        });

      case "INVALID_OTP":
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });

      default:
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Error in database",
        });

    }

  }

};
// Get all users (Debug)
const getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Error in database",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  });
};

// Get all OTPs (Debug)
const getOtps = (req, res) => {
  db.all("SELECT * FROM otp_codes", [], (err, rows) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Error in database",
      });
    }

    return res.status(200).json({
      success: true,
      data: rows,
    });
  });
};
module.exports = {
  register,
  verifyOtp,
  login,
  verifyLogin,
  getUsers,
  getOtps,
};