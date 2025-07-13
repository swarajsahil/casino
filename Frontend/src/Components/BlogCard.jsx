import React from 'react';
import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

const BlogCard = ({data,loading}) => {

  const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero
    const day = newDate.getDate().toString().padStart(2, '0'); // Adding leading zero
    return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  };

  return (
    (loading)?(<SkeletonLoader/>):
    <div className="bg-gray-100 py-8 px-4 sm:px-4 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#70084E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-3">
              Latest Blog
            </h1>
          </div>
        </div>
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((blog, index) => (
            <Link
              key={blog._id || index}
              to={`/blogs/${blog._id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#70084E] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                  {formatDate(blog.createdAt)}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#70084E] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {blog.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <div className="text-[#70084E] text-sm font-medium flex items-center">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;