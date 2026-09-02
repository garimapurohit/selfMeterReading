require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./db/initDB");

console.log("ROUTES FILE LOADED");


const readingRoutes = require("./routes/ReadingRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  next();
});

const path = require("path");

// becoz abh we using cloudinary for img uploads 
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );
app.use("/api/readings", readingRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});