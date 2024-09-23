// src/models/pdftotable.model.js

const Pdftotable = require("./pdftotable.mongo");

// Function to get the last uploaded PDF
async function lastPdfUpload() {
  return await Pdftotable.findOne().sort({ _id: -1 });
}

module.exports = { lastPdfUpload };
