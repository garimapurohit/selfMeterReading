const express = require("express");
const router = express.Router();

const {
  createReading,
  getAllReadings,
} = require("../controllers/controllers");

router.post("/", createReading);

router.get("/", getAllReadings);

module.exports = router;