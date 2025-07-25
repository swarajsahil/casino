import React from 'react';

const CasinoCard = () => {
  // Dummy data - replace with API data later
  const casinos = [
    {
      id: 1,
      name: "Parimatch",
      logo: "https://img.indiacasinos.com/400x210/casino/parimatch.jpg",
      rating: 97,
      bonus: "₹105,000",
      freeSpins: "100",
      wagering: "30x",
      pros: [ "Fast payouts","24/7 support"],
      features: ["Crypto wallet", "Bitcoin", "VIP programme", "Local language"],
      link: "https://go.indiacasinos.com/go/parimatch?referrer_path=%2Freviews%2Fparimatch",
      termsLink: "https://go.indiacasinos.com/go/parimatch_terms?referrer_path=%2Freviews%2Fparimatch"
    },
    {
      id: 2,
      name: "Betway",
      logo: "https://img.indiacasinos.com/400x210/casino/betway.jpg",
      rating: 95,
      bonus: "₹80,000",
      freeSpins: "50",
      wagering: "35x",
      pros: [ "Fast payouts","24/7 support"],
      features: ["Live Casino", "Mobile App", "Fast Payouts", "24/7 Support"],
      link: "https://go.indiacasinos.com/go/betway",
      termsLink: "https://go.indiacasinos.com/go/betway_terms"
    },
    {
      id: 3,
      name: "LeoVegas",
      logo: "https://img.indiacasinos.com/400x210/casino/leovegas.jpg",
      rating: 94,
      bonus: "₹120,000",
      freeSpins: "200",
      wagering: "25x",
      pros: [ "Fast payouts","24/7 support"],
      features: ["Jackpots", "Tournaments", "Loyalty Program", "Sports Betting"],
      link: "https://go.indiacasinos.com/go/leovegas",
      termsLink: "https://go.indiacasinos.com/go/leovegas_terms"
    }
  ];

  return (
    <div className="space-y-6">
      {casinos.map((casino) => (
        <div 
          key={casino.id}
          className="relative bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://img.indiacasinos.com/svg/pattern.svg')]"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            {/* Casino Logo - Hidden on mobile */}
            <div className="hidden md:block md:col-span-2">
              <div className="h-full rounded-lg overflow-hidden shadow-md">
                <a href={casino.link} rel="nofollow noopener" target="_blank" className="block h-full">
                  <img 
                    src={casino.logo} 
                    alt={`Go to ${casino.name}`} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
            </div>

            {/* Rating Section */}
            <div className="md:col-span-2">
              <div className="flex h-full bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-2">
                {/* Mobile Logo */}
                <div className="md:hidden w-1/3 pr-2">
                  <a href={casino.link} rel="nofollow noopener" target="_blank" className="block h-full rounded overflow-hidden">
                    <img 
                      src={casino.logo} 
                      alt={`Go to ${casino.name}`} 
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>

                {/* Rating Circle */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-1">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E0E0E0"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="3"
                        strokeDasharray={`${casino.rating}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                      {casino.rating}
                    </div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Rating</span>
                </div>
              </div>
            </div>

            {/* Pros */}
            <div className="md:col-span-2">
              <div className="h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-1 shadow-md flex flex-col justify-center items-center gap-1">
                <span className="text-xl font-bold text-white mb-1 text-center">Pros</span>
                {casino.pros.map((pro,index) => (
                  <div 
                    key={index}
                    className="bg-white bg-opacity-10 rounded-lg p-1 flex flex-col items-center justify-center backdrop-blur-sm hover:bg-opacity-20 transition-colors"
                  >
                    <span className="text-xs text-white text-center font-medium">{pro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Card */}
            <div className="md:col-span-2">
              <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-3 shadow-md flex flex-col justify-center items-center">
                <span className="text-lg text-blue-100 mb-2 text-center">WELCOME BONUS</span>
                <span className="text-lg font-bold text-white mb-1">{casino.bonus}</span>
              </div>
            </div>

            {/* Free Spins Card */}
            <div className="md:col-span-2">
              <div className="h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow-md flex flex-col justify-center items-center">
                <span className="text-xl text-center text-purple-100">FREE SPINS</span>
                <span className="text-2xl font-bold text-white mb-1">{casino.freeSpins}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2">
              <div className="flex flex-col space-y-2 h-full justify-center">
                <a 
                  href={casino.link} 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-md"
                  rel="nofollow noopener" 
                  target="_blank"
                >
                  Play Now
                </a>
                <a 
                  href="#review" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black font-bold py-3 px-4 rounded-lg text-center transition-all duration-300"
                  rel="noopener"
                >
                  Review
                </a>
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="bg-black bg-opacity-30 py-2 px-4 text-center">
            <p className="text-xs text-gray-300">
              18+ | Play Responsibly | <span>Gambleaware.org</span> | 
              New players only. Minimum deposit of ₹350 required. Wagering requirement of {casino.wagering}. | 
              <span>Terms apply</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CasinoCard;


// <div className="flex flex-col md:flex-row gap-4">
//   {/* Casino Logo with Floating Effect */}
//   <div className="flex justify-center md:justify-start">
//     <div className="relative">
//       <div className="absolute -inset-2 bg-blue-100 rounded-xl -z-10"></div>
//       <img
//         src={image}
//         alt={name}
//         className="w-16 h-16 md:w-20 md:h-20 object-center rounded-lg shadow-md"
//         loading="lazy"
//       />
//     </div>
//   </div>

//   {/* Casino Info */}
//   <div className="flex-1">
//     {/* Name and Awards - Stacked on mobile */}
//     <div className="text-center md:text-left">
//       <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      
//       {/* Awards - Horizontal scroll on mobile */}
//       <div className="overflow-x-auto pb-2 scrollbar-hide">
//         <div className="flex space-x-2 justify-center md:justify-start">
//           {missingData?.awards.map((award, index) => (
//             <div 
//               key={index} 
//               className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-full px-3 py-1 flex items-center gap-1 shadow-md flex-shrink-0"
//             >
//               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//               <span className="text-white text-xs md:text-sm font-semibold">{award}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//     {/* Ratings - Stacked on mobile */}
//     <div className="mt-4 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6 justify-center md:justify-start">
//       {/* Casino Rating */}
//       <div className="flex items-center justify-center md:justify-start space-x-3">
//         <div className="relative w-12 h-12">
//           <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
//           <div
//             className="absolute inset-0 rounded-full border-4 border-blue-500 origin-center"
//             style={{
//               clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
//               transform: `rotate(${(missingData.rating / 10) * 180}deg)`
//             }}
//           ></div>
//           <span className="absolute inset-0 flex items-center justify-center font-bold text-blue-600 text-sm">
//             {missingData.rating}
//           </span>
//         </div>
//         <div>
//           <div className="text-xs font-semibold text-gray-700">CASINO RATING</div>
//           <div className="text-xs text-gray-500">Very Good</div>
//         </div>
//       </div>

//       {/* Player Rating */}
//       <div className="flex items-center justify-center md:justify-start space-x-3">
//         <div className="relative w-12 h-12">
//           <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
//           <div
//             className="absolute inset-0 rounded-full border-4 border-green-500 origin-center"
//             style={{
//               clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
//               transform: `rotate(${(missingData.playerRating / 10) * 180}deg)`
//             }}
//           ></div>
//           <span className="absolute inset-0 flex items-center justify-center font-bold text-green-600 text-sm">
//             {missingData.playerRating}
//           </span>
//         </div>
//         <div>
//           <div className="text-xs font-semibold text-gray-700">PLAYER RATING</div>
//           <Link to="#reviews" className="text-xs text-blue-500 hover:underline">
//             {missingData.reviewCount} reviews
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>