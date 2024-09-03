const wordtopdf = require("../models/wordtopdf.mongo");

async function wordtopdfupload(req, res) {
  console.log(req.file);

  const { filename, origalname } = req.file;
  const title = origalname;
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
  } catch {
    console.log("Error uploading file");
    res.status(500).json({
      msg: "Word file upload failed",
    });
  }
}

module.exports = { wordtopdfupload };
