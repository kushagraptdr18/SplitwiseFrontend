import React from 'react'

import Sidebar from './Sidebar'
function ActivityCard() {
  return (
    <div className='w-full h-full text-white p-5 bg-black'>
    
      <div className='w-full h-full'>

      <div className="w-72 rounded-2xl shadow-lg bg-gradient-to-br from-teal-100 to-indigo-200 overflow-hidden cursor-pointer transform group hover:scale-105 group-hover:rotate-3d group-hover:flip-x transition-all duration-700 ease-in-out relative">
        {/* Date Section - New Addition */}
        <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-out z-10">
          <p className="text-white text-sm font-medium">
            23 March 2024
          </p>
        </div>

        {/* Top Section - Gradient Background */}
        <div className="w-full h-32 bg-gradient-to-r from-gray-600 to-cyan-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Circle Symbol */}
            <div className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-teal-400 transition-all duration-500 transform group-hover:scale-150 group-hover:bg-gradient-to-r from-slate-400 to-gray-500">
              <span className="text-3xl text-teal-600 font-semibold transition-all duration-500 group-hover:text-white">
                
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6">
          {/* Group Name - Initially hidden, appears on hover with a fade-in and slide effect */}
          <h2 className="text-gray-800 text-xl font-bold text-center mt-12 mb-4 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            Mirror Screw
          </h2>

          {/* Expandable Content */}
          <div className="overflow-hidden transition-all duration-700 ease-out max-h-0 group-hover:max-h-[400px]">
            <div className=" rounded-lg p-4 space-y-4 transform transition-all duration-500 group-hover:translate-y-3 group-hover:opacity-100">
              <h3 className="text-purple-800 text-xl font-bold text-center mb-3 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                You paid 200
              </h3>
              <div className="space-y-2">
                <p className="text-pink-900 text-sm text-center font-medium opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                 You lent 133.33
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>




        
     


      </div>
      
    </div>
  )
}

export default ActivityCard
