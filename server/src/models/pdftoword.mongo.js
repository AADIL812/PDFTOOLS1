const mongoose = require("mongoose");

const pdftowordschema = mongoose.Schema({
  pdf: String,
  title: String,
});

const PdftoWord = mongoose.model("pdftoword", pdftowordschema);

module.exports = PdftoWord;
