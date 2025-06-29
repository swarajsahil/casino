import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const GameCarousel = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data, loading } = useFetch(`${API_URL}/api/games`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalGames = data?.games?.length || 0;
  const itemsPerView = 5; // Show 5 cards at a time

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, totalGames - itemsPerView))
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= Math.max(0, totalGames - itemsPerView);

  return (
    <div className="w-full bg-white py-10 px-6">
      {/* Heading and Top Controls (Desktop) */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
          Play the latest free games
        </h2>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="text-black border border-black px-3 py-2 hover:bg-gray-200 disabled:opacity-50"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className="text-black border border-black px-3 py-2 hover:bg-gray-200 disabled:opacity-50"
          >
            ❯
          </button>

          <Link to="/freeGames">
            <button className="text-black border border-black px-4 py-2 hover:bg-gray-200 transition">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${totalGames * (100 / itemsPerView)}%`,
              }}
            >
              {data?.games?.map((game, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-60 bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <img
                      src={game?.image}
                      alt={game?.gameName}
                      className="w-full h-36 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                    <h6 className="text-lg font-bold text-center">{game?.gameName}</h6>
                    <div className="flex flex-col items-center mt-4">
                      <Link
                        to={`/freeGames/${game?._id}`}
                        className="text-purple-500 border border-purple-500 px-4 py-2 rounded-lg mb-2 hover:bg-purple-500 hover:text-white transition"
                      >
                        Details
                      </Link>
                      <a
                        href={game?.gameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Controls (Mobile & Tablet) */}
          <div className="flex lg:hidden justify-between items-center mt-6">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className="text-black border border-black px-3 py-2 hover:bg-gray-200 disabled:opacity-50"
              >
                ❮
              </button>
              <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="text-black border border-black px-3 py-2 hover:bg-gray-200 disabled:opacity-50"
              >
                ❯
              </button>
            </div>
            <Link to="/freeGames">
              <button className="text-black border border-black px-4 py-2 hover:bg-gray-200 transition">
                View All
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default GameCarousel;