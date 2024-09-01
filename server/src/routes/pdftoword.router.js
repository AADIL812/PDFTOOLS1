const express = require("express");
const { uploadpdftoword } = require("../controllers/pdftoword.controller");

const pdftowordRouter = express.Router();

pdftowordRouter.post("/", uploadpdftoword);

module.exports = {
  pdftowordRouter,
};
