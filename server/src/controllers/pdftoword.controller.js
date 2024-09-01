const { upload } = require("../models/pdftoword.mongo");

const uploadpdftoword = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err); // Log errors
      return res.status(500).send("File upload failed");
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.send("File uploaded successfully");
  });
};

module.exports = { uploadpdftoword };
