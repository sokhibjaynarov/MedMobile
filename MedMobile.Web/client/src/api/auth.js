import { usePost } from "@/api/shared";

export const useLogin = (data) => usePost({ url: "/Identity/Login", data });
