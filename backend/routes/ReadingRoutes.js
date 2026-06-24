const express = require("express");
const router = express.Router();

const {
  createReading,
  getAllReadings,
  getReadingsById,
  getReadingsByCaNumber,
} = require("../controllers/controllers");

router.post("/", createReading);

router.get("/", getAllReadings);
router.get("/caNumber/:caNumber", getReadingsByCaNumber);
router.get("/:id", getReadingsById);


module.exports = router;