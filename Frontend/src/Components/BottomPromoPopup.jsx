// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPromotion } from '../common/promotionSlice';

// const BottomPromoPopup = () => {
//   const dispatch = useDispatch();
//   const { promotion = [], loading, error } = useSelector((state) => state.promotion);
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     dispatch(fetchPromotion());
//   }, [dispatch]);

//   // Auto-rotate cards only if promotions exist
//   useEffect(() => {
//     if (promotion.length > 0) {
//       const interval = setInterval(() => {
//         setCurrentCard((prev) => (prev + 1) % promotion.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [promotion.length]); // Add dependency

//   if (!isVisible || loading || error || promotion.length === 0) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 h-1/5 bg-gray-900 border-t-4 border-yellow-500 z-50 shadow-lg md:w-3/5 md:left-1/5">
//       <div className="relative h-full w-3/4 max-w-6xl mx-auto">
//         {/* Close button */}
//         <button 
//           onClick={() => setIsVisible(false)}
//           className="absolute -top-1 -right-12 text-white hover:text-yellow-400 z-10 p-1 md:-right-14 lg:-right-20"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Billboard-Style Promotional Card */}
//         <div className="relative h-full overflow-hidden">
//           {promotion.map((promo, index) => (
//             <div 
//               key={promo._id}
//               className={`absolute inset-0 flex transition-opacity duration-500 ${
//                 index === currentCard ? 'opacity-100' : 'opacity-0 pointer-events-none'
//               }`}
//             >
//               {/* Left side - image */}
//               <div className="w-1/3 h-full flex justify-center items-center">
//                 {promo.image && (
//                   <img 
//                     src={promo.image} 
//                     alt={promo.title}
//                     className="max-h-full max-w-full object-contain"
//                     onError={(e) => {
//                       e.target.src = 'fallback-image-url.jpg';
//                     }}
//                   />
//                 )}
//                 <div className="absolute top-6 left-1 bg-yellow-500 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
//                   {index + 1}
//                 </div>
//               </div>
              
//               {/* Right side - content */}
//               <div className="w-2/3 h-full flex flex-col justify-center items-center p-1 pl-6">
//                 <h3 className="text-lg font-bold text-white uppercase">
//                   {promo.title}
//                 </h3>
//                 <div className="bg-yellow-500 text-gray-900 font-bold py-1 px-2 rounded-full text-xs md:text-sm inline-block mb-1 md:w-auto">
//                   {promo.bonus}
//                 </div>
                
//                 <div className="flex justify-center">
//                   <a 
//                     href={promo.Bonuslink || '#'} 
//                     className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-1 px-2 md:px-4 rounded text-xs md:text-sm transition-colors duration-200"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     PLAY NOW
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Card indicators */}
//         {promotion.length > 1 && (
//           <div className="absolute bottom-2 right-0 transform -translate-x-1/2 flex space-x-2">
//             {promotion.map((_, index) => (
//               <button
//                 key={`indicator-${index}`}
//                 onClick={() => setCurrentCard(index)}
//                 className={`w-2 h-2 rounded-full ${
//                   index === currentCard ? 'bg-yellow-500' : 'bg-gray-600'
//                 }`}
//                 aria-label={`Go to promotion ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//       {/* CSS for marquee animation */}
//       <style jsx="true">{`
//         .marquee-container {
//           animation: marquee 20s linear infinite;
//           display: inline-block;
//         }
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BottomPromoPopup;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromotion } from '../common/promotionSlice';
import { Link } from 'react-router-dom';

const BottomPromoPopup = () => {
  const dispatch = useDispatch();
  const { promotion = [], loading, error } = useSelector((state) => state.promotion);
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);

  useEffect(() => {
    if (promotion.length > 0) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % promotion.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [promotion.length]);

  if (!isVisible || loading || error || promotion.length === 0) return null;

  const promo = promotion[currentCard];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900 to-blue-900 py-3 px-4 shadow-lg md:w-3/5 md:left-1/5 lg:w-1/2 lg:left-1/4">
      <div className="relative max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-7 -right-5 text-white hover:text-yellow-400 p-1 z-10"
        >
          <svg className="w-5 h-5 bg-purple-900 rounded-full border-1 border-white " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Promo image (from backend) */}
        <div className="w-1/5 min-w-[80px] pl-2">
          {promo.image && (
            <img
              src={promo.image}
              alt={promo.title || 'Promotion'}
              className="w-16 h-16 object-cover rounded-full border-1 border-yellow-400"
              onError={(e) => {
                e.target.src = '/fallback-image.jpg';
              }}
            />
          )}
        </div>

        {/* Bonus text */}
  <div className="text-center px-2">
    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white text-wrap">
      {promo?.bonus || '120% up to ₹450000 + 250 Free Spins'}
    </h3>
  </div>

        {/* Play button (linked to promo.Bonuslink) */}
        <div className="w-1/5 min-w-[80px] pr-2 flex justify-end">
          <Link
            to={promo?.Bonuslink}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold 
            px-4 py-2 rounded-lg text-sm transition-all duration-200 sm:text-lg"
            target="1"
            rel="noopener noreferrer"
          >
            Play
          </Link>
        </div>
      </div>

      {/* Card indicators */}
      {promotion.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {promotion.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentCard(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentCard ? 'bg-yellow-400' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BottomPromoPopup;
