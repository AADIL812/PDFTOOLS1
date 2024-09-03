const mongoose = require("mongoose");
const Pdftoword = require("./pdftoword.mongo"); // Adjust the path as necessary

const mergepdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pdftoword" }],
});

const Mergepdf = mongoose.model("Mergepdf", mergepdfSchema);

module.exports = Mergepdf;
