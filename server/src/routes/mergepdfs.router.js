// src/routes/mergepdf.router.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { mergepdfupload } = require("../controllers/mergepdf.controller");

const uploadPath = path.join(__dirname, "../../../files");

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const mergepdfRouter = express.Router();

// Route to handle merging of PDFs, accepts multiple files
mergepdfRouter.post("/n", upload.single("file"), mergepdfupload);

module.exports = { mergepdfRouter };
