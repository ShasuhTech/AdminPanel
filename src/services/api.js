import axiosInstance from "@/utilities/configureAxios";
import axios from "axios";
import { Pyramid } from "mdi-material-ui";

// All api endpoint
export const loginUser = async (payload) => {
  const response = await axios.post(
    `https://salon-apis.deepmindz.co/admin/auth/login`,
    payload
  );
  return response;
};

// export const getTopSalonOrderDetails = async (payload) => {
//   const response = await axiosInstance.get("admin/salon/getTopSalonList", {
//     params: payload,
//   });
//   return response?.data;
// };



export const StateData = async (payload) => {
  const response = await axiosInstance.post("/states", payload);
  return response?.data;
};

export const cityData = async (payload) => {
  const response = await axiosInstance.post("/cities", payload);
  return response?.data;
};
export const countryData = async (payload) => {
  const response = await axiosInstance.post("/country", payload);
  return response?.data;
};

export const AddStudent = async (payload) => {
  const response = await axiosInstance.post("/student", payload);
  return response?.data;
};
export const GetStudentLsit = async (payload) => {
  const response = await axiosInstance.get("/student");
  return response?.data;
};
export const GetStudentListById = async (payload) => {
  const response = await axiosInstance.get(`/student/${payload}`);
  return response?.data;
};
