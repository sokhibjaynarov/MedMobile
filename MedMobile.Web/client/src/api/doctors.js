import {useGet, usePost} from "@/api/shared";

export const fetchAllDoctors = () => useGet({url: "/doctors/all"});
export const createDoctor = () => usePost({url: "/doctors"});
export const createSession = () => usePost({url: "/Session/AddSession"});