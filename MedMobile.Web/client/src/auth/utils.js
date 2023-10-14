import useJwt from "@src/@core/auth/jwt/useJwt";
import { USER_ROLE } from "@/utility/constants";
const { ADMIN, CASHIER } = USER_ROLE;

// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return (
    localStorage.getItem("userData") &&
    localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  );
};

export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

export const getHomeRouteForLoggedInUser = (userRole) => {
  console.log("auth userRole", userRole);
  if (userRole === ADMIN) return "/";
  if (userRole === CASHIER) return "/cashier";
  return { name: "auth-login" };
};
