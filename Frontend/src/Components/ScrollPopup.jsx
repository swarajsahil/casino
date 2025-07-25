// import React, { useState, useEffect } from 'react';

// const BottomPromoPopup = () => {
//   const [currentCard, setCurrentCard] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);

//   const promotions = [
//     {
//       id: 1,
//       title: "MEGA JACKPOT BONUS",
//       bonus: "200% UP TO $1000",
//       description: "Claim your massive welcome package with our exclusive Mega Jackpot Bonus. Perfect for high rollers looking to maximize their playtime!",
//       image: "https://a.omappapi.com/users/4e11541cdfb6/images/ea4cf2e1025b1735596138-Stake-Casino.png"
//     },
//     {
//       id: 2,
//       title: "FREE SPINS FRENZY",
//       bonus: "100 FREE SPINS",
//       description: "Spin your way to big wins with our Free Spins Frenzy offer. No deposit required - just sign up and start spinning!",
//       image: "https://a.omappapi.com/users/4e11541cdfb6/images/62802eb4915d1703236121-begambleaware-1.png"
//     },
//     {
//       id: 3,
//       title: "CASHBACK SPECIAL",
//       bonus: "20% WEEKLY CASHBACK",
//       description: "Get money back on your losses every week with our Cashback Special. The more you play, the more you get back!",
//       image: "https://a.omappapi.com/users/4e11541cdfb6/images/07d62a25dfa41703236378-Icon-star.png"
//     }
//   ];

//   // Auto-rotate cards every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCard((prev) => (prev + 1) % promotions.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 h-1/5 bg-gray-900 border-t-4 border-yellow-500 z-50 shadow-lg md:w-3/5 md:left-1/5">
//       <div className="relative h-full w-4/5 max-w-6xl mx-auto">
//         {/* Close button */}
//         <button 
//           onClick={() => setIsVisible(false)}
//           className="absolute top-3 -right-12 text-white hover:text-yellow-400 z-10 p-1 lg:-right- md:-right-10"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Billboard-Style Promotional Card */}
//         <div className="relative h-full overflow-hidden">
//           {promotions.map((promo, index) => (
//             <div 
//               key={promo.id}
//               className={`absolute inset-0 flex transition-opacity duration-500 ${index === currentCard ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//             >
//               {/* Left side - image */}
//               <div className="w-1/3 h-full flex justify-center items-center">
//                 <img 
//                   src={promo.image} 
//                   alt={promo.title}
//                   className="max-h-full max-w-full object-contain"
//                 />
//                 <div className="absolute top-6 left-1 bg-yellow-500 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
//                   {promo.id}
//                 </div>
//               </div>
              
//               {/* Right side - content */}
//               <div className="w-2/3 h-full flex flex-col justify-center items-center p-3 pl-6">
//                 <h3 className="text-xl font-bold text-white uppercase">
//                   {promo.title}
//                 </h3>
//                 <div className="bg-yellow-500 text-gray-900 font-bold py-1 px-3 rounded-full text-xs md:text-sm inline-block mb-3 md:w-auto">
//                   {promo.bonus}
//                 </div>
                
//                 <div className="flex justify-center">
//                   <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 md:px-6 rounded text-xs md:text-sm transition-colors duration-200">
//                     PLAY NOW
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Card indicators */}
//         <div className="absolute bottom-2 right-0 transform -translate-x-1/2 flex space-x-2">
//           {promotions.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentCard(index)}
//               className={`w-2 h-2 rounded-full ${index === currentCard ? 'bg-yellow-500' : 'bg-gray-600'}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* CSS for marquee animation */}
//       <style jsx>{`
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopup } from '../common/popupSlice';

const ScrollPopup = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.popup);

    const [isVisible, setIsVisible] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchPopup());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300 && !hasShownPopup) {
                setIsVisible(true);
                setHasShownPopup(true);
                document.body.style.overflow = 'hidden';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto';
        };
    }, [hasShownPopup]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[1000] bg-black bg-opacity-50 font-['Noto_Sans']">
            {/* Transparent black overlay that covers entire screen */}
            <div 
                className="absolute top-0 left-0 w-screen h-screen bg-transparent"
                onClick={() => {
                    setIsVisible(false);
                    document.body.style.overflow = 'auto';
                }}
            ></div>
            
            {/* Main popup container with padding that creates the surrounding space */}
            <div className="relative w-full max-w-[320px] rounded-xl overflow-hidden bg-black bg-opacity-80 shadow-[0_0_30px_rgba(0,0,0,0.7)] z-[2] text-white">
                {/* Close button (X) in top-right corner */}
                <button 
                    className="absolute top-[10px] right-[10px] bg-none border-none cursor-pointer p-[5px] z-[1]"
                    onClick={() => {
                        setIsVisible(false);
                        document.body.style.overflow = 'auto';
                    }}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Announcement text */}
                <div className="m-5 text-center">
                    <p className="m-0 leading-[1.2] text-center">
                        <span className="text-[23px] font-['Noto_Sans'] font-semibold text-white">New prizes are&nbsp;</span>
                        <br />
                        <span className="text-[23px] font-['Noto_Sans'] font-semibold text-white">now&nbsp;</span>
                        <span className="text-[23px] font-['Noto_Sans'] font-semibold text-white">up for grabs!</span>
                    </p>
                </div>

                {/* Brand image */}
                <div className="flex w-full justify-center items-center">
                    <img
                        // src={data?.image}
                        src={`https://res.cloudinary.com/dil1fk4jh/image/upload/v1742565102/odh47eghgrux6ojflill.jpg`}
                        alt="Brand Logo"
                        className="w-[70%] h-auto block rounded-t-lg"
                    />
                </div>

                {/* Rating */}
                <div className="flex bg-white items-center justify-evenly h-[2em] mx-5">
                    <div className="flex items-center gap-[0.1em]">
                        <img 
                            src="https://a.omappapi.com/users/4e11541cdfb6/images/07d62a25dfa41703236378-Icon-star.png" 
                            alt="Star" 
                            className="w-5 h-5" 
                        />
                        <span className="text-black text-base font-semibold">{data?.rating || '4.2'}</span>
                    </div>
                </div>

                {/* Title and prize */}
                <div className="bg-white text-black p-2.5 mx-5">
                    <p className="font-['Open_Sans'] text-lg text-center m-0 mb-1 leading-[1.1]">{data?.title || "Stake's Weekly Raffle"}</p>
                    <p className="font-['Open_Sans'] text-lg text-center m-0 leading-[1.1]">Win a Share of ${data?.prizeAmount || '75,000'}</p>
                </div>

                {/* Participate button */}
                <div className="bg-white p-1 mx-5 text-center">
                    <button
                        className="bg-[#5a35b5] text-white border-none rounded-md py-3.5 px-3 text-base font-bold w-full cursor-pointer font-['Noto_Sans']"
                        onClick={() => window.open(data?.bonusLink || '#', '_blank')}
                    >
                        Participate
                    </button>
                </div>

                {/* Terms */}
                <div className="bg-white p-2.5 mx-5 rounded-b-lg text-center">
                    <p className="text-xs font-semibold text-black font-['Open_Sans'] m-0">T&Cs apply</p>
                </div>

                {/* Footer with skip and gamble aware */}
                <div className="flex flex-col items-center mt-5">
                    <button 
                        className="bg-transparent border-none text-[#666666] text-sm cursor-pointer p-1 mb-5 font-['Noto_Sans']"
                        onClick={() => {
                            setIsVisible(false);
                            document.body.style.overflow = 'auto';
                        }}
                    >
                        Skip this offer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScrollPopup;