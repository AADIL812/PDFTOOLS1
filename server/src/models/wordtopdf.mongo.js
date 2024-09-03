const mongoose = require("mongoose");

const wordtopdfSchema = mongoose.Schema({
  word: String,
  title: String,
});

const wordtopdf = mongoose.model("wordtopdf", wordtopdfSchema);

module.exports = wordtopdf;
