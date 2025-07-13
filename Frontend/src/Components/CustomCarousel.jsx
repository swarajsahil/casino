// import React, { useState, useEffect } from "react";
// import useFetch from "../hooks/useFetch";
// import { Link } from "react-router-dom";

// const CustomCarousel = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const { data, loading } = useFetch(`${API_URL}/api/casinos`);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const totalCards = data?.casinos?.length || 0;

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       Math.min(prev + 1, Math.max(0, totalCards - 4))
//     );
//   };

//   const isPrevDisabled = currentIndex === 0;
//   const isNextDisabled = currentIndex >= Math.max(0, totalCards - 4);

//   // Star animation
//   const [visibleStars, setVisibleStars] = useState(0);
//   useEffect(() => {
//     let timer;
//     if (visibleStars < 4) {
//       timer = setTimeout(() => {
//         setVisibleStars((prev) => prev + 1);
//       }, 300);
//     }
//     return () => clearTimeout(timer);
//   }, [visibleStars]);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">
//         Best casinos according to our expert reviews
//       </h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-48">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Nav Buttons */}
//           <div className="hidden lg:flex justify-end gap-4 mb-4">
//             <button
//               onClick={handlePrev}
//               disabled={isPrevDisabled}
//               className="text-black border border-black p-2 px-3 hover:bg-gray-200 disabled:opacity-50"
//             >
//               ❮
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={isNextDisabled}
//               className="text-black border border-black p-2 px-3 hover:bg-gray-200 disabled:opacity-50"
//             >
//               ❯
//             </button>
//           </div>

//           {/* Cards */}
//           <div className="overflow-hidden">
//             <div
//               className="flex gap-4 transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / 4)}%)`,
//                 width: `${totalCards * 25}%`,
//               }}
//             >
//               {data?.casinos?.map((card, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 w-72 bg-white shadow-md rounded-lg overflow-hidden"
//                 >
//                   <div className="p-4">
//                     <img
//                       src={card.image}
//                       alt={card.title}
//                       className="w-full h-40 object-cover rounded-lg mb-4"
//                       loading="lazy"
//                     />
//                     <h6 className="text-lg font-semibold text-center mb-2">
//                       {card.name}
//                     </h6>

//                     {/* Stars */}
//                     <div className="flex gap-2 justify-center py-2">
//                       {[...Array(5)].map((_, starIndex) => (
//                         <svg
//                           key={starIndex}
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6"
//                           fill={
//                             starIndex < visibleStars ? "currentColor" : "none"
//                           }
//                           viewBox="0 0 24 24"
//                           stroke={
//                             starIndex < visibleStars ? "currentColor" : "gray"
//                           }
//                           strokeWidth={2}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             className={`${
//                               starIndex < visibleStars
//                                 ? "text-yellow-400"
//                                 : "text-gray-300"
//                             }`}
//                             d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
//                           />
//                         </svg>
//                       ))}
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex flex-col items-center">
//                       <Link
//                         to={`/liveCasino/${card._id}`}
//                         className="text-purple-500 border border-purple-500 px-4 py-2 rounded-lg mb-2 hover:bg-purple-500 hover:text-white transition"
//                       >
//                         Details
//                       </Link>
//                       <Link
//                         to={card?.casinoLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
//                       >
//                         Play Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Mobile/Tablet Arrows & Show All */}
//           <div className="flex lg:hidden justify-between items-center mt-6">
//             <div className="flex gap-2">
//               <button
//                 onClick={handlePrev}
//                 disabled={isPrevDisabled}
//                 className="text-black border border-black p-2 px-3 hover:bg-gray-200 disabled:opacity-50"
//               >
//                 ❮
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className="text-black border border-black p-2 px-3 hover:bg-gray-200 disabled:opacity-50"
//               >
//                 ❯
//               </button>
//             </div>
//             <Link to="/liveCasino">
//               <button className="text-black border border-black px-4 py-2 hover:bg-gray-200 transition">
//                 Show All
//               </button>
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CustomCarousel;
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// const casinoData = [
//   {
//     id: 1,
//     name: "Martin Casino",
//     image: "/assets/2cc6ef17-188e-4790-8c1f-45a8305272eb",
//     offer: "₹30,000 + 350 Free Spins",
//     link: "https://livecasinorank.com/goto/martin-casino",
//   },
//   {
//     id: 2,
//     name: "Osh Casino",
//     image: "/assets/osh-casino.png",
//     offer: "₹20,000 + 200 Free Spins",
//     link: "https://livecasinorank.com/goto/osh-casino",
//   },
//   // Add more casinos...
// ];

export default function CustomCarousel({data}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth * 0.6;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", updateScrollButtons);

    return () => {
      window.removeEventListener("resize", updateScrollButtons);
      if (container) container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-center text-xl font-semibold mt-6">
        Recently added casinos
      </h2>
      <p className="text-center text-sm text-gray-600 mb-4">
        New exciting casinos to explore
      </p>

      {/* Arrow buttons */}
      <div className="absolute right-4 top-10 flex gap-2 z-10">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-10 h-10 bg-white rounded shadow flex items-center justify-center transition ${
            !canScrollLeft ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-10 h-10 bg-white rounded shadow flex items-center justify-center transition ${
            !canScrollRight ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 pt-6 pb-4 scroll-smooth"
      >
        {data.map((casino) => (
          <div
            key={casino.id}
            className="min-w-[300px] sm:min-w-[240px] md:min-w-[200px] bg-white rounded shadow border border-gray-200 relative px-4 pt-24 pb-4"
          >
            <a
              href={casino.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-black rounded overflow-hidden shadow"
            >
              <img
                src={casino.image}
                alt={casino.name}
                className="w-full h-full object-contain"
              />
            </a>

            <div className="text-center mt-2">
              <p className="font-semibold text-lg">{casino.name}</p>
              <p className="text-sm font-medium text-green-600 mt-1">
                {casino.offer}
              </p>
              <a
                href={casino.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-green-700 text-white text-sm font-bold px-4 py-2 rounded hover:brightness-110 transition"
              >
                Get your bonus
              </a>
              <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                18+ | Play Responsibly | gamblingtherapy.org | T&Cs Apply
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}