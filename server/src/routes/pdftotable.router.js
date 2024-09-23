// src/routes/pdftotable.router.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  pdftotableupload,
  pdftotableConvert,
} = require("../controllers/pdftotable.controller");

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
const pdftotableRouter = express.Router();

pdftotableRouter.post("/", upload.single("file"), pdftotableupload);

pdftotableRouter.get("/getlast", pdftotableConvert);

module.exports = { pdftotableRouter };
