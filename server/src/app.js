const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

// Corrected: Define the MongoDB connection string as a string, not with require()
const mongoURI =
  "mongodb+srv://pdftools:Aadil112233@pdftoolscluster.bzxbsfs.mongodb.net/?retryWrites=true&w=majority&appName=pdftoolscluster";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

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
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
