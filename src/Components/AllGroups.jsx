import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import GroupCard from './GroupCard';

function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/group/viewAllGroups', { withCredentials: true });
        console.log(response.data.groups);  
        setGroups(response.data.groups);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch groups. Please try again later.');
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center min-h-screen overflow-y-auto overflow-x-hidden bg-black'>
      <Sidebar />
      <div className='w-full h-full px-4 md:px-8'>
        <h1 className='text-white text-2xl md:text-4xl mt-8 font-bold text-center mb-4'>All Groups</h1>
        {loading ? (
          <p className='text-white text-center'>Loading...</p>
        ) : error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
              
            <GroupCard groups={groups} />  {/* Make sure GroupCard is properly receiving 'groups' */}
          
          </div>
        )}
      </div>
    </div>
  );
}

export default AllGroups;
