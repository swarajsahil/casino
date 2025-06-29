import  { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const LiveCasinoContainer = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${API_URL}/api/casinos/${id}`, { id });
  const { data:casinos } = useFetch(`${API_URL}/api/casinos`);
  const { data:blogs } = useFetch(`${API_URL}/api/blogs`);
  
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) return <div className="text-center py-20">Loading casino details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading casino: {error.message}</div>;
  if (!data?.casinos) return <div className="text-center py-20">Casino not found</div>;

  const { name, description, image, dealer, company, activePlayers, minBet, maxBet, rtp,casinoLink,bonusLink } = data.casinos;
  
 
  
  // Enhanced content sections
  const casinoFeatures = [
    { icon: '🎰', title: "Live Dealers", description: "Professional dealers streaming in real-time" },
    { icon: '🎲', title: "Game Variety", description: "50+ live casino games available" },
    { icon: '💰', title: "RTP", description: `${rtp || "96.5%"} average return` },
    { icon: '🎯', title: "Bet Limits", description: `$${minBet || "1"} - $${maxBet || "100,000"}` }
  ];

  const gameTypes = [
    {
      icon: "https://example.com/blackjack.png",
      title: "Live Blackjack",
      content: "Classic 21 with professional dealers and multiple table options",
      variants: 12
    },
    {
      icon: "https://example.com/roulette.png",
      title: "Live Roulette",
      content: "European, American and French roulette with immersive gameplay",
      variants: 8
    },
    {
      icon: "https://example.com/baccarat.png",
      title: "Live Baccarat",
      content: "Elegant game with high betting limits and VIP tables",
      variants: 5
    },
    {
      icon: "https://example.com/gameshow.png",
      title: "Game Shows",
      content: "Crazy Time, Monopoly Live, and other exciting game shows",
      variants: 7
    }
  ];

  const strategyTips = [
    {
      title: "Bankroll Management",
      content: "Set strict limits before playing and stick to them",
      effectiveness: "Essential"
    },
    {
      title: "Table Selection",
      content: "Choose tables with betting limits matching your bankroll",
      effectiveness: "High"
    },
    {
      title: "Basic Strategy",
      content: "Learn basic strategy for games like blackjack to reduce house edge",
      effectiveness: "Medium"
    },
    {
      title: "Bonus Utilization",
      content: "Maximize casino bonuses but read terms carefully",
      effectiveness: "Variable"
    }
  ];

  const ratings = [
    { label: "Game Variety", score: "5/5", stars: 5 },
    { label: "Stream Quality", score: "5/5", stars: 5 },
    { label: "Dealer Professionalism", score: "5/5", stars: 5 },
    { label: "Betting Limits", score: "4.5/5", stars: 4.5 },
    { label: "Mobile Experience", score: "4/5", stars: 4 },
    { label: "Overall Rating", score: "4.8/5", stars: 4.8, highlight: true }
  ];

  const faqs = [
    {
      question: "What is the minimum bet at this live casino?",
      answer: `The minimum bet is $${minBet || "1"}, but some tables may have higher minimums.`
    },
    {
      question: "Can I play on mobile devices?",
      answer: "Yes, all games are fully optimized for mobile play on both iOS and Android devices."
    },
    {
      question: "How do I know the games are fair?",
      answer: "All games use certified random number generators and are regularly audited."
    },
    {
      question: "Are there any bonuses for live casino players?",
      answer: "Yes, many casinos offer special bonuses for live casino players. Check the promotions page."
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-black text-white pb-20">
        <div className="container mx-auto px-4 pt-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">LIVE</span>
                <span className="text-sm">TOP RATED LIVE CASINO</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
              <p className="text-lg mb-6 text-gray-300">{description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
                    <span className="text-xl">🏢</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Provider</p>
                    <p className="font-semibold">{company}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
                    <span className="text-xl">👨‍💼</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Dealers</p>
                    <p className="font-semibold">{dealer}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Players</p>
                    <p className="font-semibold">{activePlayers}+ online</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                        href={casinoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
                  JOIN & PLAY NOW
                </button>
                      </a>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full">RTP: {rtp || "96.5%"}</span>
                <span>Min Bet: ${minBet || "1.00"}</span>
                <span>Max Bet: ${maxBet || "100,000.00"}</span>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-500">
                <img 
                  src={image} 
                  alt={name} 
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
            {['Overview', 'Games', 'Bonuses', 'Strategies', 'Reviews', 'FAQ'].map((tab) => (
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
        {/* Casino Features */}
        <section id="overview" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Players Love {name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {casinoFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Game Types Section */}
        <section id="games" className="mb-16">
  <h2 className="text-3xl font-bold mb-8 text-center">Exciting Blog</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {blogs?.blogs?.slice(0,3).map((blog, index) => (
      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="h-48 w-full">
          <img
            src={blog.image}
            alt={blog._id}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h5 className="text-xl font-bold mb-3">{blog.title}</h5>
          <Link
            to="/blogs"
            className="text-yellow-500 font-semibold hover:underline"
          >
            View all blogs
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* Live Casino Experience Section */}
        <section id="bonuses" className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">The Live Casino Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Real-Time Gaming</h3>
              <p className="text-gray-600 mb-6">
                Our live casino brings the excitement of a real casino floor directly to your device. 
                Interact with professional dealers and other players in real-time through our HD video streams.
              </p>
              <img 
                src="https://example.com/live-dealers.jpg" 
                alt="Live dealers" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">HD streaming with multiple camera angles</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Professional dealers available 24/7</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Live chat with dealers and players</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Mobile optimized for play anywhere</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategies" className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Live Casino Strategies</h2>
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
              "The key to success in live casinos is discipline. Set time and money limits before you start playing, 
              and don't chase losses. Remember that live games are about entertainment first and foremost."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Professional Casino Strategist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings Section */}
        <section id="reviews"className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{name} Ratings</h2>
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

        {/* Similar Casinos Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {casinos?.casinos?.slice(0,4).map((casino, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="relative h-40 bg-blue-800">
                  <img src={casino.image} alt={casino.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{casino.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {casino.dealer}</p>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
                    <a
                        href={casinoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >Visit Casino
                      </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play at {name}?</h2>
          <p className="text-xl mb-6">Sign up now and get up to $1000 welcome bonus + 50 free spins!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
                        href={bonusLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white px-4 py-2 rounded-lg transition"
                      >
            <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
              JOIN NOW
            </button>
                      </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LiveCasinoContainer;