const express = require("express");
const app = express();

app.use(express.json());

app.post("/climb", (req, res) => {
  res.send(req.body.message);
});

app.use("/", (req, res) => {
  res.send("Hi. Aadil here");
});

module.exports = app;
