import  { useState,useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ClaimCard from './ClaimCard';
import { MobileReviewCard, DesktopReviewCard } from "./ReviewCard";
import Games from './Games';

const LiveCasinoContainer = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const contentRef = useRef(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${API_URL}/api/casinos/${id}`, { id });
  const { data:games } = useFetch(`${API_URL}/api/games`);
  const { data:reviews } = useFetch(`${API_URL}/api/reviews`);
  const [activeTab, setActiveTab] = useState('overview');

  // Check viewport size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  if (loading) return <div className="text-center py-20">Loading casino details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading casino: {error.message}</div>;
  
  const { name, description, image,pros, dealer, company,freeSpins, activePlayers, minBet, maxBet, rtp,casinoLink,bonusLink } = data.casinos;
  const filteredReviews = reviews.filter((review) => review.review.casino.toLowerCase() === name.toLowerCase());
  // console.log(casinoLink);
  

    const missingData = {
    awards: ["Players' Choice Casino 2024"],
    rating: 8.1,
    playerRating: 8.7,
    cons: [
      "Poor choice of responsible gambling tools"
    ],
    features: [
      { icon: "🎰", title: "Game Variety", value: "5000+" },
      { icon: "💳", title: "Payment Methods", value: "30+" },
      { icon: "📱", title: "Mobile Friendly", value: "Yes" },
      { icon: "🛡️", title: "Licenses", value: "Curacao" }
    ],
    faqs: [
      {
        question: "Is Wazbee Casino safe and legit?",
        answer: "Yes, Wazbee Casino holds a license from the Government of Curacao and uses SSL encryption to protect player data."
      },
      {
        question: "What is the minimum deposit at Wazbee Casino?",
        answer: "The minimum deposit is $20 for most payment methods."
      },
      {
        question: "How long do withdrawals take at Wazbee Casino?",
        answer: "Withdrawal times vary by method but typically take 1-3 business days for processing."
      }
    ],
    bonuses: [
      {
        title: "Welcome Bonus",
        value: "100% up to $500 + 100 free spins",
        code: "WELCOME100"
      },
      {
        title: "Weekly Reload",
        value: "50% up to $200",
        code: "RELOAD50"
      }
    ],
    reviewText: `Wazbee Casino has quickly become a favorite among players due to 
    its extensive game library featuring titles from top providers like NetEnt, Microgaming, 
    and Play'n GO. The casino offers a seamless mobile experience with both instant play and dedicated 
    apps available. Banking options are plentiful, with support for credit cards, e-wallets, and cryptocurrencies. 
    Withdrawal times are competitive, typically processed within 24 hours for verified accounts.`
  }

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
    }
  ];
  
  return (
 <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (8/12 width) */}
          <div className="w-full lg:w-8/12" ref={contentRef}>
            {/* Header Section */}
            <section className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
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
                <span className="text-lg text-blue-100 mb-1 text-center md:text-sm lg:text-xs">WELCOME BONUS</span>
                <span className="text-lg font-bold text-white mb-1 md:text-xs">{casino.bonus}</span>
              </div>
            </div>

            {/* Free Spins Card */}
            <div className="md:col-span-2">
              <div className="h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow-md flex flex-col justify-center items-center">
                <span className="text-xl text-center text-purple-100 md:text-sm">FREE SPINS</span>
                <span className="text-2xl font-bold text-white mb-1 md:text-lg">{casino.freeSpins}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2">
              <div className="flex flex-col space-y-2 h-full justify-center md:items-start">
                <a 
                  href={casino.link} 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white 
                  font-bold py-3 px-3 rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-md"
                  rel="nofollow noopener" 
                  target="_blank"
                >
                  Play Now
                </a>
                <a 
                  href="#review" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black font-bold py-3 px-3 rounded-lg text-center transition-all duration-300 md:text-sm md:"
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

                  {/* Author Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://www.askgamblers.com/uploads/user_avatar/user_avatar/2f/04/4e/f4a8af9c52f554a3b7fb5f2ae334615569/upload-1673529481594.jpg"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <p className="text-xs text-gray-500">Reviewed by</p>
                        <Link to="#" className="text-gray-800 font-medium hover:text-blue-600">{dealer}</Link>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-600">
                      We objectively review and rate online casinos, thanks to our CasinoRank algorithm built on over a decade's experience working with casinos and players alike. <strong>Get the truth. Then play.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pros & Cons Section */}
            <section className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <strong className="block text-lg font-semibold mb-3 text-green-600">
                    What we like
                  </strong>
                  <ul className="space-y-2">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex justify-center items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <strong className="block text-lg font-semibold mb-3 text-red-600">
                    What we don't like
                  </strong>
                  <ul className="space-y-2">
                    {missingData.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Main Content Tabs */}
            <section className="bg-white rounded-xl shadow-sm p-6 mt-6">
              {/* Tab Navigation */}
              <div className="flex overflow-x-auto border-b border-gray-200">
                {['Overview', 'Games', 'Bonuses', 'Reviews', 'FAQ'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleTabChange(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">About {name}</h2>
                    <p className="text-gray-700 mb-6">
                      {description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {missingData.features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl mb-2">{feature.icon}</div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-gray-600">{feature.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="prose max-w-none">
                      <h3 className="text-xl font-bold mb-4">Detailed Review</h3>
                      <p>
                        {description}
                      </p>
                      <p className="mt-4">
                        The customer support team at Wazbee Casino is available 24/7 through live chat and email,
                        with response times typically under 10 minutes for live chat inquiries. The casino also
                        offers a comprehensive FAQ section that covers most common questions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Games Tab */}
                {activeTab === 'games' && (
                  <div>
                    <div className="space-y-4">
                      {/* {demoGames?.games?.slice(0,3)?.map((game) => ( */}
                        <Games data={games?.games?.slice(0,3)}/>
                      {/* ))} */}
                    </div>
                  </div>
                )}

                {/* Bonuses Tab */}
                {activeTab === 'bonuses' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Casino Bonuses</h2>
                    <div className="space-y-4">
                      {missingData.bonuses.map((bonus, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{bonus.title}</h3>
                              <p className="text-gray-600">{bonus.value}</p>
                            </div>
                            <div className="bg-gray-100 px-3 py-1 rounded">
                              <span className="font-mono text-sm">{bonus.code}</span>
                            </div>
                          </div>
                          <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">
                            Show Terms & Conditions
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                    {filteredReviews.length > 0 ? (
                      filteredReviews.map((review, index) =>
                        isMobileView ? (
                          <MobileReviewCard key={review._id || index} review={review} index={index} />
                        ) : (
                          <DesktopReviewCard key={review._id || index} review={review} index={index} />
                          )
                      )
                    ) : (
                      <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <p className="text-gray-500 text-lg">No casinos found matching your search</p>
                      </div>
                    )}
                  </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {missingData.faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            className="w-full px-4 py-3 text-left font-medium flex justify-between items-center"
                            onClick={() => toggleFaq(index)}
                          >
                            <span>{faq.question}</span>
                            <svg
                              className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {expandedFaq === index && (
                            <div className="px-4 pb-4 text-gray-600">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Sidebar (4/12 width) - Fixed Bonus Card (Desktop) */}
          {
          !isMobileView && 
          (
            <div className="hidden lg:block lg:w-4/12 relative">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Bonus</h3>
                    <p className="text-gray-600">Sign up through our link to claim</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-center mb-6">
                    <div className="text-white text-4xl font-bold mb-1">$500</div>
                    <div className="text-purple-100 font-medium">{freeSpins} Free Spins</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Minimum deposit: $20</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Wagering requirement: 35x</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                    <Link to={bonusLink} target='1'>
                    Claim Bonus Now
                    </Link>
                  </button>

                  <div className="mt-4 text-center text-xs text-gray-500">
                    <p>18+ only. Terms and conditions apply.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Claim Card (fixed at bottom) */}
      {isMobileView && <ClaimCard />}
    </div>
  );
};

export default LiveCasinoContainer;





//     <div className="bg-gray-100 min-h-screen">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-b from-blue-900 to-black text-white pb-20">
//         <div className="container mx-auto px-4 pt-12">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 mb-10 md:mb-0">
//               <div className="flex items-center mb-4">
//                 <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">LIVE</span>
//                 <span className="text-sm">TOP RATED LIVE CASINO</span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
//               <p className="text-lg mb-6 text-gray-300">{description}</p>
              
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
//                     <span className="text-xl">🏢</span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Provider</p>
//                     <p className="font-semibold">{company}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
//                     <span className="text-xl">👨‍💼</span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Dealers</p>
//                     <p className="font-semibold">{dealer}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-2">
//                     <span className="text-xl">👥</span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Players</p>
//                     <p className="font-semibold">{activePlayers}+ online</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-4 mb-8">
//                 <a
//                         href={casinoLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white px-4 py-2 rounded-lg transition"
//                       >
//                 <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
//                   JOIN & PLAY NOW
//                 </button>
//                       </a>
//               </div>

//               <div className="flex items-center space-x-4 text-sm">
//                 <span className="bg-green-500 text-white px-3 py-1 rounded-full">RTP: {rtp || "96.5%"}</span>
//                 <span>Min Bet: ${minBet || "1.00"}</span>
//                 <span>Max Bet: ${maxBet || "100,000.00"}</span>
//               </div>
//             </div>

//             <div className="md:w-1/2 relative">
//               <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-500">
//                 <img 
//                   src={image} 
//                   alt={name} 
//                   className="w-full h-auto"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Game Navigation Tabs */}
//       <div className="container mx-auto px-4 mt-8">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="flex overflow-x-auto">
//             {['Overview', 'Games', 'Bonuses', 'Strategies', 'Reviews', 'FAQ'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}
//                 onClick={() => handleTabClick(tab.toLowerCase().replace(' ', '-'))}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12">
//         {/* Casino Features */}
//         <section id="overview" className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Why Players Love {name}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {casinoFeatures.map((feature, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Game Types Section */}
//         <section id="games" className="mb-16">
//   <h2 className="text-3xl font-bold mb-8 text-center">Exciting Blog</h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {blogs?.blogs?.slice(0,3).map((blog, index) => (
//       <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
//         <div className="h-48 w-full">
//           <img
//             src={blog.image}
//             alt={blog._id}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="p-6">
//           <h5 className="text-xl font-bold mb-3">{blog.title}</h5>
//           <Link
//             to="/blogs"
//             className="text-yellow-500 font-semibold hover:underline"
//           >
//             View all blogs
//           </Link>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>

//         {/* Live Casino Experience Section */}
//         <section id="bonuses" className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
//           <h2 className="text-3xl font-bold mb-8 text-center">The Live Casino Experience</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Real-Time Gaming</h3>
//               <p className="text-gray-600 mb-6">
//                 Our live casino brings the excitement of a real casino floor directly to your device. 
//                 Interact with professional dealers and other players in real-time through our HD video streams.
//               </p>
//               <img 
//                 src="https://example.com/live-dealers.jpg" 
//                 alt="Live dealers" 
//                 className="rounded-lg shadow-md"
//               />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Key Features</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-600">HD streaming with multiple camera angles</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-600">Professional dealers available 24/7</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-600">Live chat with dealers and players</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="bg-blue-100 p-2 rounded-full mr-4">
//                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-gray-600">Mobile optimized for play anywhere</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* Strategy Section */}
//         <section id="strategies" className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
//           <h2 className="text-3xl font-bold mb-8 text-center">Live Casino Strategies</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {strategyTips.map((strategy, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-xl font-bold">{strategy.title}</h3>
//                   <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
//                     {strategy.effectiveness}
//                   </span>
//                 </div>
//                 <p className="text-gray-600">{strategy.content}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold mb-3">Expert Tip</h3>
//             <p className="text-gray-600 mb-4">
//               "The key to success in live casinos is discipline. Set time and money limits before you start playing, 
//               and don't chase losses. Remember that live games are about entertainment first and foremost."
//             </p>
//             <div className="flex items-center">
//               <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
//               <div>
//                 <p className="font-semibold">Sarah Johnson</p>
//                 <p className="text-sm text-gray-500">Professional Casino Strategist</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Ratings Section */}
//         <section id="reviews"className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">{name} Ratings</h2>
//           <div className="bg-white rounded-xl shadow-md overflow-hidden">
//             <table className="w-full">
//               <tbody>
//                 {ratings.map((rating, index) => (
//                   <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${rating.highlight ? 'font-bold' : ''}`}>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-800">{rating.label}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <svg
//                             key={i}
//                             className={`w-5 h-5 ${i < Math.floor(rating.stars) ? 'text-yellow-500' : 'text-gray-300'}`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                         {rating.stars % 1 !== 0 && (
//                           <svg
//                             className="w-5 h-5 text-yellow-500"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <defs>
//                               <linearGradient id={`partialFill-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
//                                 <stop offset={`${(rating.stars % 1) * 100}%`} stopColor="currentColor" />
//                                 <stop offset={`${(rating.stars % 1) * 100}%`} stopColor="#D1D5DB" />
//                               </linearGradient>
//                             </defs>
//                             <path
//                               fill={`url(#partialFill-${index})`}
//                               d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//                             />
//                           </svg>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-800">
//                       {rating.score}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <button
//                   className="w-full px-6 py-4 text-left font-medium text-gray-800 hover:text-yellow-500 focus:outline-none flex justify-between items-center"
//                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                 >
//                   <span>{faq.question}</span>
//                   <svg
//                     className={`w-5 h-5 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {openFaq === index && (
//                   <div className="px-6 pb-4 text-gray-600">
//                     <p>{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Similar Casinos Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {casinos?.casinos?.slice(0,4).map((casino, index) => (
//               <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
//                 <div className="relative h-40 bg-blue-800">
//                   <img src={casino.image} alt={casino.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-1">{casino.name}</h3>
//                   <p className="text-gray-600 text-sm mb-3">by {casino.dealer}</p>
                  
//                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
//                     <a
//                         href={casinoLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white px-4 py-2 rounded-lg transition"
//                       >Visit Casino
//                       </a>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">Ready to Play at {name}?</h2>
//           <p className="text-xl mb-6">Sign up now and get up to $1000 welcome bonus + 50 free spins!</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <a
//                         href={bonusLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white px-4 py-2 rounded-lg transition"
//                       >
//             <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
//               JOIN NOW
//             </button>
//                       </a>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default LiveCasinoContainer;




// import { useState, useEffect, useRef } from 'react';
// import { Link,useParams } from 'react-router-dom';
// import ClaimCard from './ClaimCard';
// import { MobileReviewCard, DesktopReviewCard } from "./ReviewCard";
// import Games from './Games';
// import useFetch from "../hooks/useFetch"

// const LiveCasinoContainer = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedFaq, setExpandedFaq] = useState(null);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const contentRef = useRef(null);
//   const { data:casinoData, loading, error } = useFetch(`${API_URL}/api/casinos/${id}`, { id });
//   const { data:blogs } = useFetch(`${API_URL}/api/blogs`);
//   const { data:games } = useFetch(`${API_URL}/api/games`);
//   const { data:reviews } = useFetch(`${API_URL}/api/reviews/${id}`, { id });
//     const { name, description, image, dealer, company, activePlayers, minBet, maxBet, rtp,casinoLink,bonusLink } = casinoData?.casinos;
//     console.log(name);
    
//   // Casino data
//   // const casinoData = {
//   //   name: "Wazbee Casino",
//   //   logo: "https://www.askgamblers.com/uploads/original/casinoreview_logo/5e/70/9d/c5acd60aa0fc5020cdb73338ff432eeaf7/wazbee-casino-logo-update-2024.png",
//   //   rating: 8.1,
//   //   playerRating: 8.7,
//   //   reviewCount: 37,
//   //   responseTime: "2 days avg.",
//   //   awards: ["Players' Choice Casino 2024"],
//   //   pros: [
//   //     "High withdrawal limits",
//   //     "Fast withdrawals",
//   //     "24/7 live chat"
//   //   ],
//   //   cons: [
//   //     "Poor choice of responsible gambling tools"
//   //   ],
//   //   features: [
//   //     { icon: "🎰", title: "Game Variety", value: "5000+" },
//   //     { icon: "💳", title: "Payment Methods", value: "30+" },
//   //     { icon: "📱", title: "Mobile Friendly", value: "Yes" },
//   //     { icon: "🛡️", title: "Licenses", value: "Curacao" }
//   //   ],
//   //   faqs: [
//   //     {
//   //       question: "Is Wazbee Casino safe and legit?",
//   //       answer: "Yes, Wazbee Casino holds a license from the Government of Curacao and uses SSL encryption to protect player data."
//   //     },
//   //     {
//   //       question: "What is the minimum deposit at Wazbee Casino?",
//   //       answer: "The minimum deposit is $20 for most payment methods."
//   //     },
//   //     {
//   //       question: "How long do withdrawals take at Wazbee Casino?",
//   //       answer: "Withdrawal times vary by method but typically take 1-3 business days for processing."
//   //     }
//   //   ],
//   //   bonuses: [
//   //     {
//   //       title: "Welcome Bonus",
//   //       value: "100% up to $500 + 100 free spins",
//   //       code: "WELCOME100"
//   //     },
//   //     {
//   //       title: "Weekly Reload",
//   //       value: "50% up to $200",
//   //       code: "RELOAD50"
//   //     }
//   //   ],
//   //   reviewText: "Wazbee Casino has quickly become a favorite among players due to its extensive game library featuring titles from top providers like NetEnt, Microgaming, and Play'n GO. The casino offers a seamless mobile experience with both instant play and dedicated apps available. Banking options are plentiful, with support for credit cards, e-wallets, and cryptocurrencies. Withdrawal times are competitive, typically processed within 24 hours for verified accounts."
//   // };
//   const missingData = {
//     features: [
//       { icon: "🎰", title: "Game Variety", value: "5000+" },
//       { icon: "💳", title: "Payment Methods", value: "30+" },
//       { icon: "📱", title: "Mobile Friendly", value: "Yes" },
//       { icon: "🛡️", title: "Licenses", value: "Curacao" }
//     ],
//     faqs: [
//       {
//         question: "Is Wazbee Casino safe and legit?",
//         answer: "Yes, Wazbee Casino holds a license from the Government of Curacao and uses SSL encryption to protect player data."
//       },
//       {
//         question: "What is the minimum deposit at Wazbee Casino?",
//         answer: "The minimum deposit is $20 for most payment methods."
//       },
//       {
//         question: "How long do withdrawals take at Wazbee Casino?",
//         answer: "Withdrawal times vary by method but typically take 1-3 business days for processing."
//       }
//     ],
//     bonuses: [
//       {
//         title: "Welcome Bonus",
//         value: "100% up to $500 + 100 free spins",
//         code: "WELCOME100"
//       },
//       {
//         title: "Weekly Reload",
//         value: "50% up to $200",
//         code: "RELOAD50"
//       }
//     ],
//     reviewText: `Wazbee Casino has quickly become a favorite among players due to 
//     its extensive game library featuring titles from top providers like NetEnt, Microgaming, 
//     and Play'n GO. The casino offers a seamless mobile experience with both instant play and dedicated 
//     apps available. Banking options are plentiful, with support for credit cards, e-wallets, and cryptocurrencies. 
//     Withdrawal times are competitive, typically processed within 24 hours for verified accounts.`
//   }

//   // Check viewport size
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobileView(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const toggleFaq = (index) => {
//     setExpandedFaq(expandedFaq === index ? null : index);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content (8/12 width) */}
//           <div className="w-full lg:w-8/12" ref={contentRef}>
//             {/* Header Section */}
//             <section className="bg-white rounded-xl shadow-sm p-8">
//               <div className="flex flex-col md:flex-row gap-8">
//                 <div className="flex-1">
//                   <div className="flex items-start gap-6">
//                     <div className="flex-shrink-0 relative">
//                       <div className="absolute -inset-2 bg-blue-100 rounded-xl -z-10"></div>
//                       <img
//                         src={casinoData.logo}
//                         alt={casinoData.name}
//                         className="w-20 h-20 object-contain rounded-lg"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="flex-1">

//                       {/* Rating Circles */}
//                       <div className="flex flex-wrap gap-6 mb-6">
//                         <div className="flex items-center gap-4">
//                           <div className="relative w-16 h-16">
//                             <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
//                             <div
//                               className="absolute inset-0 rounded-full border-4 border-blue-500 origin-center"
//                               style={{
//                                 clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
//                                 transform: `rotate(${(casinoData.rating / 10) * 180}deg)`
//                               }}
//                             ></div>
//                             <span className="absolute inset-0 flex items-center justify-center font-bold text-blue-600">
//                               {casinoData.rating}
//                             </span>
//                           </div>
//                           <div>
//                             <strong className="block text-sm font-semibold">CasinoRank</strong>
//                             <span className="text-gray-500 text-sm">Very Good</span>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                           <div className="relative w-16 h-16">
//                             <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
//                             <div
//                               className="absolute inset-0 rounded-full border-4 border-green-500 origin-center"
//                               style={{
//                                 clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
//                                 transform: `rotate(${(casinoData.playerRating / 10) * 180}deg)`
//                               }}
//                             ></div>
//                             <span className="absolute inset-0 flex items-center justify-center font-bold text-green-600">
//                               {casinoData.playerRating}
//                             </span>
//                           </div>
//                           <div>
//                             <strong className="block text-sm font-semibold">Player rating</strong>
//                             <Link to="#reviews" className="text-gray-500 text-sm underline hover:text-green-600">
//                               {casinoData.reviewCount} reviews
//                             </Link>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                           <div className="relative w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
//                             <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                           </div>
//                           <div>
//                             <strong className="block text-sm font-semibold">Complaint response</strong>
//                             <Link to="#complaints" className="text-gray-500 text-sm underline hover:text-blue-600">
//                               {casinoData.responseTime}
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Author Info */}
//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src="https://www.askgamblers.com/uploads/user_avatar/user_avatar/2f/04/4e/f4a8af9c52f554a3b7fb5f2ae334615569/upload-1673529481594.jpg"
//                         alt="Reviewer"
//                         className="w-10 h-10 rounded-full border-2 border-white shadow-md"
//                       />
//                       <div>
//                         <p className="text-xs text-gray-500">Reviewed by</p>
//                         <Link to="#" className="text-gray-800 font-medium hover:text-blue-600">Irena Ducic</Link>
//                       </div>
//                     </div>
//                     <p className="mt-4 text-gray-600">
//                       We objectively review and rate online casinos, thanks to our CasinoRank algorithm built on over a decade's experience working with casinos and players alike. <strong>Get the truth. Then play.</strong>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Pros & Cons Section */}
//             <section className="bg-white rounded-xl shadow-sm p-6 mt-6">
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="border border-gray-200 rounded-lg p-4">
//                   <strong className="block text-lg font-semibold mb-3 text-green-600">
//                     What we like
//                   </strong>
//                   <ul className="space-y-2">
//                     {casinoData.pros.map((pro, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <span className="text-green-500">✓</span>
//                         <span>{pro}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="border border-gray-200 rounded-lg p-4">
//                   <strong className="block text-lg font-semibold mb-3 text-red-600">
//                     What we don't like
//                   </strong>
//                   <ul className="space-y-2">
//                     {casinoData.cons.map((con, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <span className="text-red-500">✗</span>
//                         <span>{con}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </section>

//             {/* Main Content Tabs */}
//             <section className="bg-white rounded-xl shadow-sm p-6 mt-6">
//               {/* Tab Navigation */}
//               <div className="flex overflow-x-auto border-b border-gray-200">
//                 {['Overview', 'Games', 'Bonuses', 'Reviews', 'FAQ'].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
//                     onClick={() => handleTabChange(tab.toLowerCase())}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div className="mt-8">
//                 {/* Overview Tab */}
//                 {activeTab === 'overview' && (
//                   <div>
//                     <h2 className="text-2xl font-bold mb-6">About {casinoData.name}</h2>
//                     <p className="text-gray-700 mb-6">
//                       {casinoData.reviewText}
//                     </p>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                       {casinoData.features.map((feature, index) => (
//                         <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
//                           <div className="text-2xl mb-2">{feature.icon}</div>
//                           <h3 className="font-semibold">{feature.title}</h3>
//                           <p className="text-gray-600">{feature.value}</p>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="prose max-w-none">
//                       <h3 className="text-xl font-bold mb-4">Detailed Review</h3>
//                       <p>
//                         {casinoData.reviewText}
//                       </p>
//                       <p className="mt-4">
//                         The customer support team at Wazbee Casino is available 24/7 through live chat and email,
//                         with response times typically under 10 minutes for live chat inquiries. The casino also
//                         offers a comprehensive FAQ section that covers most common questions.
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Games Tab */}
//                 {activeTab === 'games' && (
//                   <div>
//                     <div className="space-y-4">
//                       {/* {demoGames?.games?.slice(0,3)?.map((game) => ( */}
//                         <Games data={demoGames?.games?.slice(0,3)}/>
//                       {/* ))} */}
//                     </div>
//                   </div>
//                 )}

//                 {/* Bonuses Tab */}
//                 {activeTab === 'bonuses' && (
//                   <div>
//                     <h2 className="text-2xl font-bold mb-6">Casino Bonuses</h2>
//                     <div className="space-y-4">
//                       {casinoData.bonuses.map((bonus, index) => (
//                         <div key={index} className="border border-gray-200 rounded-lg p-4">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="font-bold text-lg">{bonus.title}</h3>
//                               <p className="text-gray-600">{bonus.value}</p>
//                             </div>
//                             <div className="bg-gray-100 px-3 py-1 rounded">
//                               <span className="font-mono text-sm">{bonus.code}</span>
//                             </div>
//                           </div>
//                           <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">
//                             Show Terms & Conditions
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Review Tab */}
//                 {activeTab === 'reviews' && (
//                   <div className="space-y-4">
//                     <h2 className="text-2xl font-bold mb-6">Reviews</h2>
//                     {reviews.length > 0 ? (
//                       reviews.map((review, index) =>
//                         isMobileView ? (
//                           <MobileReviewCard key={review._id || index} review={review} index={index} />
//                         ) : (
//                           <DesktopReviewCard key={review._id || index} review={review} index={index} />
//                         )
//                       )
//                     ) : (
//                       <div className="bg-white p-8 rounded-xl shadow-md text-center">
//                         <p className="text-gray-500 text-lg">No casinos found matching your search</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* FAQ Tab */}
//                 {activeTab === 'faq' && (
//                   <div>
//                     <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
//                     <div className="space-y-4">
//                       {casinoData.faqs.map((faq, index) => (
//                         <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//                           <button
//                             className="w-full px-4 py-3 text-left font-medium flex justify-between items-center"
//                             onClick={() => toggleFaq(index)}
//                           >
//                             <span>{faq.question}</span>
//                             <svg
//                               className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`}
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </button>
//                           {expandedFaq === index && (
//                             <div className="px-4 pb-4 text-gray-600">
//                               <p>{faq.answer}</p>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Right Sidebar (4/12 width) - Fixed Bonus Card (Desktop) */}
//           {!isMobileView && (
//             <div className="hidden lg:block lg:w-4/12 relative">
//               <div className="sticky top-4">
//                 <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//                   <div className="text-center mb-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Bonus</h3>
//                     <p className="text-gray-600">Sign up through our link to claim</p>
//                   </div>

//                   <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-center mb-6">
//                     <div className="text-white text-4xl font-bold mb-1">$500</div>
//                     <div className="text-purple-100 font-medium">+ 100 Free Spins</div>
//                   </div>

//                   <div className="space-y-4 mb-6">
//                     <div className="flex items-center gap-3">
//                       <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-gray-700">Minimum deposit: $20</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-gray-700">Wagering requirement: 35x</span>
//                     </div>
//                   </div>

//                   <button className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
//                     Claim Bonus Now
//                   </button>

//                   <div className="mt-4 text-center text-xs text-gray-500">
//                     <p>18+ only. Terms and conditions apply.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Claim Card (fixed at bottom) */}
//       {isMobileView && <ClaimCard />}
//     </div>
//   );
// };

// export default LiveCasinoContainer;