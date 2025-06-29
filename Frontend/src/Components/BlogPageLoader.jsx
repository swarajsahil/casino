import React from "react";

const BlogPageLoader = () => {
  return (
    // <div className="w-full h-full mx-auto rounded-lg p-6 bg-white shadow-md">
    //   {/* <div className="flex gap-3 flex-wrap justify-center">
    //     </div> */}
    //       <div className="flex flex-col gap-4  animate-pulse py-2">
    //         <div className="w-64 h-10 bg-gray-300 rounded"></div>
    //         <div className="w-32 h-4 bg-gray-300 rounded"></div>
    //         <div className="w-48 h-6 bg-gray-300 rounded"></div>
    //         <div className="w-64 h-36 bg-gray-300 rounded"></div>
    //         <div className="w-20 h-4 bg-gray-300 rounded"></div>
    //         <div className="w-48 h-4 bg-gray-300 rounded"></div>
    //         <div className="w-48 h-4 bg-gray-300 rounded"></div>
    //         <div className="w-48 h-4 bg-gray-300 rounded"></div>
    //       </div>
    // </div>

<div className="bg-gray-100 p-6 min-h-screen">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
    {/* Main Blog Skeleton */}
    <div className="lg:w-2/3 space-y-6">
      {/* Blog Title */}
      <div className="h-8 bg-gray-300 rounded w-2/3 animate-pulse"></div>
      {/* Author and Date */}
      <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      {/* Blog Description */}
      <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
      {/* Blog Image */}
      <div className="h-72 bg-gray-300 rounded-lg animate-pulse"></div>
      {/* Key Takeaways */}
      <div className="space-y-3">
        <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        ))}
      </div>
      {/* Blog Content */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
      ))}
    </div>

    {/* Right Sidebar Skeleton */}
    <div className="flex flex-col gap-6 lg:w-1/3">
      {/* Latest Blog */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex bg-gray-300 rounded-lg h-28 w-full animate-pulse"
          ></div>
        ))}
      </div>
      {/* Casino Promos */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex gap-4 items-center bg-gray-300 rounded-lg h-20 w-full animate-pulse"
          >
            <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              <div className="h-4 bg-gray-400 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
    
  );
};

export default BlogPageLoader;