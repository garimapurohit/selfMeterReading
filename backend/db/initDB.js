const db = require("./db");

// console.log("for debugging ... initDB.js file running.");
db.run("PRAGMA foreign_keys = ON;");

// db.run("DROP TABLE IF EXISTS meter_readings;");
// db.run("DROP TABLE IF EXISTS users;");
// db.run("DROP TABLE IF EXISTS otp_codes;");

// here we create tables using db object from db.js file. we are using sqlite3 database. we are creating 3 tables: otp_codes, users, meter_readings
db.run(`
CREATE TABLE IF NOT EXISTS otp_codes ( 

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expiresAt DATETIME NOT NULL,
    verified INTEGER DEFAULT 0
)
`, (err) => {
    if (err) {
        console.error("error in otpcodes table:", err);
    } else {
        console.log("otpcodes table workinggg");
    }
});

// the tables don't delete when the server restarts because we are using "IF NOT EXISTS" in the CREATE TABLE statement. 
// This means that if the table already exists, it will not be created again.
//  This is useful for keeping the data in the tables intact across server restarts.


// Authentication: Users table
db.run(`
CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    caNumber TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.error("error user table:", err);
    } else {
        console.log("users table working");
    }
});
// only the db object is reintialized when the server restarts, not the tables. The tables are persistent and will remain in the database even after the server restarts.
// And the db always tries to find the tables in the database.db files.. if it is not there we create it.
//  if it is there we use it. so the tables are persistent and will remain in the database even after the server restarts.
db.run(`
CREATE TABLE IF NOT EXISTS meter_readings (
    RegisterId INTEGER PRIMARY KEY AUTOINCREMENT,
    caNumber TEXT NOT NULL,
    meterNumber TEXT NOT NULL,
    readingDate TEXT NOT NULL,
    kwh REAL NOT NULL,
    kvh REAL NOT NULL,
    kwhImageName TEXT NOT NULL,
    kvahImageName TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (caNumber) REFERENCES users (caNumber) ON DELETE CASCADE
)
`, (err) => {
    if (err) {
        console.error("Error in meter Readingg tablee:", err);
    } else {
        console.log("meter Reading table.. working");
    }
});
