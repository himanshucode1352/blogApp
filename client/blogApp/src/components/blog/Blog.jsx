import { useState } from 'react';
import moment from 'moment';
import { useDeleteBlogMutation, useGetBlogsQuery } from '../../store/features/blogApi';
import Form from '../form/form';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [deleteBlog] = useDeleteBlogMutation();
  const { data, refetch } = useGetBlogsQuery();
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    setEditData(data); // Set the ID of the blog to edit
  };


  const handleDelete = async (id) => {
    setDeleteId(id); // Set the ID of the blog to delete
  };

  const handleConfirmDelete = async () => {
    await deleteBlog(deleteId); // Delete the blog with the specified ID
    refetch(); // Refetch the blogs data after deletion
    setDeleteId(null); // Reset the delete ID after deletion
  };

  const handleCloseDeleteModal = () => {
    setDeleteId(null); // Reset the delete ID if the user cancels the deletion
  };

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((x, index) => (
            <article key={index} className="max-w-lg border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <time dateTime={moment(x?.date).toISOString()} className="text-sm text-gray-500">{moment(x?.date).format('DD MMM, YYYY hh:mm:ss A')}</time>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-gray-900 truncate">{x.title}</h3>
                <p className="mt-3 text-base text-gray-600 line-clamp-3">{x.content}</p>
                <p className="mt-3 text-base font-semibold text-gray-900">Author: {x.author}</p>
              </div>
              <div className="px-6 pb-6 pt-4">
              <div className="flex justify-center mt-4">
  <Link className="text-indigo-600 hover:text-indigo-800 mr-2" to={`/blog/${x._id}`}>View</Link>
  <button className="text-green-600 hover:text-green-800 mr-2" onClick={() => handleEdit(x)}>Edit</button>
  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(x._id)}>Delete</button>
</div>

              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Confirmation modal for delete action */}
      {deleteId && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end">
              <button className="text-gray-600 mr-4" onClick={handleCloseDeleteModal}>Cancel</button>
              <button className="text-red-600 hover:text-red-800" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form modal for editing a blog */}
      {editData && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <Form editData={editData} onClose={() =>{ setEditData(null); refetch()}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
