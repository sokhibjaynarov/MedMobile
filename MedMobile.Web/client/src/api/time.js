import {useGet, usePost} from "@/api/shared";

export const createSession = () => usePost({url: "/Session/AddSession"});
export const createTimeLine = (data) => usePost({url: "/Timeline/AddTimeline", data});
export const getDoctorTimeLines = (query) => useGet({url: "/Timeline/GetDoctorTimeLines", query});