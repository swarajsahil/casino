import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Hero = () => {
  const [showMore, setShowMore] = useState(false);
  const [jackpotValue, setJackpotValue] = useState(1254760);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate jackpot occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const startTime = Date.now();
      const duration = 2000;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < duration) {
          setJackpotValue(prev => prev + Math.floor(Math.random() * 1000));
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };
      
      animate();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const shortText = "Experience the thrill of high-stakes gaming with exclusive bonuses and VIP treatment.";
  const longText =
    shortText +
    " Join our elite casino community where every spin could be your big win. With 24/7 live dealers, weekly tournaments, and progressive jackpots, your next jackpot is just a click away.";

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black text-white px-4 pt-20 pb-12 md:py-24 relative overflow-hidden">
      {/* Animated floating casino chips */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-400 opacity-20 animate-float1" />
      <div className="absolute top-1/4 left-20 w-12 h-12 rounded-full bg-red-500 opacity-20 animate-float2" />
      <div className="absolute bottom-20 left-1/3 w-14 h-14 rounded-full bg-blue-400 opacity-20 animate-float3" />
      <div className="absolute left-1/3 right-32 w-10 h-10 rounded-full bg-green-400 opacity-20 animate-float4" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* LEFT TEXT BLOCK */}
        <div className="flex-1 z-10">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Win Big at the Ultimate Casino Experience
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-xl">
            {showMore ? longText : shortText}
          </p>
          
          <button
            onClick={() => setShowMore(!showMore)}
            className="focus:outline-none mb-6 text-sm font-light hover:text-yellow-400 transition-colors"
          >
            {showMore ? "Show less" : "Show more →"}
          </button>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/liveCasino"
              className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 px-8 rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 group"
            >
              <span className="relative z-10">JOIN NOW</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full border-2 border-yellow-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            
            <Link
              to="/promotions"
              className="relative overflow-hidden bg-transparent text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-white/20 hover:border-yellow-400 hover:text-yellow-400 transition duration-300"
            >
              VIEW PROMOTIONS
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Licensed & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Live Dealers</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="hidden md:block flex-1 z-10 relative">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Casino gaming experience"
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-yellow-400/30 transform rotate-1 hover:rotate-0 transition-transform duration-500"
            />
            {/* Floating badge */}
            {/* <div className="absolute -top-5 -right-5 bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg animate-bounce">
              HOT!
            </div> */}
          </div>
          
          {/* Game providers logos */}
          {/* <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <span className="font-bold text-yellow-400">NETENT</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <span className="font-bold text-blue-400">EVOLUTION</span>
            </div>
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <span className="font-bold text-green-400">PRAGMATIC</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Decorative BG Elements */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-yellow-400 rounded-full blur-3xl opacity-10 z-0" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-red-600 rounded-full blur-3xl opacity-10 z-0" />
      
      {/* Glitter effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-0 animate-glitter"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 1}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;