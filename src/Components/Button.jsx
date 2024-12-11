import React from 'react'

function Button({ text, color, className }) {
    return (
      <div className={`flex justify-center items-center ${className || ''}`}>
       <button 
  className={`
    relative 
    inline-block 
    py-2 px-3 
    ${color} 
    rounded-md 
    text-white 
    font-medium 
    text-sm md:text-base
    px-4 
    transition-all 
    duration-300 
    overflow-hidden 
    group 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2
  `}
>
  {/* Ripple Effect */}
  <span 
    className="absolute inset-0 
      bg-gradient-to-r from-purple-500 to-blue-500 
      transform 
      scale-x-0 
      group-hover:scale-x-100 
      transition-transform 
      duration-500 
      origin-left"
  ></span>
  
  {/* Border Glow Animation */}
  <span 
    className="absolute inset-0 
      border-2 
      border-transparent 
      rounded-md 
      group-hover:border-blue-400 
      group-hover:animate-pulse 
      transition-all 
      duration-500"
  ></span>

  {/* Text Content */}
  <span 
    className="relative z-10 
      group-hover:tracking-wide 
      transition-all 
      duration-300"
  >
    {text}
  </span>
</button>


      </div>
    )
  }

export default Button
