const db = require("../db/db");
const { uploadImage } = require("../services/cloudinaryService");

// Create a new meter reading
const createReading = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      caNumber,
      meterNumber,
      readingDate,
      kwh,
      kvh,
    } = req.body;

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Meter image is required",
      });
    }

    // Upload image to Cloudinary
    const imageName = await uploadImage(req.file.buffer);

    // Save reading in database
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
          console.error(err);

          return res.status(500).json({
            success: false,
            message: "Failed to save reading",
          });
        }

        return res.status(201).json({
          success: true,
          message: "Reading saved successfully",
          registerId: this.lastID,
        });
      }
    );
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to save reading",
    });
  }
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
  db.all(
    "SELECT * FROM meter_readings WHERE caNumber = ?",
    [req.params.caNumber],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to get reading",
        });
      }

      if (!rows) {
        return res.status(404).json({
          success: false,
          message: "Reading not found",
        });
      }

      res.status(200).json({
        success: true,
        data: rows,
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

