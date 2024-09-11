const Mergepdf = require("../models/mergepdf.mongo");
const { getLastNFiles } = require("../models/mergepdf.model");

async function mergepdfupload(req, res) {
  const { id } = req.params; // `id` will be used as `n` value

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid number of files requested" });
  }

  try {
    // Get the last `n` files using the `getLastNFiles` function
    const files = await getLastNFiles(parseInt(id, 10));

    // You might want to do something with the files here, like merging them
    // For example:
    const newMergepdf = new Mergepdf({
      title: `Merged Files ${new Date().toISOString()}`,
      pdfs: files.map((file) => file._id), // Assuming you want to use the IDs of the files
    });

    await newMergepdf.save();

    res.status(201).json({
      message: "Merge PDF created successfully",
      data: newMergepdf,
    });
  } catch (error) {
    console.error("Error creating merge PDF:", error);
    res.status(500).json({ message: "Failed to create merge PDF" });
  }
}

module.exports = { mergepdfupload };
