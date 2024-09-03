// routes/mergepdf.route.js
const express = require("express");
const { mergepdfs } = require("../controllers/mergepdf.controller");

const mergepdfRouter = express.Router();

// Route to handle merging of PDFs
mergepdfRouter.post("/", mergepdfs);

module.exports = { mergepdfRouter };
