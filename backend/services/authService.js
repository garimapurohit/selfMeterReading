const db = require("../db/db");

const createUser = (caNumber, email) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (caNumber, email) VALUES (?, ?)",
      [caNumber, email],
      function (err) {
        if (err) return reject(err);

        resolve({
          userId: this.lastID,
          caNumber,
          email,
        });
      }
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, row) => {
        if (err) return reject(err);

        resolve(row);
      }
    );
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};