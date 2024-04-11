import {  useEffect } from "react";
import { useFormik } from "formik";
import { useAddBlogMutation, useUpdateBlogMutation } from "../../store/features/blogApi";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
const Form = ({ editData, onClose }) => {
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  // Populate form fields with editData when component mounts
  useEffect(() => {
    if (editData) {
      formik.setValues(editData);
    }
  }, [editData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      author: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (editData) {
        const result = await updateBlog({
          data: values,
          id: editData._id,
        });
        console.log("Update result:", result);
        toast.success(result.data.msg)
        onClose()
      } else {
        const result = await addBlog(values);
        toast.success(result.data.msg)
        console.log("Add result:", result);
        
      }
      resetForm(); 
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.content) {
        errors.content = "Content is required";
      }
      if (!values.author) {
        errors.author = "Author is required";
      }
      return errors;
    },
  });

  return (
    <div className="flex min-h-full justify-center items-center">
      <div className="max-w-lg w-full px-8 py-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">
          {editData ? "Edit Blog Post" : "Create a New Blog Post"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600">{formik.errors.title}</div>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-600">{formik.errors.content}</div>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {formik.touched.author && formik.errors.author && (
              <div className="text-red-600">{formik.errors.author}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            {editData ? "Update Blog Post" : "Create Blog Post"}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  editData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.any,
  }),
  onClose: PropTypes
}

export default Form