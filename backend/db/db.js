// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./database/database.db", (err) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//   }
//   else {
//     console.log("Connecttion successful to SQLlite database");
//   }
// });

// module.exports = db; 
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Create the database directory if it doesn't exist
const dbDir = path.join(__dirname, "../database");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Full path to the database file
const dbPath = path.join(dbDir, "database.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected successfully to SQLite database");
  }
});

module.exports = db;