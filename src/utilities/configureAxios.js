import axios from "axios";
import { getCookie } from "./cookies";
import { Cookies } from "@/config/cookies";
import { toast } from "react-toastify";
// import { showToast } from "./toast"; // Assuming showToast is a function to show toast messages

// Get token from cookie
const token = getCookie(Cookies.TOKEN);

let axiosInstance = null;
if (token) {
  axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_HOST,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error,'-dfsdf')
      // Handle errors globally
      if (error.response && error.response.status === 500) {
        // toast.error("Internal Server Error"); // Show toast message for 500 error
      }
      return Promise.reject(error);
    }
  );
}

// Export Axios instance
export default axiosInstance;
