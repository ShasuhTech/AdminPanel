

import axiosInstance from "@/utilities/configureAxios";
import axios from "axios";
import { Pyramid } from "mdi-material-ui";


export const GetSchoolList = async (payload) => {
  const response = await axiosInstance.get("/school");
  return response?.data;
};

export const AddSchool = async (payload) => {
  const response = await axiosInstance.post("/school", payload);
  return response?.data;
};
export const updateSchool = async (payload) => {
  const response = await axiosInstance.put("/school", payload);
  return response?.data;
};

// export const cityData = async (payload) => {
//   const response = await axiosInstance.post("/api/v1/cities", payload);
//   return response?.data;
// };
// export const countryData = async (payload) => {
//   const response = await axiosInstance.post("/api/v1/country", payload);
//   return response?.data;
// };
