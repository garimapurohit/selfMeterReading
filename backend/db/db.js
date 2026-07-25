const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  }
  else {
    console.log("Connecttion successful to SQLlite database");
  }
});

module.exports = db; 