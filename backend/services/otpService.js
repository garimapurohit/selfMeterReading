const crypto = require("crypto");
const db = require("../db/db");
const { sendOTP } = require("./mailService");

// Generate a secure 6-digit OTP
const generateSecureOtp = () => {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
};

// Generate OTP expiry time (5 minutes)
const getOtpExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000).toISOString();
};

// Generate, save/update and send OTP
const generateAndSendOTP = (email) => {
  return new Promise((resolve, reject) => {
    const otp = generateSecureOtp();
    const expiresAt = getOtpExpiry();

    db.get(
      "SELECT id FROM otp_codes WHERE email = ?",
      [email],
      (err, row) => {
        if (err) {
          return reject(err);
        }

        const query = row
          ? "UPDATE otp_codes SET otp = ?, expiresAt = ?, verified = 0 WHERE email = ?"
          : "INSERT INTO otp_codes (email, otp, expiresAt, verified) VALUES (?, ?, ?, 0)";

        const params = row
          ? [otp, expiresAt, email]
          : [email, otp, expiresAt];

        db.run(query, params, async (runErr) => {
          if (runErr) {
            return reject(runErr);
          }

          try {
            await sendOTP(email, otp);

            resolve({
              email,
              expiresAt,
            });
          } catch (mailErr) {
            reject(mailErr);
          }
        });
      }
    );
  });
};
const verifyOTP = (email, otp) => {
  return new Promise((resolve, reject) => {

    db.get(
      "SELECT * FROM otp_codes WHERE email = ?",
      [email],
      (err, row) => {

        if (err) return reject(err);

        if (!row) {
          return reject(new Error("OTP_NOT_FOUND"));
        }

        if (row.verified === 1) {
          return reject(new Error("OTP_ALREADY_USED"));
        }

        const now = new Date();
        const expiresAt = new Date(row.expiresAt);

        if (isNaN(expiresAt.getTime()) || now > expiresAt) {
          return reject(new Error("OTP_EXPIRED"));
        }

        if (otp !== row.otp) {
          return reject(new Error("INVALID_OTP"));
        }

        db.run(
          "UPDATE otp_codes SET verified = 1 WHERE email = ?",
          [email],
          function (updateErr) {

            if (updateErr) return reject(updateErr);

            resolve(true);

          }
        );

      }
    );

  });
};

module.exports = {
  generateAndSendOTP,
  verifyOTP,
};