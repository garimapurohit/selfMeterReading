const express = require("express");
const router = express.Router();

const { createReading } = require("../controllers/controllers");

router.post("/", createReading);

module.exports = router;