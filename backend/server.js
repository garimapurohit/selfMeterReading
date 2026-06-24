const express = require("express");
const cors = require("cors");
require("./db/initDB");

console.log(__dirname);
console.log("ROUTES FILE LOADED");


const readingRoutes = require("./routes/readingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  next();
});

app.use("/api/readings", readingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});