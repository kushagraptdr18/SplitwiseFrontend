import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

function GroupDetail() {
  const { groupName } = useParams(); // Get groupId from URL parameter
  const [group, setGroup] = useState({}); // Initialize group as an empty object
  const [expenses, setExpenses] = useState([]); // State for expenses

  // Fetch group details from the API
  useEffect(() => {
    if (groupName) {
      const fetchGroupDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/group/viewGroup?groupId=${groupName}`, { withCredentials: true });
          console.log('Response from API:', response.data);
          setGroup(response.data.group); // Assuming the API returns group details
        } catch (error) {
          console.error('Error fetching group details:', error);
        }
      };

      fetchGroupDetails();
    }
  }, [groupName]);

  // Fetch expenses from the API
  useEffect(() => {
    if (groupName) {
      const fetchExpenses = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/expense/view?groupId=${groupName}`, { withCredentials: true });
          console.log('Expenses from API:', response.data);
          setExpenses(response.data.expenses); // Assuming the API returns an array of expenses
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      };

      fetchExpenses();
    }
  }, [groupName]);

  // Show loading message if group or expenses are not yet fetched
  if (!group.groupName && expenses.length === 0) {
    return(
       <p className="text-white text-center">Loading group details and expenses...</p>)
  }

  // Merging toPay and toTake based on name
  const mergedData = {};

  // Add toPay data
  group.toPay?.forEach(entry => {
    if (mergedData[entry.name]) {
      mergedData[entry.name].toPay += entry.amount;
    } else {
      mergedData[entry.name] = { name: entry.name, toPay: entry.amount, toTake: 0 };
    }
  });

  // Add toTake data
  group.toTake?.forEach(entry => {
    if (mergedData[entry.name]) {
      mergedData[entry.name].toTake += entry.amount;
    } else {
      mergedData[entry.name] = { name: entry.name, toPay: 0, toTake: entry.amount };
    }
  });

  // Convert mergedData back into an array
  const mergedArray = Object.values(mergedData);

  // Filter out any users who neither owe nor are owed money
  const filteredMergedArray = mergedArray.filter(entry => entry.toPay !== 0 || entry.toTake !== 0);

  // Calculate total amounts to pay and to take
  const totalToPay = filteredMergedArray.reduce((acc, entry) => acc + entry.toPay, 0);
  const totalToTake = filteredMergedArray.reduce((acc, entry) => acc + entry.toTake, 0);

  // Determine if the group is owed money (totalToTake > totalToPay)
  const isPositive = totalToTake > totalToPay;
  return (
    <div className="flex bg-blue-800 overflow-auto">
      <Sidebar />
  
      <div className="w-full h-screen bg-black p-4 overflow-y-scroll">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">
          Group Details: {group.groupName}
        </h1>
  
        {/* Create Expense Link */}
        <Link
          to={`/createExpense/${groupName}`} // Navigate to CreateExpense page with groupId in URL
          className="bg-blue-600 text-white p-2 rounded-md mb-4 inline-block hover:bg-blue-700"
        >
          Create Expense
        </Link>
  
        {/* Show message if no expenses exist */}
        {expenses.length === 0 ? (
          <p className="text-center text-white mt-6">
            No expenses have been added yet. Start by creating an expense.
          </p>
        ) : (
          <div className="space-y-4 mt-6">
            {/* Total Calculation */}
            <div className="mt-4 mb-6">
              <h3
                className={`text-lg md:text-xl font-bold text-center p-4 rounded-md ${
                  isPositive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                Total: ₹{Math.abs(totalToTake - totalToPay)}
              </h3>
              <p className="text-center text-white text-sm mt-2">
                {isPositive ? 'Total amount the group is owed' : 'Total amount the group owes'}
              </p>
            </div>
  
            {/* List of merged balances */}
            <div className="text-white text-sm space-y-2">
              {filteredMergedArray.map((entry, index) => (
                <div key={index} className="flex justify-between items-center p-4 rounded-md mb-2">
                  <span className="font-semibold">{entry.name}</span>
                  <span
                    className={`text-sm font-bold p-2 rounded-md ${
                      entry.toPay > 0 ? 'bg-red-600' : entry.toTake > 0 ? 'bg-green-600' : ''
                    }`}
                  >
                    {entry.toPay > 0
                      ? `Owes ₹${entry.toPay}`
                      : entry.toTake > 0
                      ? `Is owed ₹${entry.toTake}`
                      : ''}
                  </span>
                </div>
              ))}
            </div>
  
            {/* Expense Details */}
            <div className="mt-8">
              <h3 className="text-white text-xl font-bold mb-4">Expense Details</h3>
              {expenses.map((expense, index) => (
                <div key={index} className="bg-black p-4 rounded-md shadow-md mb-6">
                  {/* Display the expense date and who paid */}
                  <div className="flex justify-between text-white mb-2">
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                    <span className="font-semibold">{`Paid by: ${expense.paidBy}`}</span>
                  </div>
  
                  {/* Display the expense description */}
                  <p className="text-white text-sm my-2">{expense.description}</p>
  
                  {/* Display the split details without the 'paidBy' user */}
                  {expense.splitDetails?.map((split, idx) => (
                    split.user !== expense.paidBy && ( // Exclude the user who paid
                      <div key={idx} className="flex justify-between text-sm text-white">
                        <span>{split.user}</span>
                        <span
                          className={`font-bold p-2 rounded-md ${
                            split.amountOwed > 0 ? 'bg-red-600' : split.amountOwed < 0 ? 'bg-green-600' : ''
                          }`}
                        >
                          {split.amountOwed > 0
                            ? `Owes ₹${Math.abs(split.amountOwed)}`
                            : split.amountOwed < 0
                            ? `Is owed ₹${Math.abs(split.amountOwed)}`
                            : ''}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default GroupDetail;
