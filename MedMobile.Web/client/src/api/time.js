import {useGet, usePost} from "@/api/shared";

export const createSession = () => usePost({url: "/Session/AddSession"});
export const createTimeLine = (data) => usePost({url: "/Timeline/AddTimeline", data});
export const getDoctorTimeLines = (params) => useGet({url: "/Timeline/GetDoctorTimeLines", params});
export const getSessions = (params) => useGet({url: "/Session/GetAllSessions", params});