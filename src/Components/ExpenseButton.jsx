import React from 'react'

function ExpenseButton({text}) {
    return (
      <div className='p-2 md:p-4'>
        <button className='
          h-8 md:h-12 
          px-3 md:px-6 
          text-sm md:text-base
          bg-blue-600 hover:bg-green-700 
          text-white 
          rounded-lg 
          font-medium 
          transition-colors duration-200 
          shadow-md hover:shadow-lg 
          flex items-center justify-center 
          space-x-1 md:space-x-2'
        >
          {text}
        </button>
      </div>
    )
  }

export default ExpenseButton

