const express = require("express");
const api = express.Router();
const { pdftowordRouter } = require("./pdftoword.router");

api.use("/pdftoword", pdftowordRouter);

module.exports = { api };
