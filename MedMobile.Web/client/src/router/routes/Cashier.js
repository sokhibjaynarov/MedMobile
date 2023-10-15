import { lazy } from "react";

const CashierDoctor = lazy(() => import("../../views/cashier/doctors"));
const CashierSchedule = lazy(() => import("../../views/cashier/schedule"));
const CashierDashboard = lazy(() => import("../../views/cashier/dashboard"));
const CashierDepartment = lazy(() => import("../../views/cashier/department"));
const CashierAdmittance = lazy(() => import("../../views/cashier/admittance"));

const CashierRoutes = [
  {
    path: "/cashier",
    index: true,
    element: <CashierDashboard />,
  },
  {
    path: "/cashier/doctors",
    element: <CashierDoctor />,
  },
  {
    path: "/cashier/admittance",
    element: <CashierAdmittance />,
  },
  {
    path: "/cashier/schedule",
    element: <CashierSchedule />,
  },
  {
    path: "/cashier/department",
    element: <CashierDepartment />,
  },
];
export default CashierRoutes;
