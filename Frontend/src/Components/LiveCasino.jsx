import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LiveCasinoLoader from "./LiveCasinoLoader";
import useFetch from "../hooks/useFetch";
import CasinoDetail from "./CasinoDetail";
import { Casinofaqs, dynamicData } from "../config";
import Faq from "./Faq";

const LiveCasino = () => {
  const API_URL=import.meta.env.VITE_API_URL;
  const [isExpanded, setIsExpanded] = useState(null);
  const { data, loading } = useFetch(`${API_URL}/api/casinos`);

  const toggleExpand = (index) => {
    setIsExpanded((prev) => (prev === index ? null : index));
  };


  return loading ? (
    <LiveCasinoLoader />
  ) : (
    <div className="flex flex-col w-full h-full bg-gray-100 justify-center items-center">
      <div className="flex justify-start items-start w-3/4 mt-4">
        <h1 className="text-3xl ml-4">Live Casino</h1>
      </div>

      {data?.casinos?.map((casino, index) => (
        <div
          key={casino?._id}
          className="flex flex-col w-5/6 h-full bg-white gap-3 mt-4 mb-4 border-2 border-gray-100"
        >
          {/* Upper Section */}
          <div className="flex flex-col md:flex-row w-full h-auto md:h-44">
            {/* Image and Info */}
            <div className="w-full md:w-1/3 h-full bg-white flex flex-col md:flex-row justify-around items-center sm:gap-2">
              <div className="w-full md:w-1/2 h-32 flex justify-center">
                <img
                  className="w-32 h-32 sm:w-28 sm:h-28"
                  src={casino?.image}
                  alt={casino?.name}
                />
              </div>
              <div className="w-full md:w-2/3 h-auto md:h-28 flex flex-col gap-2 items-center md:items-start sm:gap-2">
                <p className="text-xl font-bold">{casino?.name}</p>
                <div className="">
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
                  onClick={() => toggleExpand(index)}
                  className="w-28 h-10 bg-gray-100 text-xs text-gray-400 rounded-md flex items-center justify-center p-1 sm:w-20 sm:h-14"
                >
                  <span>{isExpanded === index ? "Show Less" : "Show More"}</span>
                  <img
                    src={
                      isExpanded === index
                        ? "https://livecasinorank.com/_static/icons/listingCollapse.svg"
                        : "https://livecasinorank.com/_static/icons/listingExpand.svg"
                    }
                    alt={isExpanded === index ? "Collapse" : "Expand"}
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            {/* Bonus */}
            <div className="flex flex-col w-full md:w-1/3 justify-center items-center md:pl-6 text-center md:text-left">
              <p className="text-2xl text-amber-900 font-bold">
                Bonus: ₹{casino?.bonus}
              </p>
              <p className="text-lg text-amber-900">+ {casino?.freeSpins} Free Spins</p>
              <div className="text-xs">
                <p>18+ | Play Responsibly | gamblingtherapy.org |</p>
                <p> T&Cs Apply</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full md:w-1/3 justify-center md:justify-end pr-2 items-center mt-4 md:mt-0">
              <div className="flex flex-col gap-4 pb-2">
              <Link to={`/${casino?.casinoLink}`}>
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

          {/* Expandable Section */}
          {isExpanded === index && (
           <div className="flex flex-col md:flex-row w-full gap-4 mb-4 justify-center items-center md:items-start">
              {/* About Section */}
              <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
                <div className="flex flex-col h-auto border-2 border-gray-50 px-4 rounded-lg bg-gray-100 items-center justify-center w-full">
                  <p className="text-lg font-bold py-1">About</p>
                  <p className="text-xs py-2">
                    To ensure the ultimate Live Casino experience, it's crucial to choose a provider with a proven track record of excellence. {casino?.name} is a name you can rely on with a high rating and a long-standing reputation in the industry.
                    In this review, we will dive into the top features of this popular provider to give you an in-depth look at what sets it apart from the competition. From its impressive game selection to easy and secure deposit methods and unbeatable bonuses. We'll explore everything you need to know to decide if this casino provider is right for you.
                    `;
                    {/* {casino?.description} */}
                  </p>
                </div>
              </div>

              {/* Pros Section */}
              <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
                <div className="flex flex-col h-auto border-2 border-gray-50 p-4 rounded-lg bg-green-50  justify-start w-full">
                  <div className="flex gap-2 py-2">
                    <img
                      src="https://livecasinorank.com/_static/icons/pros.svg"
                      alt="logo"
                    />
                    <p className="text-lg font-bold text-green-300">Pros</p>
                  </div>
                  <ol className="w-full list-none flex flex-col gap-2">
                    {casino?.pros?.map((item, index) => (
                      <li
                        key={index}
                        className="text-xs text-[#120f3f] relative pl-4 mb-1 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-green-500"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <CasinoDetail data={dynamicData} />
      <Faq data={Casinofaqs} />
    </div>
  );
};

export default LiveCasino;

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