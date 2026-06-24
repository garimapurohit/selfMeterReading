const db = require("../db/db");

const createReading = (req, res) => {
  console.log("NEW CONTROLLER RUNNING");
  const {
    caNumber,
    meterNumber,
    readingDate,
    kwh,
    kvh,
  } = req.body;

  db.run(
    `INSERT INTO meter_readings
     (caNumber, meterNumber, readingDate, kwh, kvh)
     VALUES (?, ?, ?, ?, ?)`,
    [caNumber, meterNumber, readingDate, kwh, kvh],
    function (err) {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to save reading",
        });
      }

      res.status(201).json({
        success: true,
        message: "Reading saved successfully",
        registerId: this.lastID,
      });
    }
  );
};

module.exports = { createReading };