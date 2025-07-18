import React, { useState } from "react";
import { Link } from "react-router-dom";
import LiveCasinoLoader from "./LiveCasinoLoader";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const LiveCasino = ({ data, loading }) => {
  const stats = [{
    Founded: 2018,
    licenses: 2,
    games: 13,
    payments: 16,
    bonuses: 12,
    countries: 183,
    software: 51,
    currencies: 57,
    languages: 34
  }];

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCardExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else {
            return (
              <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
        })}
      </div>
    );
  };

  if (loading) return <LiveCasinoLoader />;

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-center mb-3 md:text-3xl md:text-left md:ml-4 md:w-3/4">
        Live Casino
      </h1>

      <div className="space-y-4 md:flex md:flex-col md:items-center md:w-full">
        {data?.map((casino, index) => (
          <div
            key={casino?._id || index}
            className="bg-pink-800 rounded-lg overflow-hidden md:w-5/6 md:bg-white md:border-2 md:border-gray-100"
          >
            {/* Main card content */}
            <div className="flex md:flex-col md:h-auto">
              {/* Mobile/Tablet view */}
              <div className="w-1/2 bg-pink-900 p-3 flex flex-col items-center justify-center gap-2 md:hidden">
                <div className="bg-white rounded p-1 border-2 border-yellow-400 w-32 h-20 flex items-center justify-center">
                  <img
                    src={casino?.image}
                    alt={casino?.name}
                    className="object-contain h-full w-full"
                  />
                </div>

                <div className="hidden md:flex items-center mt-2">
                  <StarRating rating={casino?.rating || 4.5} />
                  <span className="ml-1 text-white text-xs font-bold">
                    {casino?.rating || 4.5}/5
                  </span>
                </div>

                <button
                  onClick={() => toggleCardExpand(casino?._id || index)}
                  className="w-32 bg-white/10 text-gray-400 text-xs px-4 py-2 flex items-center justify-between rounded-lg"
                >
                  <span>
                    {expandedCard === (casino?._id || index)
                      ? "Show less"
                      : "Show more"}
                  </span>
                  {expandedCard === (casino?._id || index) ? (
                    <CiCircleMinus className="text-lg" />
                  ) : (
                    <CiCirclePlus className="text-lg" />
                  )}
                </button>
              </div>

              {/* Desktop view - upper section */}
              <div className="hidden md:flex md:flex-row md:w-full md:h-48">
                {/* Image and Info */}
                <div className="w-1/3 h-full bg-white flex flex-row justify-around items-center gap-2">
                  <div className="w-1/2 h-28 flex justify-center">
                    <img
                      className="w-28 h-28 pl-1 object-cover"
                      src={casino?.image}
                      alt={casino?.name}
                    />
                  </div>
                  <div className="w-2/3 h-28 flex flex-col gap-2 items-start">
                    <p className="text-xl font-bold">{casino?.name}</p>
                    <div>
                      <img
                        src="https://livecasinorank.com/_static/img/checkmark.svg"
                        className="w-6 h-6 checkmark absolute mt-0 ml-4"
                        alt="Checkmark"
                        loading="lazy"
                      />
                      <img
                        className="w-6 h-6 object-cover rounded-full"
                        src="https://livecasinorank.com/assets-global/flags/in.svg"
                        alt="Country Flag"
                      />
                    </div>
                    <button
                      onClick={() => toggleCardExpand(casino?._id || index)}
                      className="w-32 h-10 bg-gray-100 text-xs text-gray-400 rounded-md flex items-center justify-between p-1 mt-2"
                    >
                      <span>
                        {expandedCard === (casino?._id || index)
                          ? "Show less"
                          : "Show more"}
                      </span>
                      {expandedCard === (casino?._id || index) ? (
                        <CiCircleMinus className="text-lg" />
                      ) : (
                        <CiCirclePlus className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bonus */}
                <div className="flex flex-col w-1/3 justify-center items-center pl-4 text-left">
                  <p className="text-lg text-amber-900 font-semibold">
                    Bonus: ₹{casino?.bonus}
                  </p>
                  <p className="text-sm text-amber-900">
                    + {casino?.freeSpins} Free Spins
                  </p>
                  <div className="text-xs">
                    <p>18+ | Play Responsibly | gamblingtherapy.org |</p>
                    <p> T&Cs Apply</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex w-1/3 justify-end pr-2 items-center">
                  <div className="flex flex-col gap-4 pb-2">
                    <Link to={`${casino?.casinoLink}`} target="1">
                      <button className="w-44 h-12 bg-green-400 rounded-lg hover:text-white">
                        Play Now
                      </button>
                    </Link>
                    <Link to={`/liveCasino/${casino?._id}`}>
                      <button className="w-44 h-12 bg-gray-300 rounded-lg hover:text-white">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side with content - mobile */}
              <div className="w-1/2 p-3 flex flex-col md:hidden">
                <div className="mb-1">
                  <div className="text-yellow-400 text-xs font-semibold">
                    Bonus offer
                  </div>
                  <div className="text-white text-lg font-bold">
                    ₹{casino?.bonus} + {casino?.freeSpins} Free Spins
                  </div>
                </div>

                <Link
                  to={`${casino?.casinoLink}`}
                  target="1"
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded uppercase font-bold text-xs transition duration-100 mb-2 mt-auto"
                >
                  Play Now
                </Link>

                <Link
                  to={`/liveCasino/${casino?._id}`}
                  className="text-white font-bold text-xs text-center bg-emerald-500 p-2 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Expanded content - mobile */}
            <div
              className={`bg-white ${
                expandedCard === (casino?._id || index) ? "block" : "hidden"
              } md:hidden`}
            >
              <div className="p-3 space-y-3">
                {/* About section */}
                <div>
                  <h3 className="font-bold text-sm mb-1">About</h3>
                  <p className="text-xs">
                    To ensure the ultimate Live Casino experience, it's crucial to
                    choose a provider with a proven track record of excellence.{" "}
                    {casino?.name} is a name you can rely on with a high rating
                    and a long-standing reputation in the industry.
                  </p>
                </div>

                {/* Pros section */}
                <div>
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 text-green-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h3 className="font-bold text-sm">Pros</h3>
                  </div>
                  <ul className="space-y-1">
                    {casino?.pros?.map((pro, i) => (
                      <li key={i} className="flex items-start text-xs">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-1 mr-1"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats section */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(stats[0]).map(([key, value], i) => (
                    <div key={i} className="bg-gray-100 p-2 rounded">
                      <div className="text-xs text-gray-500">{key}</div>
                      <div className="font-bold text-xs">{value}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to={`${casino?.casinoLink}`}
                  target="1"
                  className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded uppercase font-bold text-xs transition duration-100 block"
                >
                  Play Now
                </Link>
              </div>

              {/* Terms */}
              <div className="text-xxs text-gray-500 p-2 text-center border-t border-gray-200">
                <p>18+ | Play Responsibly | gamblingtherapy.org | T&amp;Cs Apply</p>
              </div>
            </div>

            {/* Expanded content - desktop */}
            {expandedCard === (casino?._id || index) && (
              <div className="hidden md:block bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* About Section */}
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">About</h3>
                    <p className="text-sm text-gray-600">
                      To ensure the ultimate Live Casino experience, it's crucial to
                      choose a provider with a proven track record of excellence.{" "}
                      {casino?.name} is a name you can rely on with a high rating
                      and a long-standing reputation in the industry. In this review,
                      we will dive into the top features of this popular provider to
                      give you an in-depth look at what sets it apart from the
                      competition.
                    </p>
                  </div>

                  {/* Pros Section */}
                  <div className="md:w-1/3">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="text-lg font-bold text-gray-800">Pros</h3>
                    </div>
                    <ul className="space-y-2">
                      {casino?.pros?.map((pro, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats Section */}
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      Casino Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(stats[0]).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-white p-3 w-auto rounded-lg shadow-sm border border-gray-100"
                        >
                          <div className="lg:text-xs md:text-[8px] font-medium text-gray-500 uppercase tracking-wider">
                            {key}
                          </div>
                          <div className="text-lg font-bold text-gray-800 mt-1">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCasino;
{/* <CasinoDetail data={dynamicData} />
<Faq data={Casinofaqs} /> */}

{/* Stats Section */}
              {/* <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
                <div className="flex flex-col py-2 border-2 border-gray-50 px-4 rounded-lg bg-gray-100 items-center justify-center w-full">
                  <h5 className="text-lg font-bold mb-2">Casino Stats</h5>
                  <ul className="grid grid-cols-2 gap-2 w-full">
                    {Object.entries(casino?.metrics || {}).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex justify-between bg-white p-2 rounded-lg shadow-sm"
                      >
                        <span className="text-gray-700 text-xs">
                          {metricLabels[key] || key}
                        </span>
                        <span className="text-gray-700 text-sm">
                          {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}