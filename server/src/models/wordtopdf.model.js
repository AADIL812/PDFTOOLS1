const wordtopdf = require("./wordtopdf.mongo");

async function getLastword() {
  const lastupload = await wordtopdf.findOne().sort({ _id: -1 });
  return lastupload;
}

module.exports = { getLastword };
