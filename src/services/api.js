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
export const UpdateStudent = async (payload) => {
  const response = await axiosInstance.put("/register-stundent", payload);
  return response?.data;
};
export const GetStudentLsit = async (payload) => {
  console.log(payload,'---payload')
  const response = await axiosInstance.get("/student", {
    params: payload,
  });
  return response?.data;
};
export const GetStudentListById = async (payload) => {
  const response = await axiosInstance.get(`/student/${payload}`);
  return response?.data;
};
export const AddFollowup = async (payload) => {
  const response = await axiosInstance.post("/follow-up", payload);
  return response?.data;
};
export const GetFollowupList = async (payload) => {
  const response = await axiosInstance.post("/follow-ups", payload);
  return response?.data;
};
export const GetStudentById = async (payload) => {
  const response = await axiosInstance.get(`/follow-up/${payload}`);
  return response?.data;
};
export const DeleteStudentById = async (payload) => {
  const response = await axiosInstance.delete(`/follow-up/${payload}`);
  return response?.data;
};
export const postAssignRollNo = async (payload) => {
  const response = await axiosInstance.post("/assign-roll-number", payload);
  return response?.data;
};
export const postAssignFeeGroup = async (payload) => {
  const response = await axiosInstance.post("/assig-fee-group", payload);
  return response?.data;
};
