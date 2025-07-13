import React from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

const Games = ({ data, loading }) => {
  if (loading) return <SkeletonLoader />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Heading */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Free Games
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Discover amazing free-to-play games
        </p>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((card, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
          >
            {/* Game Image */}
            <div className="relative pt-[70%] overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Rating Badge */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center">
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
            </div>

            {/* Game Content */}
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {card.gameName}
              </h3>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
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
                <span className="ml-2 text-gray-600 text-sm">(24)</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <Link
                  to={`/freeGames/${card?._id}`}
                  className="block text-center px-4 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-200"
                >
                  View Details
                </Link>
                <Link
                  to={card?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Play Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;