const pdftoword = require("../models/pdftoword.mongo");
async function pdftowordupload(req, res) {
  console.log(req.file);
  const { filename, originalname } = req.file;
  const title = originalname;
  try {
    const newpdftoword = new pdftoword({
      pdf: filename,
      title: title,
    });
    await newpdftoword.save();

    res
      .status(201)
      .json({ message: "PDF uploaded successfully", data: newpdftoword });
  } catch {
    console.log("Error uploading file");
    res.status(500).json({ message: "Failed to upload pdf" });
  }
}

module.exports = { pdftowordupload };
