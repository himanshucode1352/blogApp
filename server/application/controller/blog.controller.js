const Blog = require('../model/blog.model')

exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.createBlog = async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });
    try {
      const newBlog = await blog.save();
      res.status(201).json({msg: 'Blog saved successfully!'});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };


//   / Get a blog by ID
exports.blogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a blog by ID
exports.updateBlog =  async (req, res) => {
  const { title, content, author } = req.body;
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'blog not found' });
    }
    blog.title = title;
    blog.content = content;
    blog.author = author;
    await blog.save();
    return res.status(200).json({ msg: 'blog updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a blog by ID
exports.deleteBlog =  async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'blog not found' });
    }
    await blog.deleteOne();
    res.json({ msg: 'blog removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};