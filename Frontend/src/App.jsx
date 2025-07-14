import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import './App.css';
import Footer from './Components/Footer';
import Blog from './Components/Blog';
import About from './Components/About';
import Reviews from './Components/Reviews';
import Faq from './Components/Faq';
import LiveCasino from './Components/LiveCasino';
import ScrollPopup from './Components/ScrollPopup';
import LiveCasinoContainer from './Components/LiveCasinoContainer';
import BlogPage from './Components/BlogPage';
import Games from './Components/Games';
import CustomCarousel from './Components/CustomCarousel';
import AdminHome from './features/AdminHome';
import ProtectedAdmin from "./features/ProtectedAdmin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './features/Login';
import GamesContainer from './Components/GamesContainer';
import ScrollToTop from './Components/ScrollToTop';
import HelpCenter from './Components/support/HelpCenter';
import FAQ from './Components/support/FAQ';
import ContactUs from './Components/support/ContactUs';
import Legal from './Components/legal/Legal';
import useFetch from './hooks/useFetch';
import {carouselData} from "./app/constants"
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './common/blogSlice';
import SimpleCardSection from './components/SimpleCardSection';
import { fetchFAQs } from './common/faqSlice';
import BlogCard from './components/BlogCard';


function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const API_URL = import.meta.env.VITE_API_URL;
  const { data:games, loading:gameLoading } = useFetch(`${API_URL}/api/games`);
  const { data:casino, loading:casinoLoading } = useFetch(`${API_URL}/api/casinos`);
  const dispatch = useDispatch();
  const { blogs, loading:blogLoading } = useSelector((state) => state.blogs);
    const { data:faq } = useSelector((state) => state.faq.data);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchFAQs());
  }, [dispatch]);
 
  
  return (
    <>
      <Router>
      <ScrollToTop/>
        {!isAdminRoute && <Navbar />}
        {!isAdminRoute && <ScrollPopup />}
        
        {/* Main content container */}
        <div className={!isAdminRoute ? "pt-16 min-h-screen bg-gray-100" : "min-h-screen"}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <LiveCasino data={casino?.casinos?.slice(0,5)} />
                  <div className='flex justify-center items-center py-2'><Link className='border border-black rounded-3xl p-2' to={`/liveCasino`}>SHOW MORE</Link></div>
                  <CustomCarousel data={carouselData}/>
                  <BlogCard data={blogs?.slice(0,3)} loading={blogLoading}/>
                  <SimpleCardSection/>
                  <Faq data={faq} />
                </>
              }
            />
            <Route path="/blogs" element={<Blog data={blogs} loading={blogLoading}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpCenter/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/legal" element={ <Legal/>} />
            <Route 
              path="/reviews" 
              element={
                <div className="min-h-screen bg-gray-200">
                  <Reviews />
                </div>
              } 
            />
            <Route path="/liveCasino" element={<LiveCasino data={casino?.casinos} loading={casinoLoading}/>}/>
            <Route path="/liveCasino/:id" element={<LiveCasinoContainer />}/>
            <Route path="/blogs/:id" element={<BlogPage />}/>
            <Route path="/freeGames" element={<Games data={games?.games} loading={gameLoading}/>}/>
            <Route path="/freeGames/:id" element={<GamesContainer />}/>
            <Route path="/admin/login" element={<Login/>}/>
            <Route 
              path='/admin/*'
              element={
                <ProtectedAdmin>
                  <AdminHome/>
                </ProtectedAdmin>
              }
            />
          </Routes>
        </div>
        
        {!isAdminRoute && <Footer />}
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;