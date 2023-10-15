import { useGet, usePost } from "@/api/shared";

export const createHospital = (data) =>
  usePost({ url: "/Hospitals/AddHospital", data });

export const fetchAllHospital = (params) =>
  useGet({ url: "/Hospitals/GetAllHospitals", params });
