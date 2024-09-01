const multer = require("multer");
const express = require("express");
const path = require("path");

const mongoURI =
  "mongodb+srv://pdftools:Aadil112233@pdftoolscluster.bzxbsfs.mongodb.net/";

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.error("Crypto error:", err);
          return reject(err);
        }
        console.log("File received:", file);
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads", // Ensure this matches your bucket name
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = { upload };
