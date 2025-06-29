import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
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

          {/* Desktop Nav Links with Hover Effects */}
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

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu with Glass Morphism Effect */}
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
  );
};

export default Navbar;