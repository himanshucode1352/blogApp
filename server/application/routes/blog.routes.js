const express=require("express");
const router = express.Router();
const { createBlog, updateBlog ,getAllBlogs,blogById,deleteBlog} = require('../controller/blog.controller');
const { validateCreateBlog, validateUpdateBlog } = require('../validations/blog.validation');


router.post('/create', validateCreateBlog,createBlog);
router.get('/all', getAllBlogs);
router.get('/detail/:id', blogById);
router.delete('/delete/:id', deleteBlog);
router.put('/update/:id', validateUpdateBlog, updateBlog);

module.exports=router;