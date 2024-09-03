const Mergepdf = require("../models/mergepdf.mongo");
const Pdftoword = require("../models/pdftoword.mongo");

async function mergepdfs(req, res) {
  const { title, pdfIds } = req.body; // Expecting an array of ObjectIds and a title in the request body

  if (!title || !Array.isArray(pdfIds) || pdfIds.length === 0) {
    return res.status(400).json({ message: "Title and pdfIds are required" });
  }

  try {
    // Verify that all pdfIds are valid
    const pdfDocuments = await Pdftoword.find({ _id: { $in: pdfIds } });

    if (pdfDocuments.length !== pdfIds.length) {
      return res.status(404).json({ message: "Some PDFs not found" });
    }

    const newMergepdf = new Mergepdf({
      title: title,
      pdfs: pdfIds,
    });

    await newMergepdf.save();

    res
      .status(201)
      .json({ message: "Merge PDF created successfully", data: newMergepdf });
  } catch (error) {
    console.error("Error creating merge PDF:", error);
    res.status(500).json({ message: "Failed to create merge PDF" });
  }
}

module.exports = { mergepdfs };
