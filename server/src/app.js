const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Corrected CORS origin
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Handle POST request
app.post("/climb", (req, res) => {
  res.send(req.body.message);
});

// Handle all other routes and serve index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
