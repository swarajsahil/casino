import React from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

const Games = ({ data, loading }) => {
  if (loading) return <SkeletonLoader />;

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Heading */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Free Games
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Discover amazing free-to-play games
        </p>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data?.map((card, index) => (
          <div
            key={index}
            className="group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white relative"
          >
            {/* Game Image */}
            <div className="relative pt-[70%] overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Rating Badge */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span>4.0</span>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm line-clamp-2">
                  {card.description || "Exciting game with amazing features"}
                </span>
              </div>
            </div>

            {/* Game Content */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 flex-1">
                  {card.gameName}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                  FREE
                </span>
              </div>
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {card.tags?.slice(0, 3).map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                )) || (
                  <>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Adventure</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Action</span>
                  </>
                )}
              </div>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                      fill={i < 4 ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-xs">(24 reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <Link
                  to={`/freeGames/${card?._id}`}
                  className="block text-center px-4 py-2.5 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 hover:shadow-md"
                >
                  View Details
                </Link>
                <Link
                  to={card?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  Play Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Ribbon for Featured Games */}
            {index < 2 && (
              <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 transform rotate-45 translate-x-8 -translate-y-1 w-32 text-center">
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <button className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200 shadow-md hover:shadow-lg">
          Load More Games
        </button>
      </div>
    </div>
  );
};

export default Games;