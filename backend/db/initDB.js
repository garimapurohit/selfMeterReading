const db = require("./db");

console.log("initDB file executed");
db.run("PRAGMA foreign_keys = ON;");

// db.run("DROP TABLE IF EXISTS meter_readings;");
// db.run("DROP TABLE IF EXISTS users;");
// db.run("DROP TABLE IF EXISTS otp_codes;");

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
        console.error("error otpcodes table:", err);
    } else {
        console.log("otpcodes table workinggg");
    }
});

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

db.run(`
CREATE TABLE IF NOT EXISTS meter_readings (
    RegisterId INTEGER PRIMARY KEY AUTOINCREMENT,
    caNumber TEXT NOT NULL,
    meterNumber TEXT NOT NULL,
    readingDate TEXT NOT NULL,
    kwh REAL NOT NULL,
    kvh REAL NOT NULL,
    imageName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMEnpmSTAMP,
    FOREIGN KEY (caNumber) REFERENCES users (caNumber) ON DELETE CASCADE
)
`, (err) => {
    if (err) {
        console.error("Error MeterReading tablee:", err);
    } else {
        console.log("meter Reading table.. working");
    }
});
