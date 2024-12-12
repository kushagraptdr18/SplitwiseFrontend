import React from 'react';
import { Link } from 'react-router-dom';

function GroupCard({ groups }) {
  
  
  if (!groups || groups.length === 0) {
    return <p className="text-white text-center">No groups available.</p>;
  }

  return (
    <div className="p-4 md:p-[5%] flex flex-wrap gap-6 md:gap-16 items-center justify-center md:justify-around">
      {groups.map((group, idx) => {
        // Create a map to track the total amount owed/received by each person
        const balanceMap = {};

        // Calculate toPay amounts
        group.toPay.forEach((entry) => {
          if (balanceMap[entry.name]) {
            balanceMap[entry.name] += entry.amount;
          } else {
            balanceMap[entry.name] = entry.amount;
          }
        });

        // Calculate toTake amounts (subtract from balance)
        group.toTake.forEach((entry) => {
          if (balanceMap[entry.name]) {
            balanceMap[entry.name] -= entry.amount;
          } else {
            balanceMap[entry.name] = -entry.amount;
          }
        });

        // Calculate total amount to pay or take
        const totalAmount = group.toTake.reduce((acc, entry) => acc + entry.amount, 0) - group.toPay.reduce((acc, entry) => acc + entry.amount, 0);
        const isPositive = totalAmount > 0; // Check if it's positive (to take) or negative (to pay)

        return (
          <Link
  to={`/group/${group.id}`} // Dynamic route to pass groupId
  key={idx}
  className="w-[280px] md:w-72 rounded-xl md:rounded-2xl shadow-lg bg-[#0b0c22] overflow-hidden transition-all duration-700 ease-in-out hover:shadow-xl cursor-pointer group"
>
  <div className="p-4 md:p-6 relative">
    {/* Symbol Circle - Always Visible */}
    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-stone-900 to-gray-700 rounded-full shadow-md flex items-center justify-center border-3 md:border-4 mx-auto -mt-3 md:-mt-4 mb-3 md:mb-4 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110">
      <span className="text-2xl md:text-3xl text-gray-100 font-semibold transition-colors duration-500 group-hover:text-white">
        {group.groupName.charAt(0)}
      </span>
    </div>

    {/* Content Container */}
    <div className="space-y-3 md:space-y-4">
      {/* Group Name - Always Visible */}
      <h2 className="text-gray-100 text-lg md:text-xl font-bold text-center">
        {group.groupName}
      </h2>

      {/* Expandable Content */}
      <div className="overflow-hidden transition-all duration-700 ease-out max-h-0 group-hover:max-h-[200px]">
        <div className="bg-gradient-to-r from-stone-900 to-gray-700 rounded-lg p-3 md:p-4 shadow-md">
          {/* Total Amount to Pay */}
          <h3
            className={`text-lg md:text-xl font-bold text-center mb-2 md:mb-3 ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            Total: ₹{Math.abs(totalAmount)}
          </h3>

          {/* Balances */}
          <div className="space-y-1 md:space-y-2">
            {Object.keys(balanceMap).map((person, index) => {
              const balance = balanceMap[person];
              return (
                <p
                  key={index}
                  className={`text-xs md:text-sm text-center font-medium ${
                    balance > 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {person} {balance > 0 ? 'owes' : 'is owed'} ₹{Math.abs(balance)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
</Link>

        );
      })}
    </div>
  );
}

export default GroupCard;
