import axiosInstance from "@/utilities/configureAxios";

export const addHolidayList = async (payload) => {
  const response = await axiosInstance.post("/holiday", payload);
  return response?.data;
};
export const updateHolidayList = async (payload) => {
  const response = await axiosInstance.put("/holiday", payload);
  return response?.data;
};
export const getHolidayList = async () => {
  const response = await axiosInstance.get(`/holidays`);
  return response?.data;
};
export const GetHolidayById = async (payload) => {
  const response = await axiosInstance.get(`/holiday/${payload}`);
  return response?.data;
};
export const DeleteHolidayById = async (payload) => {
  console.log(payload, "---");
  const response = await axiosInstance.delete(`/holiday/${payload}`);
  return response?.data;
};
export const addAssignTeacherList = async (payload) => {
  const response = await axiosInstance.post("/assign-class", payload);
  return response?.data;
};
export const updateAssignList = async (payload) => {
  const response = await axiosInstance.put("/assign-class", payload);
  return response?.data;
};
export const getAssignList = async () => {
  const response = await axiosInstance.get(`/assigned-classes`);
  return response?.data;
};
export const GetAssignById = async (payload) => {
  const response = await axiosInstance.get(`/assigned-class/${payload}`);
  return response?.data;
};
export const DeleteAssignById = async (payload) => {
  console.log(payload, "---");
  const response = await axiosInstance.delete(`/assign-class/${payload}`);
  return response?.data;
};
export const addAttendance = async (payload) => {
  const response = await axiosInstance.post("/attendences", payload);
  return response?.data?.data;
};
export const addMarkAttendance = async (payload) => {
  const response = await axiosInstance.post("/mark-attendence", payload);
  return response?.data?.data;
};
