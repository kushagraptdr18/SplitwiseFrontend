import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./utils/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await AxiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true } // To include cookies
      );
      console.log(response.data);
      
    if(response.data.token) localStorage.setItem('token', response.data.token);

      if (response.status === 200) {
        navigate("/"); // Redirect to the homepage or dashboard on successful login
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-black flex-col items-center justify-center p-6 md:p-8 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-black pointer-events-none animate-pulse"></div>
          <img
            src="https://media.giphy.com/media/kWLigFfTNb4AIHAghd/giphy.gif"
            alt="Money Transfer Animation"
            className="w-full max-w-[300px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h2 className="mt-6 text-xl md:text-2xl text-white font-semibold text-center">
            Split Expenses Easily!
          </h2>
          <p className="mt-2 text-white text-opacity-75 text-sm md:text-base text-center">
            Track, split, and settle up with friends 💰
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center mb-6">
            Login
          </h2>
          <form
            onSubmit={handleLogin}
            className="mt-4 md:mt-6 space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm md:text-base text-center">{error}</p>
            )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-900 text-white font-semibold p-3 rounded-lg hover:bg-black transition text-sm md:text-base"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-gray-600 text-center text-sm md:text-base">
            No account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
