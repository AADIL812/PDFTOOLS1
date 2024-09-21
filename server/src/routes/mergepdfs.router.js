const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  mergepdfupload,
  mergepdf_merge,
} = require("../controllers/mergepdf.controller");

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
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const mergepdfRouter = express.Router();

mergepdfRouter.post("/", upload.single("file"), mergepdfupload); // Ensure the field name "file" matches
mergepdfRouter.get("/:n", mergepdf_merge);

module.exports = { mergepdfRouter };
