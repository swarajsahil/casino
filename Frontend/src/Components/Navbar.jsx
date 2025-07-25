import useFetch from "@/hooks/useFetch";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { data: games } = useFetch(`${API_URL}/api/games`);
  const { data: casino } = useFetch(`${API_URL}/api/casinos`);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const fetchSearchResults = async (query) => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    
    // Combine games and casinos data with their types
    const combinedData = [
      ...(games?.games?.map(game => ({
        id: game._id,
        name: game.gameName,
        type: 'game',
        url:`/freeGames/${game._id}`
      })) || []),
      ...(casino?.casinos?.map(casino => ({
        id: casino._id,
        name: casino.name,
        type: 'casino',
        url: `/liveCasino/${casino._id}`
      })) || [])
    ];

      // console.log(combinedData);

    return combinedData.filter(item => 
      item.name.toLowerCase().includes(lowerQuery)
    );
  };


  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-bold text-yellow-400">{part}</span>
      ) : (
        part
      )
    );
  };

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim() === '') {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await fetchSearchResults(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [games, casino]
  );

  useEffect(() => {
    if (isSearchOpen && searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, isSearchOpen, debouncedSearch]);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (searchQuery.trim() && searchResults.length > 0) {
    const firstResult = searchResults[0];
    // Use the specific URL based on type (casino or game)
    const redirectUrl = firstResult.type === 'casino' 
      ? `/liveCasino/${firstResult.id}`
      : `/freeGames/${firstResult.id}`;
    navigate(redirectUrl);
    handleSearchToggle();
  }
};

  const handleResultClick = (result) => {
    navigate(result.url);
    handleSearchToggle();
  };

  // Get popular search terms from actual data
  const popularSearches = [
    ...(games?.data?.slice(0, 3).map(g => g.name) || []),
    ...(casino?.data?.slice(0, 2).map(c => c.name) || [])
  ].slice(0, 5);

  

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-xl" : "bg-purple-800"}`}>
        <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo with Gold Accent */}
            <Link 
              to="/" 
              aria-label="Royal Casino" 
              className="inline-flex items-center group"
            >
              <div className="relative">
                <svg 
                  className="w-10 h-10 text-yellow-500 transition-transform group-hover:rotate-12" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2L4 12L12 22L20 12L12 2Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6L7 12L12 18L17 12L12 6Z" fill="black" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">R</span>
              </div>
              <span className="ml-2 text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 uppercase">
                Casino
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center space-x-8">
              <li>
                <Link 
                  to="/liveCasino" 
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors group"
                >
                  Live Casino
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/freeGames" 
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors group"
                >
                  Free Games
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/blogs" 
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors group"
                >
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/reviews" 
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors group"
                >
                  Reviews
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="relative font-medium text-white hover:text-yellow-400 transition-colors group"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>

            {/* Search and Mobile Menu Buttons */}
            <div className="flex items-center space-x-4">
              <button
                aria-label="Search"
                title="Search"
                className="p-2 text-white hover:text-yellow-400 transition-colors focus:outline-none"
                onClick={handleSearchToggle}
              >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </button>

              <div className="lg:hidden">
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 rounded focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 mt-2 py-4 px-6 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 rounded-b-lg shadow-xl lg:hidden">
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/liveCasino" 
                    className="block py-2 text-lg font-medium text-white hover:text-yellow-400 transition-colors border-b border-gray-800" 
                    onClick={handleMenuClose}
                  >
                    Live Casino
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/freeGames" 
                    className="block py-2 text-lg font-medium text-white hover:text-yellow-400 transition-colors border-b border-gray-800" 
                    onClick={handleMenuClose}
                  >
                    Free Games
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blogs" 
                    className="block py-2 text-lg font-medium text-white hover:text-yellow-400 transition-colors border-b border-gray-800" 
                    onClick={handleMenuClose}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reviews" 
                    className="block py-2 text-lg font-medium text-white hover:text-yellow-400 transition-colors border-b border-gray-800" 
                    onClick={handleMenuClose}
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="block py-2 text-lg font-medium text-white hover:text-yellow-400 transition-colors border-b border-gray-800" 
                    onClick={handleMenuClose}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-sm shadow-lg transition-all duration-300">
          <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search Casino & Games"
                  className="w-full py-3 pl-4 pr-12 text-white bg-gray-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-16 p-1 text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-4 p-2 text-gray-400 hover:text-yellow-400"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {(searchResults.length > 0 || isSearching) && (
              <div className="mt-1 bg-gray-700/80 rounded-lg shadow-xl overflow-hidden">
                {isSearching ? (
                  <div className="p-4 flex items-center space-x-3">
                    <div className="animate-spin">
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Searching...</span>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-600/50">
                    {searchResults.map((result) => (
                      <li 
                        key={result.id} 
                        className="hover:bg-gray-600/50 transition-colors"
                      >
                        <button
                          onClick={() => handleResultClick(result)}
                          className="w-full text-left px-4 py-3 flex items-start"
                        >
                          <div className={`mt-1 mr-3 p-1.5 rounded-full ${result.type === 'game' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {result.type === 'game' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              )}
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white text-lg">
                              {highlightMatch(result.name, searchQuery)}
                            </div>
                            <div className="flex items-center mt-1 text-sm text-gray-400">
                              <span className="capitalize">{result.type}</span>
                              <span className="mx-2">•</span>
                              <span className="text-yellow-400/80">{result.displayUrl}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Popular searches */}
            {!searchQuery && (
              <div className="mt-4 text-gray-400">
                <div className="text-sm font-medium mb-2">Popular searches</div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600 rounded-full text-sm transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Navbar;