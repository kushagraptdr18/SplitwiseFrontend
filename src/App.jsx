import React from 'react';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import GroupDetail from './Components/GroupDetail';
import { Routes, Route } from 'react-router-dom';
import AllGroups from './Components/AllGroups';
import Profile from './Components/Profile';
import Friends from './Components/Friends';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import CreateGroup from './Components/CreateGroup';
import CreateExpense from './Components/CreateExpense';

import DailyExpensesGraph from './Components/DailyExpensesGraph';

function App() {
  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-tr from-gray-800 to-neutral-900">
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/allgroups" element={<AllGroups />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/activity" element={<DailyExpensesGraph />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/group/:groupName" element={<GroupDetail />} /> {/* Dynamic route for group details */}
        <Route path="/CreateExpense/:groupId" element={<CreateExpense />} /> {/* Dynamic route for group details */}

      </Routes>
    </div>
  );
}

export default App;
