const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:fileId", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", () => {
      return res.status(404).json({ message: "File not found" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    res.status(400).json({ message: "Invalid file ID" });
  }
});

module.exports = router;
