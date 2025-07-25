import { useState } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram,  
  FaYoutube,
  FaLinkedin,
  FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [adultChecked, setAdultChecked] = useState(false);
  const [contactChecked, setContactChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!email || !adultChecked || !contactChecked) {
      alert('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          adult: adultChecked,
          contact: contactChecked
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      // Show success bar and reset form
      setShowSuccessBar(true);
      setEmail('');
      setAdultChecked(false);
      setContactChecked(false);
      
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccessBar(false), 5000);
    } catch (error) {
      alert(error.message || 'An error occurred. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessBar = () => {
    setShowSuccessBar(false);
  };

  return (
    <>
      {/* Success Notification Bar */}
      {showSuccessBar && (
        <div className="fixed top-0 left-0 right-0 bg-green-600 text-white py-3 px-4 z-50 flex justify-between items-center shadow-lg animate-fade-in">
          <div className="flex items-center justify-center w-full">
            <span className="font-medium">🎉 Thanks for subscribing! Your updates are on the way.</span>
          </div>
          <button 
            onClick={closeSuccessBar}
            className="text-white hover:text-gray-200 ml-4 transition-colors"
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-12 w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                SIGN UP FOR CASINO AND SPORTS BETTING UPDATES
              </h3>
              <p className="text-gray-300">Stay updated with the latest offers and promotions</p>
            </div>
            
            <form 
              id="newsletter_subscription-footer" 
              className="max-w-2xl mx-auto"
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email address*"
                    className="flex-grow px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-md transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : 'Sign up'}
                  </button>
                </div>
              </div>

              <div className="mb-4 flex items-start">
                <input
                  type="checkbox"
                  id="adult"
                  name="adult"
                  className="mt-1 mr-2 accent-yellow-500"
                  required
                  checked={adultChecked}
                  onChange={(e) => setAdultChecked(e.target.checked)}
                />
                <label htmlFor="adult" className="text-sm text-left">
                  I confirm I am over 18-24 years old, depending on my location.
                </label>
              </div>

              <div className="mb-6 flex items-start">
                <input
                  type="checkbox"
                  id="contact"
                  name="contact"
                  className="mt-1 mr-2 accent-yellow-500"
                  required
                  checked={contactChecked}
                  onChange={(e) => setContactChecked(e.target.checked)}
                />
                <label htmlFor="contact" className="text-sm text-left">
                  I agree that my contact data may be used to keep me informed about casino and sports betting products, services, and offerings.
                </label>
              </div>

              <div className="flex items-start text-xs text-gray-400">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <p className="text-left">
                  Read the <Link to="/privacy-policy" className="text-yellow-400 hover:underline">Privacy</Link> and <Link to="/cookie-policy" className="text-yellow-400 hover:underline">Cookie Policies</Link> for more details. You can unsubscribe from receiving future marketing communications at any time.
                </p>
              </div>
            </form>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 text-center md:text-left items-center md:items-start">
            {/* About Column */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">CASINO</h3>
              <p className="mb-4 max-w-xs text-sm md:text-base">
                The premier online gaming destination, offering world-class entertainment with security and fairness guaranteed.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
                <li><Link to="/games" className="hover:text-yellow-400 transition">Games</Link></li>
                <li><Link to="/blogs" className="hover:text-yellow-400 transition">Blogs</Link></li>
                <li><Link to="/reviews" className="hover:text-yellow-400 transition">Reviews</Link></li>
                <li><Link to="/casino" className="hover:text-yellow-400 transition">Casino</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">SUPPORT</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link to="/help" className="hover:text-yellow-400 transition">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-yellow-400 transition">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link to="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
                <li><Link to="/responsible-gaming" className="hover:text-yellow-400 transition">Responsible Gaming</Link></li>
              </ul>
            </div>
          </div>

          {/* Responsible Gaming */}
          <div className="bg-gray-800 rounded-lg p-4 mb-8">
            <h4 className="text-yellow-400 font-bold mb-2 text-center">PLAY RESPONSIBLY</h4>
            <p className="text-xs sm:text-sm text-center max-w-4xl mx-auto">
              Casino promotes responsible gambling. 18+ only. Gambling can be addictive. Play responsibly. 
              For help, visit <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">GamCare</a> or 
              call the National Gambling Helpline on <a href="tel:+448080201320" className="text-yellow-400 hover:underline">0808 8020 133</a>.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-800">
            <p>© {new Date().getFullYear()} Casino. All Rights Reserved.</p>
            <p className="mt-2">Casino is operated by RSG N.V., a company registered in Curacao with registration number 123456.</p>
          </div>
        </div>
      </footer>

      {/* Add this to your global CSS or Tailwind config for the animation */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Footer;