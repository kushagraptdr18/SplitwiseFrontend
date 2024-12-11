// src/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`
      ${isOpen ? "w-64" : "w-16 md:w-20"} 
      ${isMobile && !isOpen ? "w-0 p-0" : ""}
      flex 
      bg-gray-800 
      h-screen 
      p-3 md:p-5 
      pt-6 md:pt-8 
      duration-300 
      relative
      z-50
    `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          absolute 
          ${isMobile ? "-right-8" : "-right-3"} 
          top-9 
          w-6 md:w-7 
          h-6 md:h-7 
          bg-gray-800 
          border border-gray-700 
          rounded-full 
          text-white 
          text-sm md:text-base
          flex items-center justify-center
          z-50
        `}
      >
        {isOpen ? "<" : ">"}
      </button>

      <div className="flex flex-col justify-between h-full">
        {/* Logo or Title */}
        <div className="text-white text-lg md:text-2xl font-semibold whitespace-nowrap">
          {isOpen ? "Split Wise" : "S"}
        </div>

        {/* Navigation Menu */}
        <ul className="mt-[-10%] space-y-1 md:space-y-2">
          <li className="flex items-center gap-x-2 md:gap-x-4 p-1.5 md:p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">
            <FaHome className="text-base md:text-lg" />
            {isOpen && <Link to="/" className="text-sm md:text-base whitespace-nowrap">Home</Link>}
          </li>
          <li className="flex items-center gap-x-2 md:gap-x-4 p-1.5 md:p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">
            <FaUser className="text-base md:text-lg" />
            {isOpen && <Link to="/allgroups" className="text-sm md:text-base whitespace-nowrap">Groups</Link>}
          </li>
          <li className="flex items-center gap-x-2 md:gap-x-4 p-1.5 md:p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">
            <FaCog className="text-base md:text-lg" />
            {isOpen && <Link to="/friends" className="text-sm md:text-base whitespace-nowrap">Friends</Link>}
          </li>
          <li className="flex items-center gap-x-2 md:gap-x-4 p-1.5 md:p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">
            <FaCog className="text-base md:text-lg" />
            {isOpen && <Link to="/activity" className="text-sm md:text-base whitespace-nowrap">Activity</Link>}
          </li>
          <li className="flex items-center gap-x-2 md:gap-x-4 p-1.5 md:p-2 text-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">
            <FaCog className="text-base md:text-lg" />
            {isOpen && <Link to="/profile" className="text-sm md:text-base whitespace-nowrap">Account</Link>}
          </li>
        </ul>

        {/* Footer */}
        {isOpen && (
          <div className="text-gray-400 text-xs text-center">
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
