import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import GroupDetail from './Components/GroupDetail';
import AllGroups from './Components/AllGroups';
import Profile from './Components/Profile';
import Friends from './Components/Friends';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import CreateGroup from './Components/CreateGroup';
import CreateExpense from './Components/CreateExpense';
import DailyExpensesGraph from './Components/DailyExpensesGraph';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';

function App() {
  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-tr from-gray-800 to-neutral-900">
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        
        {/* Protected Routes */}
        <Route
          path="/allgroups"
          element={<ProtectedRoute element={<AllGroups />} />}
        />
        <Route
          path="/friends"
          element={<ProtectedRoute element={<Friends />} />}
        />
        <Route
          path="/activity"
          element={<ProtectedRoute element={<DailyExpensesGraph />} />}
        />
        <Route
          path="/createexpense"
          element={<ProtectedRoute element={<CreateExpense />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/createGroup"
          element={<ProtectedRoute element={<CreateGroup />} />}
        />
        <Route
          path="/group/:groupName"
          element={<ProtectedRoute element={<GroupDetail />} />}
        />
        <Route
          path="/CreateExpense/:groupId"
          element={<ProtectedRoute element={<CreateExpense />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
