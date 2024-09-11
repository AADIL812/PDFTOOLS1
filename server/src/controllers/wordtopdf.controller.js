const mammoth = require("mammoth");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const wordtopdf = require("../models/wordtopdf.mongo");
const { getLastword } = require("../models/wordtopdf.model");

async function wordtopdfconvert(req, res) {
  try {
    const lastone = await getLastword();
    if (lastone) {
      const wordFilePath = path.join(__dirname, "../../../files", lastone.word);

      // Extract text and images from the Word document
      const { value: extractedHtml } = await mammoth.convertToHtml({
        path: wordFilePath,
        convertImage: mammoth.images.inline(function (element) {
          return element.read("base64").then(function (imageBuffer) {
            return {
              src: "data:" + element.contentType + ";base64," + imageBuffer,
            };
          });
        }),
      });

      // Remove HTML tags, handle images, and clean up text
      const imageTags = [];
      const extractedText = extractedHtml
        .replace(/<img[^>]+src="([^">]+)"/g, (_, src) => {
          imageTags.push(src); // Store image sources in an array
          return "[IMAGE]"; // Replace image tags with a placeholder
        })
        .replace(/<\/?[^>]+(>|$)/g, "\n") // Remove all other HTML tags
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/\n\s*\n/g, "\n\n"); // Remove multiple newlines

      // Create a new PDF using pdfkit
      const pdfFilePath = path.join(
        __dirname,
        "../../../downloadfiles",
        `${lastone.title}.pdf`
      );
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfFilePath);
      doc.pipe(writeStream);

      // Split text by the [IMAGE] placeholder and insert images at the correct places
      const textParts = extractedText.split("[IMAGE]");
      textParts.forEach((textPart, index) => {
        doc.fontSize(12).text(textPart, {
          align: "left",
          width: 500,
          lineGap: 6,
        });

        // Ensure enough space after the text before adding an image
        if (index < imageTags.length) {
          const base64Data = imageTags[index].split(",")[1];
          const imgBuffer = Buffer.from(base64Data, "base64");

          // Add image to the PDF
          const imageSize = { width: 500, height: 500 };
          doc.image(imgBuffer, {
            fit: [imageSize.width, imageSize.height],
            align: "center",
          });

          doc.moveDown(); // Move down after placing the image
        }
      });

      doc.end();

      // Wait for the PDF to finish writing to disk before responding
      writeStream.on("finish", () => {
        console.log("PDF file created successfully");

        // Respond with the PDF file for download
        res.sendFile(pdfFilePath, (err) => {
          if (err) {
            console.error("Error in sending PDF file:", err);
            res.status(500).send("Error in sending PDF file");
          } else {
            console.log("PDF file sent successfully");
          }
        });
      });

      writeStream.on("error", (err) => {
        console.error("Error writing PDF file:", err);
        res.status(500).json({ error: "PDF creation failed" });
      });
    } else {
      console.log("No file uploaded");
      res.status(404).json({ msg: "No file uploaded" });
    }
  } catch (err) {
    console.log("Word file upload and conversion not successful");
    res.status(500).json({ error: "Word file upload and conversion not successful" });
  }
}

async function wordtopdfupload(req, res) {
  console.log(req.file);

  const { filename, originalname } = req.file;
  const title = originalname;
  try {
    const newwordtopdf = new wordtopdf({
      word: filename,
      title: title,
    });
    await newwordtopdf.save();
    console.log("File uploaded successfully");
    res.status(201).json({
      msg: "Word file uploaded successfully",
    });
  } catch (error) {
    console.log("Error uploading file");
    res.status(500).json({
      msg: "Word file upload failed",
    });
  }
}

module.exports = { wordtopdfupload, wordtopdfconvert };

