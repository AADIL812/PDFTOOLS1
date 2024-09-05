// src/controllers/pdftotable.controller.js
const Pdftotable = require("../models/pdftotable.mongo");

async function pdftotableupload(req, res) {
  const { filename, originalname } = req.file;
  const title = originalname;
  try {
    const newPdftotable = new Pdftotable({
      pdf: filename,
      type: title, // Assuming 'type' should be 'title' based on the schema
    });
    await newPdftotable.save();
    res.status(201).json({ msg: "Pdf file uploaded successfully" });
  } catch (err) {
    console.error("Error uploading PDF file:", err);
    res.status(500).json({ msg: "Pdf file upload failed" });
  }
}

module.exports = { pdftotableupload };
