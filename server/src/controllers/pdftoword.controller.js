const pdftoword = require("../models/pdftoword.mongo");
const pdfParse = require("pdf-parse");
const { lastPdfUpload } = require("../models/pdftoword.model");
const path = require("path");
const fs = require("fs");
const officegen = require("officegen");

async function pdftowordconvert(req, res) {
  console.log("pdftowordconvert function called");
  const lastpdf = await lastPdfUpload();
  const pdfPath = path.join(__dirname, "../../../files", lastpdf.pdf);

  try {
    // Read the uploaded PDF file
    let dataBuffer = fs.readFileSync(pdfPath);

    // Extract text from the PDF file
    const data = await pdfParse(dataBuffer);

    // Create a new Word document
    const docx = officegen("docx");

    // Error handling for officegen
    docx.on("error", function (err) {
      console.error("Error with officegen:", err);
      res.status(500).send("Error with officegen: " + err.message);
    });

    // Add a new paragraph with the extracted text
    docx.createP().addText(data.text);

    // Define the output path for the Word document
    const wordDir = path.join(__dirname, "../../../downloadfiles");
    const wordPath = path.join(wordDir, `${lastpdf.title}.docx`);

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(wordDir)) {
      fs.mkdirSync(wordDir, { recursive: true });
    }

    // Create a writable stream to save the Word document
    const out = fs.createWriteStream(wordPath);

    // Generate the Word document and save it to a file
    docx.generate(out);

    out.on("finish", function () {
      console.log("Word document created successfully");

      // Send the Word document file as a download
      res.download(wordPath, `${lastpdf.title}.docx`, (err) => {
        if (err) {
          console.error("Error sending the Word document:", err);
          res.status(500).send("Error sending the Word document.");
        }
      });
    });

    out.on("error", function (err) {
      console.error("Error writing the Word document:", err);
      res.status(500).send("Error writing the Word document: " + err.message);
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).send("Error processing PDF: " + error.message);
  }
}

async function pdftowordupload(req, res) {
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
    console.log(newpdftoword);
  } catch (error) {
    console.log("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload pdf" });
  }
}

module.exports = { pdftowordupload, pdftowordconvert };
