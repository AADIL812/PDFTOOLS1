const Mergepdf = require("./mergepdf.mongo");

async function getLastNFiles(n) {
  try {
    // Find the last `n` documents, sorted by creation date in descending order
    const files = await Mergepdf.find()
      .sort({ createdAt: -1 }) // Ensure there's a createdAt field in your schema or adjust accordingly
      .limit(n)
      .exec();
    return files;
  } catch (error) {
    console.error("Error fetching last N files:", error);
    throw error;
  }
}
module.exports = { getLastNFiles };
