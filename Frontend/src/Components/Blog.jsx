import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link
// import useFetch from "../hooks/useFetch";
import SkeletonLoader from "./SkeletonLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../common/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  
  // Utility function to format date to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero
    const day = newDate.getDate().toString().padStart(2, '0'); // Adding leading zero
    return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  };
  return (
     (loading)?(<SkeletonLoader/>):
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {
        data && data?.map((blog, index) => (
          <Link
            key={index}
            to={`/blogs/${blog._id}`} // Wrap the whole card in a Link
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {/* Date Badge */}
            <div className="absolute top-0 right-0 bg-purple-700 text-white text-xs px-3 py-1 rounded-bl-lg">
              {formatDate(blog.createdAt)} {/* Use formatted date here */}
            </div>
            {/* Content */}
            <div className="h-36 p-4 flex justify-center items-center">
              <h5 className="text-lg font-bold text-gray-800">{blog.title}</h5>
              {/* <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {blog.description}
              </p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;