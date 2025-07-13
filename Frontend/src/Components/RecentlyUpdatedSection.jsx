import React, { useRef, useState, useEffect, forwardRef } from "react";

const RecentlyUpdatedSection = () => {
  const items = [
    {
      id: 1,
      href: "/bonuses/bonus-codes/",
      type: "Bonuses",
      icon: (
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.91658 8.89286V12.9015C7.9166 12.9531 7.90291 13.0038 7.87694 13.0484C7.85096 13.093 7.81362 13.1299 7.76872 13.1553C7.72383 13.1808 7.67298 13.1939 7.62138 13.1932C7.56978 13.1926 7.51927 13.1783 7.475 13.1518L4.99992 11.6666L2.52484 13.1518C2.48053 13.1783 2.42996 13.1926 2.37831 13.1932C2.32666 13.1938 2.27577 13.1807 2.23086 13.1552C2.18595 13.1297 2.14861 13.0927 2.12268 13.048C2.09674 13.0034 2.08314 12.9526 2.08325 12.9009V8.89344C1.3285 8.28916 0.780081 7.46537 0.51377 6.53592C0.247459 5.60647 0.27641 4.61725 0.596622 3.70497C0.916834 2.79269 1.5125 2.00238 2.30129 1.44327C3.09009 0.884166 4.03307 0.583862 4.99992 0.583862C5.96677 0.583862 6.90975 0.884166 7.69854 1.44327C8.48734 2.00238 9.083 2.79269 9.40322 3.70497C9.72343 4.61725 9.75238 5.60647 9.48607 6.53592C9.21976 7.46537 8.67133 8.28916 7.91658 8.89344V8.89286ZM3.24992 9.57711V11.3563L4.99992 10.3063L6.74992 11.3563V9.57711C6.19391 9.80198 5.59968 9.91727 4.99992 9.91661C4.40016 9.91727 3.80593 9.80198 3.24992 9.57711ZM4.99992 8.74994C5.92818 8.74994 6.81842 8.3812 7.47479 7.72482C8.13117 7.06844 8.49992 6.1782 8.49992 5.24994C8.49992 4.32169 8.13117 3.43145 7.47479 2.77507C6.81842 2.11869 5.92818 1.74994 4.99992 1.74994C4.07166 1.74994 3.18142 2.11869 2.52505 2.77507C1.86867 3.43145 1.49992 4.32169 1.49992 5.24994C1.49992 6.1782 1.86867 7.06844 2.52505 7.72482C3.18142 8.3812 4.07166 8.74994 4.99992 8.74994Z" fill="black"/>
        </svg>
      ),
      image: "/assets/d48da68bb65b892abbb9e8d9fe65b3c0rec4tMkSLWxeAanU9",
      alt: "Bonus Codes",
      date: "2025 / 06 / 24",
      title: "Bonus Codes",
      description: "Welcome to the exciting world of Live Casino Bonus Codes, where real dealers and thrilling gameplay meet incredible offers. In my experience, finding the best bonus codes can enhance your gaming experience significantly, especially if you're playing from various English-speaking regions."
    },
    {
      id: 2,
      href: "/games/blackjack/",
      type: "Games",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5H3C1.9 5 1 5.9 1 7V17C1 18.1 1.9 19 3 19H21C22.1 19 23 18.1 23 17V7C23 5.9 22.1 5 21 5ZM21 17H3V7H21V17Z" fill="black"/>
          <path d="M15 15H17V9H15V15ZM7 15H13V13H9V11H13V9H7V15Z" fill="black"/>
        </svg>
      ),
      image: "/assets/blackjack-image",
      alt: "Blackjack",
      date: "2025 / 06 / 25",
      title: "Blackjack Pro",
      description: "Experience the thrill of live Blackjack with professional dealers. Our top-rated Blackjack tables offer the most authentic casino experience from the comfort of your home."
    },
    {
      id: 3,
      href: "/payments/crypto/",
      type: "Payments",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="black"/>
          <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="black"/>
        </svg>
      ),
      image: "/assets/crypto-payment-image",
      alt: "Crypto Payments",
      date: "2025 / 06 / 26",
      title: "Crypto Deposits",
      description: "Fast and secure cryptocurrency payment methods now available. Deposit with Bitcoin, Ethereum, and other major cryptocurrencies with instant processing."
    },
    {
      id: 4,
      href: "/bonuses/welcome/",
      type: "Bonuses",
      icon: (
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.91658 8.89286V12.9015C7.9166 12.9531 7.90291 13.0038 7.87694 13.0484C7.85096 13.093 7.81362 13.1299 7.76872 13.1553C7.72383 13.1808 7.67298 13.1939 7.62138 13.1932C7.56978 13.1926 7.51927 13.1783 7.475 13.1518L4.99992 11.6666L2.52484 13.1518C2.48053 13.1783 2.42996 13.1926 2.37831 13.1932C2.32666 13.1938 2.27577 13.1807 2.23086 13.1552C2.18595 13.1297 2.14861 13.0927 2.12268 13.048C2.09674 13.0034 2.08314 12.9526 2.08325 12.9009V8.89344C1.3285 8.28916 0.780081 7.46537 0.51377 6.53592C0.247459 5.60647 0.27641 4.61725 0.596622 3.70497C0.916834 2.79269 1.5125 2.00238 2.30129 1.44327C3.09009 0.884166 4.03307 0.583862 4.99992 0.583862C5.96677 0.583862 6.90975 0.884166 7.69854 1.44327C8.48734 2.00238 9.083 2.79269 9.40322 3.70497C9.72343 4.61725 9.75238 5.60647 9.48607 6.53592C9.21976 7.46537 8.67133 8.28916 7.91658 8.89344V8.89286ZM3.24992 9.57711V11.3563L4.99992 10.3063L6.74992 11.3563V9.57711C6.19391 9.80198 5.59968 9.91727 4.99992 9.91661C4.40016 9.91727 3.80593 9.80198 3.24992 9.57711ZM4.99992 8.74994C5.92818 8.74994 6.81842 8.3812 7.47479 7.72482C8.13117 7.06844 8.49992 6.1782 8.49992 5.24994C8.49992 4.32169 8.13117 3.43145 7.47479 2.77507C6.81842 2.11869 5.92818 1.74994 4.99992 1.74994C4.07166 1.74994 3.18142 2.11869 2.52505 2.77507C1.86867 3.43145 1.49992 4.32169 1.49992 5.24994C1.49992 6.1782 1.86867 7.06844 2.52505 7.72482C3.18142 8.3812 4.07166 8.74994 4.99992 8.74994Z" fill="black"/>
        </svg>
      ),
      image: "/assets/welcome-bonus-image",
      alt: "Welcome Bonus",
      date: "2025 / 06 / 27",
      title: "Welcome Package",
      description: "New players receive up to $1000 in bonus money across your first three deposits. Plus get 200 free spins to use on our most popular slots."
    }
  ];


  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Responsive view detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
      
      // Determine how many cards to show based on screen width
      if (width >= 1280) {
        setVisibleCards(4);
      } else if (width >= 1024) {
        setVisibleCards(3);
      } else if (width >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll for desktop
  useEffect(() => {
    if (isMobileView) return;
    
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      scrollToIndex(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isMobileView, items.length]);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (!containerRef.current || isMobileView) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    
    // Calculate current index based on scroll position
    const cardWidth = container.scrollWidth / items.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Scroll to specific card index
  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const cardElements = Array.from(container.children);
    
    if (index >= 0 && index < cardElements.length) {
      const card = cardElements[index];
      const scrollPosition = isMobileView 
        ? card.offsetLeft - (container.clientWidth - card.clientWidth) / 2
        : card.offsetLeft - (container.clientWidth - card.clientWidth) / visibleCards;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
      
      setActiveIndex(index);
    }
  };

  // Calculate card width based on visible cards
  const getCardWidth = () => {
    if (isMobileView) return "calc(90vw - 20px)"; // Account for padding/margin
    if (visibleCards === 4) return "calc(25% - 15px)";
    if (visibleCards === 3) return "calc(33.33% - 15px)";
    if (visibleCards === 2) return "calc(50% - 15px)";
    return "calc(90vw - 20px)";
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h4 className="text-center text-xl md:text-2xl mb-10">
        Recently updated bonuses, games and deposit methods
      </h4>

      <div className="relative">
        {/* Cards Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={`flex py-4 overflow-x-auto scrollbar-hide ${
            isMobileView 
              ? "snap-x snap-mandatory pl-4 gap-4" 
              : "gap-4 px-4"
          }`}
          style={{
            scrollSnapType: isMobileView ? "x mandatory" : "none",
            maskImage: isMobileView 
              ? "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)"
              : "none"
          }}
        >
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="flex-shrink-0"
              style={{ 
                width: getCardWidth(),
                scrollSnapAlign: isMobileView ? "start" : "none"
              }}
            >
              <Card
                item={item}
                isActive={index === activeIndex}
                isMobileView={isMobileView}
                ref={(el) => (cardRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots - Always visible for mobile, only when needed for desktop */}
        {(isMobileView || items.length > visibleCards) && (
          <div className="flex justify-center mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1.5 transition-colors ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows - Only for desktop when needed */}
        {!isMobileView && items.length > visibleCards && (
          <>
            <button
              onClick={() => scrollToIndex((activeIndex - 1 + items.length) % items.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
              aria-label="Previous item"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollToIndex((activeIndex + 1) % items.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
              aria-label="Next item"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Card = forwardRef(({ item, isActive, isMobileView }, ref) => {
  const { type, icon, image, alt, date, title, description, href } = item;

  return (
    <div
      ref={ref}
      className={`flex flex-col rounded-lg p-6 relative transition-all duration-300 ease-in-out h-full
        ${
          isMobileView
            ? "snap-start"
            : ""
        }
        ${
          isActive || !isMobileView
            ? "bg-white shadow-lg shadow-blue-500/20"
            : "bg-gradient-to-b from-white to-white/22"
        }
        ${
          !isMobileView
            ? "hover:bg-white hover:shadow-lg hover:shadow-blue-500/20"
            : ""
        }`}
    >
      <div
        className={`absolute px-2 py-1.5 rounded-md text-sm top-[-15px] flex items-center ${
          isActive ? "bg-purple-800 text-white" : "bg-pink-50"
        }`}
      >
        <span className="mr-1">{icon}</span>
        {type}
      </div>

      <div className="bg-gray-100 h-[126px] flex items-center justify-center rounded-md mb-3">
        <img
          src={image}
          alt={alt}
          className="w-[120px] h-[100px] object-contain"
          loading="lazy"
        />
      </div>

      <span className="text-sm mb-2">{date}</span>
      <h3 className="text-lg font-medium mb-3">{title}</h3>

      <div className="max-h-[200px] overflow-hidden mb-3 text-sm bg-gradient-to-b from-black to-transparent bg-clip-text text-transparent">
        <p>{description}</p>
      </div>

      <a href={href} className="text-sm mt-2 hover:underline">
        Show more &gt;
      </a>
    </div>
  );
});

Card.displayName = "Card";

export default RecentlyUpdatedSection;