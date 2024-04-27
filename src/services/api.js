import axiosInstance from "@/utilities/configureAxios";
import axios from "axios";
import { Pyramid } from "mdi-material-ui";

// All api endpoint
export const loginUser = async (payload) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}admin/auth/login`,
    payload
  );
  return response;
};

export const salonList = async (payload) => {
  const response = await axiosInstance.get("admin/salon/list", {
    params: payload,
  });
  return response;
};
export const getApprovedRating = async (payload) => {
  const res = await axiosInstance.get(`admin/ratings/list?&status=2`, {
    params: payload,
  });
  return res;
};

// export const salonListByid = async (payload) => {
//   const response = await axiosInstance.get(
//     `admin/salon/list/${payload?.id}?include=${payload?.include}`
//   );
//   return response?.data;
// };

export const salonListByid = async (payload) => {
  const response = await axiosInstance.get(`admin/salon/list/${payload?.id}`, {
    params: payload,
  });
  return response?.data;
};
// address,users,services,Certificates,slots,packages,offers

export const approveSalonDeatils = async (payload) => {
  const response = await axiosInstance.patch(
    "admin/salon/udpateStatus",
    payload
  );
  return response?.data;
};

export const addServices = async (payload) => {
  const response = await axiosInstance.post("admin/addService", payload);
  return response?.data;
};

export const serviceList = async (payload) => {
  const response = await axiosInstance.get("admin/services", {
    params: payload,
  });
  return response?.data;
};

export const customServiceList = async (payload) => {
  const response = await axiosInstance.get(
    "admin/salon/getCustomServiceListForApproval",
    {
      params: payload,
    }
  );
  return response?.data;
};

export const pendingOfferList = async (payload) => {
  const response = await axiosInstance.get("admin/salon/offers/list", {
    params: payload,
  });
  return response?.data;
};

export const pendingCombosList = async (payload) => {
  const response = await axiosInstance.get("admin/salon/getSalonPackages", {
    params: payload,
  });
  return response?.data;
};

export const updateStatusCustomService = async (payload) => {
  const response = await axiosInstance.patch(
    "admin/salon/updateCustomServiceStatus",
    payload
  );
  return response?.data;
};

export const updateStatusCustomOffers = async (payload) => {
  const response = await axiosInstance.patch(
    "admin/salon/approveSalonOffer",
    payload
  );
  return response?.data;
};

export const updateStatusCustomCombo = async (payload) => {
  const response = await axiosInstance.patch(
    "admin/salon/approveSalonCombo",
    payload
  );
  return response?.data;
};

export const adminCategory = async ({ payload }) => {
  const response = await axiosInstance.get("admin/category", {
    params: payload,
  });
  return response?.data;
};

export const getSalonRequestChange = async () => {
  const response = await axiosInstance.get(
    "admin/salon/getSalonRequestChange",
    {
      params: payload,
    }
  );
  return response?.data;
};
export const topSalonList = async () => {
  const response = await axiosInstance.get("admin/salon/getTopSalonList");
  return response?.data;
};

export const requestChangeAproval = async (payload) => {
  const response = await axiosInstance.patch(
    "admin/salon/udpateRequestChangeStatus",
    payload
  );
  return response?.data;
};

export const getSalonOrderDetails = async () => {
  const response = await axiosInstance.get("admin/salon/getSalonOrder");
  return response?.data;
};

export const getTopSalonOrderDetails = async (payload) => {
  const response = await axiosInstance.get("admin/salon/getTopSalonList", {
    params: payload,
  });
  return response?.data;
};
