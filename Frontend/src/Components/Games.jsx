import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SkeletonLoader from "./SkeletonLoader";

const Games = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data, loading } = useFetch(`${API_URL}/api/games`);
  
  if (loading) return <SkeletonLoader />;

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      {/* Heading with better alignment and responsive sizing */}
      <div className="w-full text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Free Games</h1>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {data?.games?.map((card, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <h5 className="text-lg font-semibold text-center">
                {card.gameName}
              </h5>
              <div className="flex gap-1 py-2 justify-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ${index < 4 ? "text-yellow-400" : "text-gray-300"}`}
                    fill={index < 4 ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke={index < 4 ? "currentColor" : "gray"}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                ))}
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Link 
                  to={`/freeGames/${card?._id}`}
                  className="text-purple-500 border border-purple-500 px-4 py-2 rounded-lg w-full text-center hover:bg-purple-500 hover:text-white transition"
                >
                  Details
                </Link>
                <Link
                  to={card?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-green-500 px-4 py-2 rounded-lg w-full text-center hover:bg-green-600 transition"
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