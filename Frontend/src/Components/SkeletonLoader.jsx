import React from "react";

const SkeletonLoader = ({ cardCount = 12 }) => {
  return (
    <div className="w-full h-full mx-auto rounded-lg p-6 bg-white shadow-md">
      <div className="flex gap-3 flex-wrap justify-center">
        {[...Array(cardCount)].map((_, index) => (
          <div
            key={index}
            className="w-72 h-52 gap-2 flex flex-col items-center border animate-pulse py-2"
          >
            <div className="w-64 h-36 bg-gray-300 rounded"></div>
            <div className="w-40 h-8 bg-gray-300 rounded"></div>
            <div className="w-64 h-4 bg-gray-300 rounded"></div>
            <div className="w-64 h-4 bg-gray-300 rounded"></div>
            <div className="w-64 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;