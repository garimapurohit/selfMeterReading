const db = require("../db/db");
// to create a new reading
const createReading = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const {
    caNumber,
    meterNumber,
    readingDate,
    kwh,
    kvh,
  } = req.body;

  const imageName = req.file.filename;

  db.run(
    `INSERT INTO meter_readings
     (caNumber, meterNumber, readingDate, kwh, kvh, imageName)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      caNumber,
      meterNumber,
      readingDate,
      kwh,
      kvh,
      imageName,
    ],
    function (err) {
      if (err) {
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
// to get all readings in the database 
const getAllReadings = (req, res) => {
  db.all(
    "SELECT * FROM meter_readings",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch readings",
        });
      }

      res.status(200).json({
        success: true,
        data: rows,
      });
    }
  );
};
const getReadingsById = (req, res) => {
  db.get(
    "SELECT * FROM meter_readings WHERE RegisterId = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to get reading",
        });
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Reading not found",
        });
      }

      res.status(200).json({
        success: true,
        data: row,
      });
    }
  );
};
const getReadingsByCaNumber = (req, res) => {
  db.get(
    "SELECT * FROM meter_readings WHERE caNumber = ?",
    [req.params.caNumber],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to get reading",
        });
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Reading not found",
        });
      }

      res.status(200).json({
        success: true,
        data: row,
      });
    }
  );
};
module.exports = {
  createReading,
  getAllReadings,
  getReadingsById,
  getReadingsByCaNumber,
};

