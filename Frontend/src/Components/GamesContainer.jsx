import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const GamesContainer = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${API_URL}/api/games/${id}`, { id });
  const { data:games } = useFetch(`${API_URL}/api/games`);
  const { data:blogs } = useFetch(`${API_URL}/api/blogs`);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) return <div className="text-center py-20">Loading game details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading game: {error.message}</div>;
  if (!data?.games) return <div className="text-center py-20">Game not found</div>;

  const { gameName, description, image, dealer, company, title, minBet, maxBet, rtp,gameLink } = data.games;

  
  // Enhanced content sections
  const gameFeatures = [
    { icon: '🎰', title: "Multipliers", description: "Up to 20,000x your bet" },
    { icon: '🎲', title: "Bonus Rounds", description: "4 unique interactive bonus games" },
    { icon: '💰', title: "RTP", description: `${rtp || "96.5%"} average return` },
    { icon: '🎯', title: "Volatility", description: "High (big win potential)" }
  ];

  const bonusRounds = [
    {
      icon: "https://example.com/coin-flip.png",
      title: "Coin Flip",
      content: "If the wheel lands on one of the four Coin Flip spots the dealer will pause the action...",
      multiplier: "Up to 50x"
    },
    {
      icon: "https://example.com/pachinko.png",
      title: "Pachinko",
      content: "When the wheel lands on one of the two Pachinko spots, the dealer moves over to the special Pachinko wall...",
      multiplier: "Up to 250x"
    },
    {
      icon: "https://example.com/cash-hunt.png",
      title: "Cash Hunt",
      content: "Landing on one of the two Cash Hunt spots launches a special mini-game for all winning players...",
      multiplier: "Up to 2,500x"
    },
    {
      icon: "https://example.com/crazy-time.png",
      title: "Crazy Time",
      content: "There's only one Crazy Time spot on the wheel, and when it hits the dealer will launch the special Crazy Time wheel...",
      multiplier: "Up to 20,000x"
    }
  ];

  const strategyTips = [
    {
      title: "Coverage Strategy",
      content: "Bet only on the numbers to allow you to easily cover 45 of the 54 spots...",
      effectiveness: "Medium"
    },
    {
      title: "Bonus Focus",
      content: "Only bet on the four possible bonus rounds – 9 of the 54 spots on the wheel...",
      effectiveness: "High Risk"
    },
    {
      title: "Roulette System",
      content: "Adopt a roulette strategy like the D'Alembert or Fibonacci progression...",
      effectiveness: "Variable"
    },
    {
      title: "Jackpot Hunting",
      content: "Bet exclusively on Crazy Time. This means you only cover 1 spot on the wheel...",
      effectiveness: "Very High Risk"
    }
  ];

  const ratings = [
    { label: "Graphics Quality", score: "5/5", stars: 5 },
    { label: "Gameplay Experience", score: "5/5", stars: 5 },
    { label: "Win Potential", score: "5/5", stars: 5 },
    { label: "Bonus Features", score: "4.5/5", stars: 4.5 },
    { label: "Mobile Compatibility", score: "4/5", stars: 4 },
    { label: "Overall Rating", score: "4.8/5", stars: 4.8, highlight: true }
  ];

  const faqs = [
    {
      question: "What is the maximum payout in this game?",
      answer: "The maximum payout is 20,000x your bet when hitting the Crazy Time bonus round."
    },
    {
      question: "Can I play this game on mobile?",
      answer: "Yes, the game is fully optimized for all mobile devices and works perfectly on both iOS and Android."
    },
    {
      question: "How often do bonus rounds trigger?",
      answer: "Bonus rounds trigger approximately every 5-7 spins on average, but this can vary."
    },
    {
      question: "Is there a demo version available?",
      answer: "Yes, most casinos offer a free play demo mode so you can try the game before betting real money."
    }
  ];

  const handleTabClick = (tab) => {
  setActiveTab(tab);
  const element = document.getElementById(tab);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section with Game Preview */}
      <section className="relative bg-gradient-to-b from-purple-900 to-black text-white pb-20">
        <div className="container mx-auto px-4 pt-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded mr-2">LIVE</span>
                <span className="text-sm">TOP RATED GAME</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{gameName}</h1>
              <p className="text-lg mb-6 text-gray-300">{description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                    <span className="text-xl">🎮</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Provider</p>
                    <p className="font-semibold">{company}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center mr-2">
                    <span className="text-xl">👨‍💼</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Host</p>
                    <p className="font-semibold">{dealer}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                 <a
                        href={gameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
                  PLAY FOR REAL MONEY
                </button>
                      </a>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full">RTP: {rtp || "96.5%"}</span>
                <span>Min Bet: ${minBet || "1.00"}</span>
                <span>Max Bet: ${maxBet || "100.00"}</span>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-500">
                <img 
                  src={image} 
                  alt={gameName} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Navigation Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex overflow-x-auto">
            {['Overview', 'Bonus Rounds', 'Strategies', 'Reviews', 'FAQ'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
                onClick={() => handleTabClick(tab.toLowerCase().replace(' ', '-'))}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Game Features */}
        <section id="overview" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Players Love {gameName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blogs */}
         <section id="games" className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center">Exciting Blog</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {blogs?.blogs?.slice(0, 3).map((blog, index) => (
      <div
        key={index}
        className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col"
      >
        <div className="h-48 w-full">
          <img
            src={blog.image}
            alt={blog._id}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <h5 className="text-xl font-bold mb-3">{blog.title}</h5>
          <div className="mt-auto text-yellow-500">
            <Link
              to="/blogs"
              className=" font-semibold hover:underline"
            >
              View all blogs
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
        

        {/* Strategy Section */}
        <section id="strategies" className="mb-16 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Winning Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategyTips.map((strategy, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{strategy.title}</h3>
                  <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                    {strategy.effectiveness}
                  </span>
                </div>
                <p className="text-gray-600">{strategy.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Expert Tip</h3>
            <p className="text-gray-600 mb-4">
              "The key to success in {gameName} is managing your bankroll effectively. 
              Set limits before you start playing and stick to them, regardless of whether 
              you're winning or losing."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <p className="font-semibold">John Casino</p>
                <p className="text-sm text-gray-500">Professional Game Strategist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings Section */}
        <section id="reviews" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{gameName} Ratings</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <tbody>
                {ratings.map((rating, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${rating.highlight ? 'font-bold' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{rating.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(rating.stars) ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        {rating.stars % 1 !== 0 && (
                          <svg
                            className="w-5 h-5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <defs>
                              <linearGradient id={`partialFill-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset={`${(rating.stars % 1) * 100}%`} stopColor="currentColor" />
                                <stop offset={`${(rating.stars % 1) * 100}%`} stopColor="#D1D5DB" />
                              </linearGradient>
                            </defs>
                            <path
                              fill={`url(#partialFill-${index})`}
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-800">
                      {rating.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium text-gray-800 hover:text-yellow-500 focus:outline-none flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Similar Games Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {games?.games?.slice(0,4).map((game, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="relative h-40 bg-purple-800">
                  <img src={game.image} alt={game.gameName} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h6 className="font-bold text-lg mb-1">{game.gameName}</h6>
                  <p className="text-gray-600 text-sm mb-3">by {game.dealer}</p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition">
                    <a
                        href={game.gameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >Play Now</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play {gameName}?</h2>
          <p className="text-xl mb-6">Join now and get up to $1000 welcome bonus!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a
                        href={gameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >
            <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
              SIGN UP & PLAY
            </button>
                      </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamesContainer;