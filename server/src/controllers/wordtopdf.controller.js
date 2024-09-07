const wordtopdf = require("../models/wordtopdf.mongo");
const { getLastword } = require("../models/wordtopdf.model");

async function wordtopdfconvert(req, res) {
  try {
    const lastone = await getLastword(); // Await the getLastword() function
    console.log(lastone);
    if (lastone) {
      res
        .status(201)
        .json({ msg: "Word file successfully uploaded", word: lastone });
    } else {
      console.log("File not uploaded");
      res.status(404).json({ msg: "No file uploaded" });
    }
  } catch (err) {
    console.log("Word file upload not successful");
    res.status(500).json({ error: "Word file upload not successful" });
  }
}

async function wordtopdfupload(req, res) {
  console.log(req.file);

  const { filename, originalname } = req.file;
  const title = originalname;
  try {
    const newwordtopdf = new wordtopdf({
      word: filename,
      title: title,
    });
    await newwordtopdf.save();
    console.log("File uploaded successfully");
    res.status(201).json({
      msg: "Word file uploaded successfully",
    });
  } catch (error) {
    console.log("Error uploading file");
    res.status(500).json({
      msg: "Word file upload failed",
    });
  }
}

module.exports = { wordtopdfupload, wordtopdfconvert };
