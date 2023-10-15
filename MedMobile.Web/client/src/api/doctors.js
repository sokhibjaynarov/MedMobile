import {useGet, usePost} from "@/api/shared";

export const fetchAllDoctors = (params) => useGet({url: "/Doctors/GetAllDoctors",params});
export const createDoctor = () => usePost({url: "/doctors"});
export const createSession = () => usePost({url: "/Session/AddSession"});