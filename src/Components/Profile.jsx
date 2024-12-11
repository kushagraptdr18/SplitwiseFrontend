import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
function Profile() {
  return (
    <div className='w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-20 min-h-screen overflow-y-auto overflow-x-hidden bg-black'>
        <Sidebar/>

        <div className="h-full w-full bg-gray-900 flex items-center justify-center py-4 md:py-8 px-2 md:px-4">
  {/* Profile Card */}
  <div className="w-full max-w-[90%] md:max-w-4xl bg-gray-800 rounded-xl md:rounded-2xl shadow-lg p-3 md:p-6 relative overflow-hidden">
    {/* Profile Header */}
    <div className="w-full h-24 md:h-36 bg-gradient-to-r from-blue-600 to-purple-700 rounded-t-xl md:rounded-t-2xl relative">
      {/* Profile Picture */}
      <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2">
        <img
          src="https://via.placeholder.com/100" 
          alt="Profile"
          className="w-20 h-20 md:w-24 md:h-24 rounded-full border-3 md:border-4 border-gray-800 shadow-md transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>

    {/* Name and Basic Info */}
    <div className="mt-12 md:mt-14 text-center">
      <h1 className="text-xl md:text-2xl font-semibold text-white">Your Name</h1>
      <p className="text-xs md:text-sm text-gray-400">yourname@example.com</p>
    </div>

    {/* Options */}
    <div className="mt-4 md:mt-6 space-y-3 md:space-y-6">
      <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-gray-700 rounded-md flex items-center justify-between hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-gray-200 group transition-all duration-300">
        <span className="text-sm md:text-base">View Full Details</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path>
        </svg>
      </button>

      <Link to="/allgroups" className="block">
        <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-gray-700 rounded-md flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-gray-200 group transition-all duration-300">
          <span className="text-sm md:text-base">All Groups</span>
          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path>
          </svg>
        </button>
      </Link>

      <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-gray-700 rounded-md flex items-center justify-between hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 text-gray-200 group transition-all duration-300">
        <span className="text-sm md:text-base">Date of Joining</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path>
        </svg>
      </button>

      <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-gray-700 rounded-md flex items-center justify-between hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 text-gray-200 group transition-all duration-300">
        <span className="text-sm md:text-base">Logout</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path>
        </svg>
      </button>

      <button className="w-full py-2 md:py-3 px-3 md:px-4 bg-gray-700 rounded-md flex items-center justify-between hover:bg-gradient-to-r hover:from-red-700 hover:to-red-500 text-gray-200 group transition-all duration-300">
        <span className="text-sm md:text-base">Remove Account</span>
        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</div>


      
    </div>
  )
}

export default Profile
