import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram,  
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-left items-center md:items-start">
          {/* About Column */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">CASINO</h3>
            <p className="mb-4 max-w-xs">
              The premier online gaming destination, offering world-class entertainment with security and fairness guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/royalspincasino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com/royalspincasino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com/royalspincasino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://youtube.com/royalspincasino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://linkedin.com/company/royalspincasino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
            
              <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/freeGames" className="hover:text-yellow-400 transition">Games</Link></li>
              <li><Link to="/blogs" className="hover:text-yellow-400 transition">Blogs</Link></li>
              <li><Link to="/reviews" className="hover:text-yellow-400 transition">Reviews</Link></li>
              <li><Link to="/liveCasino" className="hover:text-yellow-400 transition">Casino</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">SUPPORT</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-yellow-400 transition">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-400 transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li><Link to="/legal" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
              <li><Link to="/legal" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
              <li><Link to="/legal" className="hover:text-yellow-400 transition">Responsible Gaming</Link></li>
            </ul>
          </div>
        </div>

        {/* Responsible Gaming */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h4 className="text-yellow-400 font-bold mb-2 text-center">PLAY RESPONSIBLY</h4>
          <p className="text-sm text-center max-w-4xl mx-auto">
            Casino promotes responsible gambling. 18+ only. Gambling can be addictive. Play responsibly. 
            For help, visit <a href="#" className="text-yellow-400 hover:underline">GamCare</a> or 
            call the National Gambling Helpline on <a href="tel:+448080201320" className="text-yellow-400 hover:underline">0808 8020 133</a>.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-800">
          <p>© {new Date().getFullYear()} Casino. All Rights Reserved.</p>
          <p className="mt-2">Casino is operated by RSG N.V., a company registered in Curacao with registration number 123456.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;