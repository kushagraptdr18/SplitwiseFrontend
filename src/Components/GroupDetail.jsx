import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import AxiosInstance from './utils/axios';

function GroupDetail() {
  const { groupName } = useParams();
  const [group, setGroup] = useState({});
  const [expenses, setExpenses] = useState([]);
  
  // Fetch group details from the API



  useEffect(() => {
    if (groupName) {
      const fetchGroupDetails = async () => {
        try {
          const response = await AxiosInstance.get(
            `/group/viewGroup?groupId=${groupName}`,
            { withCredentials: true }
          );
          setGroup(response.data.group);
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
          const response = await AxiosInstance.get(
            `/expense/view?groupId=${groupName}`,
            { withCredentials: true }
          );
          setExpenses(response.data.expenses);
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      };

      fetchExpenses();
    }
  }, [groupName]);

  if (!group.groupName && expenses.length === 0) {
    return <p className="text-white text-center mt-8">Loading group details and expenses...</p>;
  }

  const mergedData = {};
  group.toPay?.forEach((entry) => {
    if (mergedData[entry.name]) {
      mergedData[entry.name].toPay += entry.amount;
    } else {
      mergedData[entry.name] = { name: entry.name, toPay: entry.amount, toTake: 0 };
    }
  });

  group.toTake?.forEach((entry) => {
    if (mergedData[entry.name]) {
      mergedData[entry.name].toTake += entry.amount;
    } else {
      mergedData[entry.name] = { name: entry.name, toPay: 0, toTake: entry.amount };
    }
  });

  const mergedArray = Object.values(mergedData).filter(
    (entry) => entry.toPay !== 0 || entry.toTake !== 0
  );

  const totalToPay = mergedArray.reduce((acc, entry) => acc + entry.toPay, 0);
  const totalToTake = mergedArray.reduce((acc, entry) => acc + entry.toTake, 0);
  const isPositive = totalToTake > totalToPay;

  return (
    <div className="flex bg-gradient-to-b from-gray-800 to-black min-h-screen overflow-auto">
      {/* Sidebar */}
      <div className="w-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full bg-gradient-to-b from-gray-800 to-black p-6">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-6 text-center">
          Group Details: <span className="text-blue-400">{group.groupName}</span>
        </h1>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <Link
            to={`/createExpense/${groupName}`}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 mb-6 sm:mb-0"
          >
            + Create Expense
          </Link>
        </div>

        {/* Expenses and Balances */}
        {expenses.length === 0 ? (
          <p className="text-center text-gray-300 mt-8 px-4 sm:px-6">
            No expenses have been added yet. Start by creating an expense.
          </p>
        ) : (
          <div className="space-y-6 mt-8 px-4 sm:px-6">
            {/* Total Balance */}
            <div className="p-6 rounded-lg shadow-lg bg-gray-700 text-center">
              <h3
                className={`text-xl sm:text-2xl font-bold p-4 rounded-md ${
                  isPositive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                Total: ₹{Math.abs(totalToTake - totalToPay)}
              </h3>
              <p className="text-gray-300 mt-3 text-sm sm:text-base">
                {isPositive
                  ? 'The group is owed this amount'
                  : 'The group owes this amount'}
              </p>
            </div>

            {/* Group Balances */}
            <div className="space-y-4">
              <h2 className="text-white text-xl sm:text-2xl font-bold">Group Balances</h2>
              {mergedArray.map((entry, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-all"
                >
                  <span className="font-semibold text-white">{entry.name}</span>
                  <span
                    className={`text-sm font-bold py-2 px-4 rounded-md mt-2 sm:mt-0 ${
                      entry.toPay > 0 ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {entry.toPay > 0
                      ? `Owes ₹${entry.toPay}`
                      : `Is owed ₹${entry.toTake}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Expense Details */}
            <div className="mt-10">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">Expense Details</h2>
              {expenses.map((expense, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg shadow-md mb-8 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                    <span className="font-semibold">
                      Paid by: <span className="text-blue-400">{expense.paidBy}</span>
                    </span>
                  </div>
                  <p className="text-gray-400 italic mb-4 text-sm sm:text-base">{expense.description}</p>

                  <div className="space-y-2">
                    {expense.splitDetails?.map((split, idx) =>
                      split.user !== expense.paidBy && (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg bg-gray-800"
                        >
                          <span className="text-white">{split.user}</span>
                          <span
                            className={`font-bold py-2 px-4 rounded-md mt-2 sm:mt-0 ${
                              split.amountOwed > 0 ? 'bg-red-600' : 'bg-green-600'
                            }`}
                          >
                            {split.amountOwed > 0
                              ? `Owes ₹${Math.abs(split.amountOwed)}`
                              : `Is owed ₹${Math.abs(split.amountOwed)}`}
                          </span>
                        </div>
                      )
                    )}
                  </div>
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
