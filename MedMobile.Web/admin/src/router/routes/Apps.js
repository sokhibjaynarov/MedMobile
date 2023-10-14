// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../views/apps/chat"));
const Email = lazy(() => import("../../views/apps/email"));
const Kanban = lazy(() => import("../../views/apps/kanban"));
const Calendar = lazy(() => import("../../views/apps/calendar"));

const ScheduleForm = lazy(() => import("../../views/schedule/form"));
const ScheduleList = lazy(() => import("../../views/schedule/list"));
const SchedulePrint = lazy(() => import("../../views/schedule/print"));
const SchedulePreview = lazy(() => import("../../views/schedule/preview"));

const PersonalForm = lazy(() => import("../../views/personal/form"));
const PersonalList = lazy(() => import("../../views/personal/list"));
const PersonalPrint = lazy(() => import("../../views/personal/print"));
const PersonalPreview = lazy(() => import("../../views/personal/preview"));

const DoctorForm = lazy(() => import("../../views/doctors/form"));
const DoctorList = lazy(() => import("../../views/doctors/list"));
const DoctorPrint = lazy(() => import("../../views/doctors/print"));
const DoctorPreview = lazy(() => import("../../views/doctors/preview"));

const AdmittanceForm = lazy(() => import("../../views/admittance/form"));
const AdmittanceList = lazy(() => import("../../views/admittance/list"));
const AdmittancePrint = lazy(() => import("../../views/admittance/print"));
const AdmittancePreview = lazy(() => import("../../views/admittance/preview"));

const NurseForm = lazy(() => import("../../views/nurse/form"));
const NurseList = lazy(() => import("../../views/nurse/list"));
const NursePrint = lazy(() => import("../../views/nurse/print"));
const NursePreview = lazy(() => import("../../views/nurse/preview"));

const PatientForm = lazy(() => import("../../views/patients/form"));
const PatientList = lazy(() => import("../../views/patients/list"));
const PatientPrint = lazy(() => import("../../views/patients/print"));
const PatientPreview = lazy(() => import("../../views/patients/preview"));

const ReceptionAdd = lazy(() => import("../../views/reception/add"));
const ReceptionList = lazy(() => import("../../views/reception/list"));
const ReceptionEdit = lazy(() => import("../../views/reception/edit"));
const ReceptionPrint = lazy(() => import("../../views/reception/print"));
const ReceptionPreview = lazy(() => import("../../views/reception/preview"));

const DepartmentAdd = lazy(() => import("../../views/department/add"));
const DepartmentList = lazy(() => import("../../views/department/list"));
const DepartmentEdit = lazy(() => import("../../views/department/edit"));
const DepartmentPrint = lazy(() => import("../../views/department/print"));
const DepartmentPreview = lazy(() => import("../../views/department/preview"));

const SpecialtiesAdd = lazy(() => import("../../views/specialties/add"));
const SpecialtiesList = lazy(() => import("../../views/specialties/list"));
const SpecialtiesEdit = lazy(() => import("../../views/specialties/edit"));
const SpecialtiesPrint = lazy(() => import("../../views/specialties/print"));
const SpecialtiesPreview = lazy(() =>
  import("../../views/specialties/preview")
);

const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);

const UserList = lazy(() => import("../../views/apps/user/list"));
const UserView = lazy(() => import("../../views/apps/user/view"));

const AppRoutes = [
  {
    element: <Email />,
    path: "/apps/email",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },
  {
    path: "/apps/chat",
    element: <Chat />,
    meta: {
      appLayout: true,
      className: "chat-application",
    },
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <Kanban />,
    path: "/apps/kanban",
    meta: {
      appLayout: true,
      className: "kanban-application",
    },
  },
  {
    element: <DoctorList />,
    path: "/doctors/list",
  },
  {
    element: <DoctorList />,
    path: "/doctors/list",
  },
  {
    element: <DoctorPreview />,
    path: "/doctors/preview/:id",
  },
  {
    element: <DoctorForm />,
    path: "/doctors/edit/:id",
  },
  {
    element: <DoctorForm />,
    path: "/doctors/add",
  },
  {
    path: "/doctors/print",
    element: <DoctorPrint />,
    meta: { layout: "blank" },
  },
  {
    element: <NurseList />,
    path: "/nurse/list",
  },
  {
    element: <NursePreview />,
    path: "/nurse/preview/:id",
  },
  {
    element: <NurseForm />,
    path: "/nurse/edit/:id",
  },
  {
    element: <NurseForm />,
    path: "/nurse/add",
  },
  {
    path: "/nurse/print",
    element: <NursePrint />,
    meta: { layout: "blank" },
  },
  {
    element: <AdmittanceList />,
    path: "/admittance/list",
  },
  {
    element: <AdmittancePreview />,
    path: "/admittance/preview/:id",
  },
  {
    element: <AdmittanceForm />,
    path: "/admittance/add",
  },
  {
    path: "/admittance/print",
    element: <AdmittancePrint />,
    meta: { layout: "blank" },
  },
  {
    element: <PatientList />,
    path: "/patient/list",
  },
  {
    element: <PatientPreview />,
    path: "/patient/preview/:id",
  },
  {
    element: <PatientForm />,
    path: "/patient/edit/:id",
  },
  {
    element: <PatientForm />,
    path: "/patient/add",
  },
  {
    path: "/patient/print",
    element: <PatientPrint />,
    meta: { layout: "blank" },
  },
  {
    element: <PersonalList />,
    path: "/personal/list",
  },
  {
    element: <PersonalPreview />,
    path: "/personal/preview/:id",
  },
  {
    element: <PersonalForm />,
    path: "/personal/edit/:id",
  },
  {
    element: <PersonalForm />,
    path: "/personal/add",
  },
  {
    path: "/personal/print",
    element: <PersonalPrint />,
    meta: { layout: "blank" },
  },

  {
    element: <ReceptionList />,
    path: "/reception/list",
  },
  {
    element: <ReceptionPreview />,
    path: "/reception/preview/:id",
  },
  {
    element: <ReceptionEdit />,
    path: "/reception/edit/:id",
  },
  {
    element: <ReceptionAdd />,
    path: "/reception/add",
  },
  {
    path: "/reception/print",
    element: <ReceptionPrint />,
    meta: { layout: "blank" },
  },
  {
    element: <DepartmentList />,
    path: "/department/list",
  },
  {
    element: <DepartmentPreview />,
    path: "/department/preview/:id",
  },
  {
    element: <DepartmentEdit />,
    path: "/department/edit/:id",
  },
  {
    element: <DepartmentAdd />,
    path: "/department/add",
  },
  {
    path: "/department/print",
    element: <DepartmentPrint />,
    meta: { layout: "blank" },
  },
  {
    element: <SpecialtiesList />,
    path: "/specialties/list",
  },
  {
    element: <SpecialtiesList />,
    path: "/specialties/list",
  },
  {
    element: <SpecialtiesPreview />,
    path: "/specialties/preview/:id",
  },
  {
    element: <SpecialtiesEdit />,
    path: "/specialties/edit/:id",
  },
  {
    element: <SpecialtiesAdd />,
    path: "/specialties/add",
  },
  {
    path: "/specialties/print",
    element: <SpecialtiesPrint />,
    meta: { layout: "blank" },
  },
  {
    element: <ScheduleList />,
    path: "/invoice/list",
  },
  {
    element: <SchedulePreview />,
    path: "/invoice/preview/:id",
  },
  {
    element: <ScheduleForm />,
    path: "/invoice/edit/:id",
  },
  {
    element: <ScheduleForm />,
    path: "/invoice/add",
  },
  {
    path: "/invoice/print",
    element: <SchedulePrint />,
    meta: { layout: "blank" },
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <UserList />,
    path: "/apps/user/list",
  },
  {
    path: "/apps/user/view",
    element: <Navigate to="/apps/user/view/1" />,
  },
  {
    element: <UserView />,
    path: "/apps/user/view/:id",
  },
];
export default AppRoutes;
