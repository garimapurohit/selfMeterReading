const crypto = require("crypto"); // we used this becoz it is safer than the math.random() as it doesn't generate predictable number.. 
const db = require("../db/db");
const { sendOTP } = require("./mailService");

// we have functions here generateSecureOtp , getOtpExpiry, cleanupExpiredOtps, generateAndSendOTP, verifyOTP 

// this function is used to generate a 6 digi otp 
const generateSecureOtp = () => {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
};

// done so that otp expires after 5 minsss
const getOtpExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000).toISOString();
};

// it removes the otp that are expired...from the db...
const cleanupExpiredOtps = () => {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();

    db.run("DELETE FROM otp_codes WHERE expiresAt <= ?", [now], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes);
    });
  });
};

// this functions runs every after every minutes  to clean the expired otp from otp_code table..... 
setInterval(() => {
  cleanupExpiredOtps().catch((err) => {
    console.error("Failed to cleanup expired OTPs:", err);
  });
}, 60 * 1000);

// Generate, save/update and send OTP
const generateAndSendOTP = (email) => {
  return new Promise((resolve, reject) => {
    cleanupExpiredOtps()
      .then(() => {
        const otp = generateSecureOtp();
        const expiresAt = getOtpExpiry();

        db.get(
          "SELECT id FROM otp_codes WHERE email = ?",
          [email],
          (err, row) => {
        if (err) {
          return reject(err);
        }

        // it checks that otp has gen for this mail if yes... then it just updates the otp with new otp and expirt time.. 
        // else new row insert ,,,, 
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
      })
      .catch(reject);
  });
};
const verifyOTP = (email, otp) => {
  return new Promise((resolve, reject) => {
    cleanupExpiredOtps()
      .then(() => {
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
              db.run("DELETE FROM otp_codes WHERE email = ?", [email], (deleteErr) => {
                if (deleteErr) {
                  return reject(deleteErr);
                }

                return reject(new Error("OTP_EXPIRED"));
              });
              return;
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
      })
      .catch(reject);
  });
};

module.exports = {
  generateAndSendOTP,
  verifyOTP,
};