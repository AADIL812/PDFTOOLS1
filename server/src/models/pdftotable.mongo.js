// src/models/pdftotable.mongo.js
const mongoose = require("mongoose");

const pdftotableSchema = new mongoose.Schema({
  pdf: String,
  type: String,
});

const Pdftotable = mongoose.model("Pdftotable", pdftotableSchema);

module.exports = Pdftotable;
