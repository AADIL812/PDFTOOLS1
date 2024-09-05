const PdftoWord = require("./pdftoword.mongo");

const lastPdfUpload = async () => {
  const lastOne = await PdftoWord.findOne().sort({ _id: -1 });
  console.log(lastOne._id);
  return lastOne;
};
module.exports = { lastPdfUpload };
