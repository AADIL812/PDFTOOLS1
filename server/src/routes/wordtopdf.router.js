const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  wordtopdfupload,
  wordtopdfconvert,
} = require("../controllers/wordtopdf.controller");

const filePath = path.join(__dirname, "../../../files");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const wordtopdfrouter = express.Router();

wordtopdfrouter.post("/", upload.single("file"), wordtopdfupload);
wordtopdfrouter.get("/getlast", wordtopdfconvert);

module.exports = { wordtopdfrouter };
