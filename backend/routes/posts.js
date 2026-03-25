const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;

    const post = await Post.create({
      title,
      content,
      coverImage,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;