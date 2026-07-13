const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");


const {
  createReading,
  getAllReadings,
  getReadingsById,
  getReadingsByCaNumber,
} = require("../controllers/controllers");

router.post(
  "/",
  upload.single("meterImage"),
  createReading
);
router.get("/", getAllReadings);
router.get("/caNumber/:caNumber", getReadingsByCaNumber);
router.get("/:id", getReadingsById);


module.exports = router;