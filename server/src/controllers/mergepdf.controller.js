const PdftoWord = require("../models/pdftoword.mongo");
const { getLastNFiles } = require("../models/mergepdf.model");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit"); // Import pdfkit
const { PDFDocument: PdfLibDocument } = require("pdf-lib"); // Import pdf-lib for reading existing PDFs

const mergepdf_merge = async (req, res) => {
  const n = +req.params.n; // Assume `n` is passed as a URL parameter
  console.log(n);

  try {
    const files = await getLastNFiles(n);

    if (files.length === 0) {
      return res.status(404).json({ message: "No files found to merge" });
    }

    // Create a new PDF document
    const mergedPdf = new PDFDocument();

    // Define the output path for the merged PDF document
    const mergedPdfPath = path.join(
      __dirname,
      "../../../downloadfiles",
      `merged-${Date.now()}.pdf`
    );

    // Create a writable stream for the merged PDF
    const out = fs.createWriteStream(mergedPdfPath);
    mergedPdf.pipe(out);

    for (const file of files) {
      const filePath = path.join(__dirname, "../../../files", file.pdf);
      if (fs.existsSync(filePath)) {
        // Load the existing PDF
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PdfLibDocument.load(pdfBytes);

        // Iterate through each page
        const pageCount = pdfDoc.getPageCount();
        for (let i = 0; i < pageCount; i++) {
          const page = pdfDoc.getPage(i);

          // Extract text (optional: implement your own logic for positioning)
          const textContent = await page.getTextContent();

          // Create a new page in the merged PDF
          mergedPdf.addPage();

          // Add text to the new PDF
          mergedPdf
            .fontSize(12)
            .text(textContent.items.map((item) => item.str).join(" "), {
              align: "left",
              continued: true, // Keep adding text
            });

          // Example: Add an image from the original PDF (replace with your logic)
          const imagePath = path.join(
            __dirname,
            "../../../images/sample-image.png"
          ); // Example image
          if (fs.existsSync(imagePath)) {
            mergedPdf.image(imagePath, {
              fit: [100, 100], // Adjust size as needed
              align: "center",
              valign: "center",
            });
          }
        }
      }
    }

    // Finalize the merged PDF
    mergedPdf.end();

    out.on("finish", function () {
      console.log("Merged PDF document created successfully");

      // Respond with the path of the merged PDF
      res.status(200).json({ mergedPdfPath });
    });

    out.on("error", function (err) {
      console.error("Error writing the merged PDF document:", err);
      res.status(500).json({ message: "Failed to write the merged PDF" });
    });
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ message: "Failed to merge PDFs" });
  }
};

const mergepdfupload = async (req, res) => {
  const { filename, originalname } = req.file;
  const title = originalname;
  try {
    const newPdf = new PdftoWord({
      pdf: filename,
      title: title,
    });
    await newPdf.save();
    res.status(201).json({
      message: "PDF uploaded successfully",
      data: newPdf,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ message: "Failed to upload PDF" });
  }
};

module.exports = { mergepdfupload, mergepdf_merge };
