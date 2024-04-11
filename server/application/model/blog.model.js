const mongoose = require('mongoose');

// Define Post schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

// Create Post model
const Post = mongoose.model('Blog', blogSchema);

// Export the Post model
module.exports = Post;
