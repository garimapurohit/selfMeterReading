const db = require("./db");

console.log("initDB file executed");

db.run(`
CREATE TABLE IF NOT EXISTS meter_readings (
    RegisterId INTEGER PRIMARY KEY AUTOINCREMENT,
    caNumber TEXT NOT NULL,
    meterNumber TEXT NOT NULL,
    readingDate TEXT NOT NULL,
    kwh REAL NOT NULL,
    kvh REAL NOT NULL,
    imageName TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {
    if (err) {
        console.error("TABLE ERROR:", err);
    } else {
        console.log("meter_readings table ready");
    }
});