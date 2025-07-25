const API_URL = import.meta.env.VITE_API_URL;
export const ITEMS_PER_PAGE = 10;
export const BLOG_API_URL=`${API_URL}/api/blogs`;
export const CASINO_API_URL=`${API_URL}/api/casinos`;
export const GAMES_API_URL=`${API_URL}/api/games`;
export const REVIEW_API_URL=`${API_URL}/api/reviews`;
export const POPUP_API_URL=`${API_URL}/api/popup`;
export const FAQ_API_URL=`${API_URL}/api/faq`;
export const PROMOTION_API_URL=`${API_URL}/api/promotions`;
export const SUBSCRIBER_API_URL=`${API_URL}/api/subscriber`;

export const formatTimestamp = (timestamp) => {
    const now = new Date();
    const reviewTime = new Date(timestamp);
    const diffInMs = now - reviewTime;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };
export const carouselData = [
  {
    id: 1,
    name: "Martin Casino",
    image: "/assets/2cc6ef17-188e-4790-8c1f-45a8305272eb",
    offer: "₹30,000 + 350 Free Spins",
    link: "https://livecasinorank.com/goto/martin-casino",
  },
  {
    id: 2,
    name: "Osh Casino",
    image: "/assets/osh-casino.png",
    offer: "₹20,000 + 200 Free Spins",
    link: "https://livecasinorank.com/goto/osh-casino",
  },
  // Add more casinos...
];

  const promotions = [
    {
      id: 1,
      title: "MEGA JACKPOT BONUS",
      bonus: "200% UP TO $1000",
      description: "Claim your massive welcome package with our exclusive Mega Jackpot Bonus. Perfect for high rollers looking to maximize their playtime!",
      image: "https://a.omappapi.com/users/4e11541cdfb6/images/ea4cf2e1025b1735596138-Stake-Casino.png"
    },
    {
      id: 2,
      title: "FREE SPINS FRENZY",
      bonus: "100 FREE SPINS",
      description: "Spin your way to big wins with our Free Spins Frenzy offer. No deposit required - just sign up and start spinning!",
      image: "https://a.omappapi.com/users/4e11541cdfb6/images/62802eb4915d1703236121-begambleaware-1.png"
    },
    {
      id: 3,
      title: "CASHBACK SPECIAL",
      bonus: "20% WEEKLY CASHBACK",
      description: "Get money back on your losses every week with our Cashback Special. The more you play, the more you get back!",
      image: "https://a.omappapi.com/users/4e11541cdfb6/images/07d62a25dfa41703236378-Icon-star.png"
    }
  ];
