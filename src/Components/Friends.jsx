import React from 'react'
import Sidebar from './Sidebar'
function Friends() {

  const friends = [
    {
      name: "John Doe",
      amount: 50
    }
    ,
    {
      name: "Jane Doe",
      amount: 100
    }
    ,
    {
      name: "Jim Beam",
      amount: 200
    },
    {
      name: "Yummy A",
      amount: 50
    },
    {
      name:"Harsh",
      amount: 100
    }
  ]
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      
      <div className="w-full h-screen">
        <div className='w-full px-3 py-8 md:py-14'>
           <h1 className="text-2xl md:text-4xl text-center font-bold mb-3 md:mb-4 text-white">
             Your Friends
           </h1>
           <h2 className="text-sm md:text-base mb-3 md:mb-4 text-white text-center">
             Overall, you owed $703.98
           </h2>
        </div>

        <div className="p-4 w-full h-screen flex flex-wrap justify-center gap-6 md:gap-20 py-8 md:py-20">
          {friends.map((elem, idx) => (
            <div key={idx} className="
              card group relative 
              flex flex-col items-center justify-center 
              bg-gradient-to-r from-slate-500 to-gray-400 
              text-white rounded-xl shadow-lg 
              p-3 md:p-6 
              max-w-[160px] md:max-w-xs 
              w-full 
              h-32 md:h-40 
              cursor-pointer transform transition-all duration-500 
              hover:h-48 md:hover:h-60 hover:shadow-2xl"
            >
              <div className="
                initials bg-white/20 
                text-lg md:text-3xl 
                font-extrabold 
                w-20 md:w-28 
                h-16 md:h-24 
                flex items-center justify-center 
                rounded-md transition-transform duration-500 
                ease-in-out group-hover:scale-110 
                p-2 md:p-4"
              >
                {elem.name}
              </div>

              <div className="details bg-white/10 mt-4 p-4 rounded-md text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-sm font-semibold tracking-wide">{elem.name}</h3>
                <p className="text-sm mt-2 font-medium">Owes you: <span className="text-yellow-300">{elem.amount}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Friends
