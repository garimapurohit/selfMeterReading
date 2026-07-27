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
  upload.fields([
    { name: "kwhImage",
       maxCount: 1 
    },

    { name: "kvahImage", 
      maxCount: 1 
    }
  ]),
  createReading
);
router.get("/", getAllReadings);
router.get("/caNumber/:caNumber", getReadingsByCaNumber);
router.get("/:id", getReadingsById);


module.exports = router;