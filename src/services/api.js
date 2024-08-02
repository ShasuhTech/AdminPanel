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
export const updateFollowup = async (payload) => {
  const response = await axiosInstance.put("/follow-up", payload);
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
export const postAssignsectionStream = async (payload) => {
  const response = await axiosInstance.post("/section-stream-update", payload);
  return response?.data;
};

export const AddAgeCriteria = async (payload) => {
  const response = await axiosInstance.post("/age-criteria", payload);
  return response?.data;
};
export const updateAgeCriteria = async (payload) => {
  const response = await axiosInstance.put("/age-criteria", payload);
  return response?.data;
};
export const GetAgeCriteriaList = async (payload) => {
  const response = await axiosInstance.post("/age-criteria");
  return response?.data;
};
export const GetAgeCriteriaId = async (payload) => {
  const response = await axiosInstance.get(`/age-criteria/${payload}`);
  return response?.data;
};
export const DeleteAgeCriteriaId = async (payload) => {
  const response = await axiosInstance.delete(`/age-criteria/${payload}`);
  return response?.data;
};
export const AddTimeSlot = async (payload) => {
  const response = await axiosInstance.post("/timeslot", payload);
  return response?.data;
};
export const updateTimeSlot = async (payload) => {
  const response = await axiosInstance.put("/timeslot", payload);
  return response?.data;
};
export const GetTimeSlotList = async (payload) => {
  const response = await axiosInstance.get("/timeslot");
  return response?.data;
};
export const GetTimeSlotId = async (payload) => {
  const response = await axiosInstance.get(`/timeslot/${payload}`);
  return response?.data;
};
export const DeleteTimeSlotId = async (payload) => {
  const response = await axiosInstance.delete(`/timeslot/${payload}`);
  return response?.data;
};

export const AddRegistrationStart = async (payload) => {
  const response = await axiosInstance.post("/registration-start", payload);
  return response?.data;
};
export const updateRegistrationStart = async (payload) => {
  const response = await axiosInstance.put("/registration-start", payload);
  return response?.data;
};
export const GetRegistrationStartList = async (payload) => {
  const response = await axiosInstance.get("/registration-start");
  return response?.data;
};
export const GetRegistrationStartId = async (payload) => {
  const response = await axiosInstance.get(`/registration-start/${payload}`);
  return response?.data;
};
export const DeleteRegistrationStartId = async (payload) => {
  const response = await axiosInstance.delete(`/registration-start/${payload}`);
  return response?.data;
};

export const AddAccountType = async (payload) => {
  const response = await axiosInstance.post("/account-type", payload);
  return response?.data;
};
export const updateAccountType = async (payload) => {
  const response = await axiosInstance.put("/account-type", payload);
  return response?.data;
};
export const GetAccountTypeList = async (payload) => {
  const response = await axiosInstance.get("/account-type");
  return response?.data;
};
export const GetAccountTypeId = async (payload) => {
  const response = await axiosInstance.get(`/account-type/${payload}`);
  return response?.data;
};
export const DeleteAccountTypeId = async (payload) => {
  const response = await axiosInstance.delete(`/account-type/${payload}`);
  return response?.data;
};

export const AddStaffCategory = async (payload) => {
  const response = await axiosInstance.post("/staff-category", payload);
  return response?.data;
};
export const updateStaffCategory = async (payload) => {
  const response = await axiosInstance.put("/staff-category", payload);
  return response?.data;
};
export const GetStaffCategoryList = async (payload) => {
  const response = await axiosInstance.get("/staff-category");
  return response?.data;
};
export const GetStaffCategoryId = async (payload) => {
  const response = await axiosInstance.get(`/staff-category/${payload}`);
  return response?.data;
};
export const DeleteStaffCategoryId = async (payload) => {
  const response = await axiosInstance.delete(`/staff-category/${payload}`);
  return response?.data;
};

export const AddDepartment = async (payload) => {
  const response = await axiosInstance.post("/department", payload);
  return response?.data;
};
export const updateDepartment = async (payload) => {
  const response = await axiosInstance.put("/department", payload);
  return response?.data;
};
export const GetDepartmentList = async (payload) => {
  const response = await axiosInstance.get("/department");
  return response?.data;
};
export const GetDepartmentId = async (payload) => {
  const response = await axiosInstance.get(`/department/${payload}`);
  return response?.data;
};
export const DeleteDepartmentId = async (payload) => {
  const response = await axiosInstance.delete(`/department/${payload}`);
  return response?.data;
};

export const AddOccupation = async (payload) => {
  const response = await axiosInstance.post("/occupation", payload);
  return response?.data;
};
export const updateOccupation = async (payload) => {
  const response = await axiosInstance.put("/occupation", payload);
  return response?.data;
};
export const GetOccupationList = async (payload) => {
  const response = await axiosInstance.get("/occupation");
  return response?.data;
};
export const GetOccupationId = async (payload) => {
  const response = await axiosInstance.get(`/occupation/${payload}`);
  return response?.data;
};
export const DeleteOccupationId = async (payload) => {
  const response = await axiosInstance.delete(`/occupation/${payload}`);
  return response?.data;
};

export const AddDesignation = async (payload) => {
  const response = await axiosInstance.post("/designation", payload);
  return response?.data;
};
export const updateDesignation = async (payload) => {
  const response = await axiosInstance.put("/designation", payload);
  return response?.data;
};
export const GetDesignationList = async (payload) => {
  const response = await axiosInstance.get("/designation");
  return response?.data;
};
export const GetDesignationId = async (payload) => {
  const response = await axiosInstance.get(`/designation/${payload}`);
  return response?.data;
};
export const DeleteDesignationId = async (payload) => {
  const response = await axiosInstance.delete(`/designation/${payload}`);
  return response?.data;
};

export const AddSubject = async (payload) => {
  const response = await axiosInstance.post("/subject", payload);
  return response?.data;
};
export const updateSubject = async (payload) => {
  const response = await axiosInstance.put("/subject", payload);
  return response?.data;
};
export const GetSubjectList = async (payload) => {
  const response = await axiosInstance.get("/subject");
  return response?.data;
};
export const GetSubjectId = async (payload) => {
  const response = await axiosInstance.get(`/subject/${payload}`);
  return response?.data;
};
export const DeleteSubjectId = async (payload) => {
  const response = await axiosInstance.delete(`/subject/${payload}`);
  return response?.data;
};

export const AddEducationalQualification = async (payload) => {
  const response = await axiosInstance.post("/education-qualification", payload);
  return response?.data;
};
export const updateEducationalQualification = async (payload) => {
  const response = await axiosInstance.put("/education-qualification", payload);
  return response?.data;
};
export const GetEducationalQualificationList = async (payload) => {
  const response = await axiosInstance.get("/education-qualification");
  return response?.data;
};
export const GetEducationalQualificationId = async (payload) => {
  const response = await axiosInstance.get(`/education-qualification/${payload}`);
  return response?.data;
};
export const DeleteEducationalQualificationId = async (payload) => {
  const response = await axiosInstance.delete(`/education-qualification/${payload}`);
  return response?.data;
};

export const AddNatureOfAppointment = async (payload) => {
  const response = await axiosInstance.post("/nature-of-appointment", payload);
  return response?.data;
};
export const updateNatureOfAppointment = async (payload) => {
  const response = await axiosInstance.put("/nature-of-appointment", payload);
  return response?.data;
};
export const GetNatureOfAppointmentList = async (payload) => {
  const response = await axiosInstance.get("/nature-of-appointment");
  return response?.data;
};
export const GetNatureOfAppointmentId = async (payload) => {
  const response = await axiosInstance.get(`/nature-of-appointment/${payload}`);
  return response?.data;
};
export const DeleteNatureOfAppointmentId = async (payload) => {
  const response = await axiosInstance.delete(`/nature-of-appointment/${payload}`);
  return response?.data;
};

