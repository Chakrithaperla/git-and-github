const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed" });

        res.json({ secure_url: result.secure_url });
      }
    );

    result.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;