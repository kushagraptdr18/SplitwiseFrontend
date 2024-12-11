import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:3000/group/groupMembers?groupId=${groupId}`,{ withCredentials: true });
        console.log(response.data.members);
        
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

      await axios.post("http://localhost:3000/expense/create", expenseData,{ withCredentials: true });
      navigate(`/group/${groupId}`); // Navigate to group detail component
    } catch (error) {
      console.error("Error creating expense", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-lg"
      >
        <h1 className="text-xl font-bold mb-4">Create Expense</h1>

        {/* Expense Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Expense Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Paid By */}
        <div className="mb-4">
          <label htmlFor="paidBy" className="block font-medium mb-2">
            Paid By
          </label>
          <select
            id="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
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
        <div className="mb-4">
          <label className="block font-medium mb-2">Participants</label>
          {groupMembers.map((member) => (
            <div key={member.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`participant-${member.id}`}
                value={member.id}
                onChange={handleParticipantChange}
                className="mr-2"
              />
              <label htmlFor={`participant-${member.id}`}>{member.name}</label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Expense
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;