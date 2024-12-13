import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import GroupCard from './GroupCard';
import AxiosInstance from './utils/AxiosInstance';

function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await AxiosInstance.get('/group/viewAllGroups', { withCredentials: true });
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
    <div className='w-full flex md:flex-row items-start justify-start min-h-screen overflow-y-auto overflow-x-hidden bg-black'>
    {/* Sidebar: Fixed on the left */}
    <div className="w-52 md:w-64">
      <Sidebar />
    </div>
  
    {/* Main content: Cards on the right */}
    <div className="flex-1 px-4 md:px-8">
      <h1 className='text-white text-2xl md:text-4xl mt-8 font-bold text-center mb-4'>All Groups</h1>
      {loading ? (
        <p className='text-white text-center'>Loading...</p>
      ) : error ? (
        <p className='text-red-500 text-center'>{error}</p>
      ) : (
        <div className='flex flex-wrap gap-5'>
          <GroupCard groups={groups} />  {/* Make sure GroupCard is properly receiving 'groups' */}
        </div>
      )}
    </div>
  </div>
  
  );
}

export default AllGroups;
