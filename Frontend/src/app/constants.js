const API_URL = import.meta.env.VITE_API_URL;
export const ITEMS_PER_PAGE = 10;
export const BLOG_API_URL=`${API_URL}/api/blogs`;
export const CASINO_API_URL=`${API_URL}/api/casinos`;
export const GAMES_API_URL=`${API_URL}/api/games`;
export const REVIEW_API_URL=`${API_URL}/api/reviews`;
export const POPUP_API_URL=`${API_URL}/api/popup`;
export const FAQ_API_URL=`${API_URL}/api/faq`;

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
