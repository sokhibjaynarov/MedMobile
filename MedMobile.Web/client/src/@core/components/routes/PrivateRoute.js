// ** React Imports
import { Navigate } from "react-router-dom";
import { useContext, Suspense } from "react";
// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";
import { getUserData } from "../../../utility/Utils";
// import { USER_ROLE } from "../../../utility/constants";

const PrivateRoute = ({ children, route }) => {
  // const { CASHIER } = USER_ROLE;
  // ** Hooks & Vars
  const user = getUserData();
  const ability = useContext(AbilityContext);

  if (route) {
    let action = null;
    let resource = null;
    let restrictedRoute = false;

    if (route.meta) {
      action = route.meta.action;
      resource = route.meta.resource;
      restrictedRoute = route.meta.restricted;
    }
    if (!user) {
      return <Navigate to="/login" />;
    }
    // if (user && restrictedRoute) {
    //   return <Navigate to="/" />;
    // }
    // if (user && user.role === CASHIER) {
    //   return <Navigate to="/cashier" />;
    // }
    // if (user && !ability.can(action || "read", resource)) {
    //   return <Navigate to="/misc/not-authorized" replace />;
    // }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};
export default PrivateRoute;
