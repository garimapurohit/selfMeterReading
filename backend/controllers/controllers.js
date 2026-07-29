// use db object to interact with the database .. 
const db = require("../db/db");
const { uploadImage } = require("../services/cloudinaryService");

// Create a new meter reading
const createReading = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      caNumber,
      meterNumber,
      readingDate,
      kwh,
      kvh,
    } = req.body;

    // Check both images
    if (
      !req.files ||
      !req.files.kwhImage ||
      !req.files.kvahImage
    ) {
      return res.status(400).json({
        success: false,
        message: "Both KWH and KVAH images are required",
      });
    }

    const kwhImage = req.files.kwhImage[0];
    const kvahImage = req.files.kvahImage[0];

const kwhImageName = await uploadImage(kwhImage.buffer);
const kvahImageName = await uploadImage(kvahImage.buffer);

    // Save reading
    db.run(
      `INSERT INTO meter_readings
      (
        caNumber,
        meterNumber,
        readingDate,
        kwh,
        kvh,
        kwhImageName,
        kvahImageName
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        caNumber,
        meterNumber,
        readingDate,
        kwh,
        kvh,
        kwhImageName,
        kvahImageName,
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

