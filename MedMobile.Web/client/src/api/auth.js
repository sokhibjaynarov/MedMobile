import { usePost } from "@/api/shared";

export const useLogin = (data) => usePost({ url: "/Identity/Login", data });
export const useRegister = (data) =>
  usePost({ url: "/Users/RegisterPatient", data });
