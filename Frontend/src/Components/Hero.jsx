import { Link } from "react-router-dom"; // or "next/link" if using Next.js
import React, { useState } from "react";

const Hero = () => {
  const [showMore, setShowMore] = useState(false);

  const shortText = "Get your server in front of thousands of users — and let your community decide if it’s worth joining.";
  const longText =
    shortText +
    " Promote your Discord like never before. With real community feedback, you’ll know exactly where your server stands. No more bots or fake reviews — just genuine discovery.";

  return (
    <section className="bg-black text-white px-4 pt-20 pb-4 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* LEFT TEXT BLOCK */}
        <div className="flex-1 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            The only community-led Discord discovery platform
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-xl">
            {showMore ? longText : shortText}
          </p>
          <button
            onClick={() => setShowMore(!showMore)}
            className="focus:outline-none mb-6 text-sm font-light"
          >
            {showMore ? "Show less" : "Show more"}
          </button>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/liveCasino"
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600 transition duration-300"
            >
              JOIN NOW
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div className="hidden md:block flex-1 z-10">
          <img
            src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Discord Community Platform Preview"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Decorative BG Blur / Gradient */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-green-400 rounded-full blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-20 z-0" />
    </section>
  );
};

export default Hero;
// src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"