import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import './App.css';
import Footer from './Components/Footer';
import Stats from './Components/Stats';
import Blog from './Components/Blog';
import About from './Components/About';
import Reviews from './Components/Reviews';
import TrustSection from './Components/TrustSection';
import Faq from './Components/Faq';
import LiveCasino from './Components/LiveCasino';
import ScrollPopup from './Components/ScrollPopup';
import LiveCasinoContainer from './Components/LiveCasinoContainer';
import BlogPage from './Components/BlogPage';
import Games from './Components/Games';
import GameCarousel from './Components/GameCarousel';
import CustomCarousel from './Components/CustomCarousel';
import { faqs, trustData } from './config';
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


function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
 
  
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
                  <Stats />
                  <CustomCarousel />
                  <TrustSection data={trustData} />
                  <div className='flex w-full h-full justify-center items-center bg-gray-100'>
                    <GameCarousel />
                  </div>
                  <Faq data={faqs} />
                </>
              }
            />
            <Route path="/blogs" element={<Blog />} />
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
            <Route path="/liveCasino" element={<LiveCasino />}/>
            <Route path="/liveCasino/:id" element={<LiveCasinoContainer />}/>
            <Route path="/blogs/:id" element={<BlogPage />}/>
            <Route path="/freeGames" element={<Games />}/>
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