import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "./utils/AxiosInstance";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await AxiosInstance.post("/register", {
        name,
        email,
        password,
        contact:phoneNumber,
      });
      console.log(response.status);
      

      if (response.status === 200) {
        setSuccess("Sign-up successful! Redirecting to login...");
        navigate("/")
      }
    } catch (err) {
      console.error("Sign-up failed:", err);
      setError(err.response?.data?.message || "Sign-up failed. Please try again.");
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp} className="mt-4 md:mt-6 space-y-4">
            <div>
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Your Password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold text-sm md:text-base">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                placeholder="Your Phone Number"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm md:text-base text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm md:text-base text-center">{success}</p>
            )}
            <button
              type="submit"
              className="w-full bg-cyan-900 text-white font-semibold p-2 rounded-lg hover:bg-black transition text-sm md:text-base"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center text-sm md:text-base">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
