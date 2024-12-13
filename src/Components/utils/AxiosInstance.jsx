import axios from "axios";

// Create an instance of axios with custom configurations
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Base URL for your API
  headers: {
    "Content-Type": "application/json", // Set default content type to JSON
  },
  withCredentials: true, // Include cookies for cross-origin requests (if you're using cookies)
});


export default AxiosInstance;
