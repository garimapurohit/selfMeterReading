const db = require("../db/db");
const createReading = (req, res) => {
  console.log("BODY:", req.body);
  const {
    caNumber,
    meterNumber,
    readingDate,
    kwh,
    kvh,
  } = req.body;
  console.log(caNumber);

  res.status(200).json({
    success: true,
    message: "Reading received successfully",
  });
};

module.exports = { createReading };