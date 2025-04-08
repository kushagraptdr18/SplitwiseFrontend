import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import AxiosInstance from './utils/axios';

const CreateExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [paidBy, setPaidBy] = useState('');
  const navigate = useNavigate();
  const { groupId } = useParams();

  // Fetch group members
  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await AxiosInstance.get(
          `/group/groupMembers?groupId=${groupId}`,
          { withCredentials: true }
        );
        setGroupMembers(response.data.members);
      } catch (error) {
        console.error("Error fetching group members", error);
      }
    };

    fetchGroupMembers();
  }, [groupId]);

  // Handle participant selection
  const handleParticipantChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedParticipants((prev) => [...prev, value]);
    } else {
      setSelectedParticipants((prev) => prev.filter((id) => id !== value));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        groupId,
        description,
        amount: parseFloat(amount),
        paidBy,
        participants: selectedParticipants,
      };

      await AxiosInstance.post("/expense/create", expenseData, {
        withCredentials: true,
      });
      navigate(`/group/${groupId}`); // Navigate to group detail component
    } catch (error) {
      console.error("Error creating expense", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:flex md:w-1/4 w-full">
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 overflow-auto md:w-3/4 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-zinc-800 to-slate-800 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-6 text-center text-white tracking-wider">
            Create Expense
          </h1>

          {/* Expense Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block font-semibold text-white mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-transparent bg-white text-gray-800 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md transition-all"
              placeholder="Enter expense description"
              required
            />
          </div>

          {/* Expense Amount */}
          <div className="mb-6">
            <label htmlFor="amount" className="block font-semibold text-white mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-2 border-transparent bg-white text-gray-800 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md transition-all"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Paid By */}
          <div className="mb-6">
            <label htmlFor="paidBy" className="block font-semibold text-white mb-2">
              Paid By
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full border-2 border-transparent bg-white text-gray-800 p-3 md:p-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 shadow-md transition-all"
              required
            >
              <option value="" disabled>
                Select the payer
              </option>
              {groupMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Participants */}
          <div className="mb-6">
            <label className="block font-semibold text-white mb-2">Participants</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`participant-${member.id}`}
                    value={member.id}
                    onChange={handleParticipantChange}
                    className="mr-2 focus:ring-4 focus:ring-blue-500"
                  />
                  <label htmlFor={`participant-${member.id}`} className="text-sm text-white">
                    {member.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 md:py-4 rounded-lg w-full font-semibold hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all ease-in-out shadow-xl"
          >
            Create Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExpense;
