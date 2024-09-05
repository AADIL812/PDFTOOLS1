const pdftoword = require("../models/pdftoword.mongo");
const { lastPdfUpload } = require("../models/pdftoword.model");
const path = require("path");
const express = require("express");
const fs = require("fs");
async function pdftowordconvert(req, res) {
  console.log("pdftowordconvert function called");
  try {
    const lastUpload = await lastPdfUpload(); // Retrieve the latest upload
    console.log(lastUpload);
    if (lastUpload) {
      // //const filePath = path.join(__dirname, "../../../files", lastUpload.pdf);
      // if (fs.existsSync(filePath)) {
      //   res.download(filePath, "converted-file.docx", (err) => {
      //     if (err) {
      //       console.error("Error sending file:", err);
      //       res.status(500).json({ msg: "Error sending file" });
      //     }
      //   });
      // } else {
      //   res.status(404).json({ msg: "File not found" });
      // }
      res.status(201).json(lastUpload.pdf);
      console.log(lastUpload);
    } else {
      res.status(404).json({ msg: "No uploads found" });
    }
  } catch (err) {
    console.error("Error in retrieving data:", err);
    res.status(500).json({ msg: "Error in retrieving data" });
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
