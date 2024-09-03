const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");
const api = require("./routes/api");
const app = express();

const mongoURI =
  "mongodb+srv://pdftools:Aadil112233@pdftoolscluster.bzxbsfs.mongodb.net/?retryWrites=true&w=majority&appName=pdftoolscluster";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", api);
app.use("/files", express.static(path.join(__dirname, "..", "..", "files")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
