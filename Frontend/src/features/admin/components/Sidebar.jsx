import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome,FaBlogger,FaSignOutAlt} from "react-icons/fa";
import { MdCasino,MdOutlineRateReview} from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";
import { GoSidebarCollapse,GoSidebarExpand } from "react-icons/go";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      // Clear token from local storage
      localStorage.removeItem("authToken");

      // Redirect to login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`h-screen flex flex-col  bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-28' : 'w-64'}`}>
      <button 
        className="p-3 flex justify-end items-end text-white focus:outline-none" 
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <GoSidebarCollapse size={24}/> : <GoSidebarExpand size={24}/>}
      </button>
      <nav className="mt-4">
        <ul>
        <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <FaHome size={24} />
            {!isCollapsed && <Link to="/admin" className="hover:text-gray-400">Dashboard</Link>}
          </li>
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <FaBlogger size={24} />
            {!isCollapsed && <Link to="/admin/blog" className="hover:text-gray-400">Blog</Link>}
          </li>
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <MdCasino size={24} />
            {!isCollapsed && <Link to="/admin/casino" className="hover:text-gray-400">Live Casino</Link>}
          </li>
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <IoLogoGameControllerB size={24} />
            {!isCollapsed && <Link to="/admin/games" className="hover:text-gray-400">Free Games</Link>}
          </li>
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <MdOutlineRateReview size={24} />
            {!isCollapsed && <Link to="/admin/reviews" className="hover:text-gray-400">Reviews</Link>}
          </li>
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2`}>
            <MdOutlineRateReview size={24} />
            {!isCollapsed && <Link to="/admin/popup" className="hover:text-gray-400">Popup</Link>}
          </li>
          {/* ✅ Logout Button */}
          <li className={`flex items-center p-2 ${!isCollapsed ? "hover:bg-gray-700" : ""} gap-2 cursor-pointer`} onClick={handleLogout}>
            <FaSignOutAlt size={24} />
            {!isCollapsed && <span className="hover:text-gray-400">Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

