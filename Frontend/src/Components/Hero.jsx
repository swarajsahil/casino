import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
export default function HeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, y: 50 }
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float-medium"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-red-500 rounded-full filter blur-2xl opacity-20 animate-float-fast"></div>
      </div>

      {/* Glitter particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-yellow-400 rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content */}
          <motion.div 
            className="md:w-2/3 mb-12 md:mb-0"
            variants={variants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                LiveCasinoRank
              </span> — <br/>
              Ultimate Live Casino Experience
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your premier guide to the world of live online casinos. Discover exclusive reviews, bonuses, and strategies for the top live dealer games in 2024/2025.
              {isExpanded && (
                <motion.span 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                  className="block mt-4"
                >
                  Our expert team provides unparalleled insights into live blackjack, roulette, baccarat and more. 
                  Stay ahead with real-time updates on new game releases, casino promotions, and winning strategies.
                </motion.span>
              )}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleContent}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
              >
                {isExpanded ? 'Show Less' : 'Explore More'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-all"
              >
                <Link to="/liveCasino">
                Join Now
                </Link>
              </motion.button>
            </div>
          </motion.div>

          {/* Image with floating animation */}
          <motion.div 
            className="md:w-1/3 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Live Casino"
                className="w-full max-w-md rounded-xl shadow-2xl border-4 border-yellow-500/30"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full filter blur-xl opacity-40 z-0"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600 rounded-full filter blur-xl opacity-30 z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
      <style>
  {`
    @keyframes float-slow {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
    }
    @keyframes float-medium {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-30px) translateX(-15px); }
    }
    @keyframes float-fast {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-15px) translateX(5px); }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
    .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
    .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
  `}
</style>
    </motion.section>
  );
}