const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const Grid = require("gridfs-stream");

const cors = require("cors");
const app = express();
const { api } = require("./routes/api");
// Corrected: Define the MongoDB connection string as a string, not with require()
const mongoURI =
  "mongodb+srv://pdftools:Aadil112233@pdftoolscluster.bzxbsfs.mongodb.net/?retryWrites=true&w=majority&appName=pdftoolscluster";

mongoose
  .connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Corrected CORS origin
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Handle all other routes and serve index.html
app.use(api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
