import { useGetBlogByIdQuery } from "../../store/features/blogApi";
import { useParams } from 'react-router-dom'; // Import useParams hook
import moment from 'moment';

const BlogDetail = () => {
    const { id } = useParams(); // Get the ID from the params
    const { data,  } = useGetBlogByIdQuery(id);


    console.log(data,'hyyyyyyyyyyyyyyyyyyy')
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
    
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <p className="text-gray-600 text-sm mb-2">Published on {moment(data?.date).format('DD MMM YYYY')}</p>
        <p className="text-gray-800 leading-relaxed mb-8">{data?.content}</p>
        <p className="text-gray-700">Author: {data?.author}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
