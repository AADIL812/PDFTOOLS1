const Pdftotable = require("../models/pdftotable.mongo");
const { lastPdfUpload } = require("../models/pdftotable.model");
const PDFdoc = require("pdfkit");
const path = require("path");
const pdf = require("pdf-parse");
const fs = require("fs");

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
async function pdftotableConvert(req, res) {
  const lastOne = await lastPdfUpload();
  const pdfpath = path.join(__dirname, "..", "..", "..", "files", lastOne.pdf);
  const dataBuffer = fs.readFileSync(pdfpath);
  const pdfData = await pdf(dataBuffer);
  const pdfText = pdfData.text;

  // Split the text into rows and filter out empty rows
  const rows = pdfText
    .split("\n")
    .map((row) => row.split("|").map((cell) => cell.trim()))
    .filter((row) => row.some((cell) => cell)); // Keep only non-empty rows

  // Remove empty columns
  const cleanedRows = rows.map((row) => row.filter((cell) => cell));

  // Define output path and create PDF document
  const downloadfiles = "structured_pdfs"; // Directory name
  const outputpath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    downloadfiles,
    `${lastOne.type}.pdf`
  );

  if (!fs.existsSync(path.dirname(outputpath))) {
    fs.mkdirSync(path.dirname(outputpath), { recursive: true });
  }

  const newPDF = new PDFdoc();
  const writeStream = fs.createWriteStream(outputpath);
  newPDF.pipe(writeStream);

  // Set up initial positions for the table
  // Set up initial positions for the table
  const startX = 50; // Starting X position
  const startY = 50; // Starting Y position
  const cellWidth = 100; // Width of each cell
  const cellHeight = 20; // Height of each cell
  const columnSpacing = 10; // Additional spacing between columns

  // Draw the table with clear borders
  cleanedRows.forEach((row, rowIndex) => {
    const y = startY + rowIndex * (cellHeight + 5); // Add some vertical spacing

    // Draw top border for the row
    if (rowIndex === 0) {
      newPDF
        .moveTo(startX, y)
        .lineTo(startX + row.length * (cellWidth + columnSpacing), y)
        .stroke();
    }

    // Draw the cells and vertical lines
    row.forEach((cell, colIndex) => {
      const x = startX + colIndex * (cellWidth + columnSpacing); // Add spacing between columns

      // Draw the cell rectangle
      newPDF.rect(x, y, cellWidth, cellHeight).stroke();

      // Write the cell text
      newPDF.text(cell, x + 5, y + 5, { width: cellWidth - 10 }); // Add some padding and width constraint
    });

    // Draw bottom border for the row
    newPDF
      .moveTo(startX, y + cellHeight)
      .lineTo(startX + row.length * (cellWidth + columnSpacing), y + cellHeight)
      .stroke();

    // Draw vertical lines between cells
    for (let colIndex = 0; colIndex < row.length - 1; colIndex++) {
      const x = startX + colIndex * (cellWidth + columnSpacing) + cellWidth; // Position for vertical line
      newPDF
        .moveTo(x, y)
        .lineTo(x, y + cellHeight)
        .stroke(); // Draw vertical line
    }
  });

  newPDF.end();

  writeStream.on("finish", () => {
    console.log("PDF file created");
    res.sendFile(outputpath, (err) => {
      if (err) {
        console.log("Error in sending file");
        res.status(500).json({ msg: "Error in sending PDF file" });
      } else {
        console.log("PDF file sent successfully");
      }
    });
  });
}

module.exports = { pdftotableupload, pdftotableConvert };
