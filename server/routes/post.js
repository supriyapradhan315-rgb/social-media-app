const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const saved = await newPost.save();
  res.json(saved);
});

// LIKE POST
router.put("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

module.exports = router;