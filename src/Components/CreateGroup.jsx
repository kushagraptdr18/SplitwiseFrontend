import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AxiosInstance from './utils/axios';

const CreateGroup = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  // Fetch the list of friends from the API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await AxiosInstance.get('/allfriends', { withCredentials: true });
        setFriends(response.data); // Assuming the response data is an array of friends
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  // Handle selecting/deselecting friends
  const handleFriendSelection = (id) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((friendId) => friendId !== id) // Deselect
        : [...prevSelected, id] // Select
    );
  };

  // Handle group name change
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // Handle form submission to create a group
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the group data
    const groupData = {
      name: groupName,
      members: selectedFriends,
    };

    try {
      await AxiosInstance.post('/group/create', groupData, { withCredentials: true });
      navigate("/"); // Redirect after group creation
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-800 p-6">
        <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">Create a Group</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group Name Input */}
            <div>
              <label htmlFor="groupName" className="block text-lg font-medium text-gray-400 mb-2">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={handleGroupNameChange}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group name"
                required
              />
            </div>

            {/* Friends List */}
            <div>
              <label className="block text-lg font-medium text-gray-400 mb-2">Select Friends</label>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={friend._id}
                      value={friend._id}
                      onChange={() => handleFriendSelection(friend._id)}
                      className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor={friend._id} className="text-md text-gray-300">{friend.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
