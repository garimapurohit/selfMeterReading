const express = require("express");
const router = express.Router();

const {
  createReading,
  getAllReadings,
  getReadingsById,
} = require("../controllers/controllers");

router.post("/", createReading);

router.get("/", getAllReadings);
router.get("/:id",getReadingsById);


module.exports = router;