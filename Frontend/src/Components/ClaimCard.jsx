import { useState } from "react";

const ClaimCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl transition-all duration-300 z-50 ${isExpanded ? 'h-auto' : 'h-20'}`}>
      {/* Mobile trigger */}
      <button 
        className="w-full py-3 flex flex-col gap-2 justify-center items-center text-white rounded-t-xl"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse claim" : "Expand claim"}
      >
        <span className="mr-2 font-medium">{isExpanded ? 
        
        <img src="https://www.askgamblers.com/build/site/kitchen-sink/build/media/img/resize-indicator-expand.e7b815b0a672488d1a0b.svg" alt="logo" className="rotate-180"/>
        :
        <img src="https://www.askgamblers.com/build/site/kitchen-sink/build/media/img/resize-indicator-expand.e7b815b0a672488d1a0b.svg" alt="logo" />
        }</span>
        {/* <svg 
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg> */}
          <a 
            href="/visit/casino-review/wazbee-casino" 
            className="w-11/12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center mb-2"
            target="_blank" 
            rel="nofollow sponsored"
          >
            Visit Wazbee Casino
          </a>
      </button>

      {/* Header - Mobile */}
      <div className={`${!isExpanded && 'hidden'} p-4`}>
        <div className="flex flex-col items-center">
          <a 
            href="/visit/casino-review/wazbee-casino" 
            className="text-xs text-gray-500 hover:underline" 
            target="_blank" 
            rel="nofollow sponsored"
          >
            T&Cs Apply
          </a>
        </div>
      </div>

      {/* Body */}
      <div className={`${!isExpanded && 'hidden'} p-4 w-11/12 mx-auto border-1 border-gray-200`}>
        {/* Bonus Offer */}
        <div className=" py-4 mb-4 ">
          <div className="mb-4 ">
            <span className="text-xs uppercase text-gray-500">Welcome Bonus</span>
            <h3 className="text-lg font-semibold">125% up to €200 + 50 Free Spins</h3>
          </div>
          <div className="flex flex-col space-y-2">
            <a 
              href="/visit/bonus/wazbee-casino-bonus" 
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded text-center"
              target="_blank" 
              rel="nofollow sponsored"
            >
              Claim offer and play
            </a>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">
                <a href="/visit/casino-review/wazbee-casino" target="_blank" className="hover:underline" rel="nofollow sponsored">
                  Full Terms apply.
                </a>
              </span>
              <a 
                href="#bonus-list" 
                className="text-blue-400 hover:underline"
              >
                Show all bonuses
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`${!isExpanded && 'hidden'} p-4 bg-gray-50`}>
        <div className="mb-3">
          <a 
            href="/sports-betting/sportsbook-reviews/wazbee-sportsbook" 
            className="text-blue-400 hover:underline flex items-center justify-center"
          >
            Switch to Wazbee Sportsbook Review
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;