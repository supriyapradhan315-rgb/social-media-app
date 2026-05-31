const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: String,
  text: String,
  image: String,
  likes: [],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);