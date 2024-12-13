import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store user info
  const navigate = useNavigate();

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userDetails", {
          withCredentials: true,
        });

        console.log(response.data);
        

        if (response.data !== "not logged in") {
          setUser(response.data); // Set user data if logged in
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUser(null); // Reset user state if API call fails
      }
    };

    fetchUserDetails();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
      localStorage.setItem('token',"");
      localStorage.setItem('authToken',"");

      setUser(null); // Clear user data
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full h-auto md:h-28 py-2 bg-black">
      {/* Top Navbar */}
      <div className="w-full h-auto md:h-14 mb-1 px-2 md:px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center gap-4 md:gap-10 h-auto md:h-14">
          <img className="w-20 h-14 md:w-28 md:h-20" src="/split.png" alt="split" />
          
        </div>

        <div className="h-auto md:h-14 gap-4 md:gap-10 flex items-center justify-center md:pr-8">
          {user ? (
            <>
              <span className="text-white text-sm md:text-base">Hello, {user.user.name}!</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-all"
              >
                SIGN UP
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all"
              >
                LOGIN
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Navbar Links */}
      <div className="w-full h-12 md:h-8 px-2 md:px-[5%] flex items-center justify-between md:justify-center gap-4 md:gap-14 text-white overflow-x-auto">
        <Link className="text-sm md:text-base whitespace-nowrap" to="/">Home</Link>
        <Link className="text-sm md:text-base whitespace-nowrap" to="/allgroups">
          {user ? "Groups" : "Login to see your groups"}
        </Link>
    <Link className="text-sm md:text-base whitespace-nowrap" to="/createexpense">Expense</Link>
        <Link className="text-sm md:text-base whitespace-nowrap" to="/activity">Activity</Link>
        <Link className="text-sm md:text-base whitespace-nowrap" to="/profile">Account</Link>
      </div>
    </div>
  );
};

export default Navbar;
