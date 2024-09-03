// routes/api.js
const express = require("express");
const { pdftowordRouter } = require("./pdftoword.router");
const { wordtopdfrouter } = require("./wordtopdf.router");
const { mergepdfRouter } = require("./mergepdfs.router");
const router = express.Router();

router.use("/pdftoword", pdftowordRouter);
router.use("/wordtopdf", wordtopdfrouter);
router.use("/mergepdf", mergepdfRouter);
module.exports = router;
