// ** Icons Import
import { Plus, List, User, CheckSquare } from "react-feather";

export default [
  {
    header: "Patients & Receptions",
  },
  {
    id: "patientApp",
    title: "Patients",
    icon: <User size={20} />,
    children: [
      {
        id: "patientList",
        title: "List of patients",
        icon: <List />,
        navLink: "/patient/list",
      },
      {
        id: "patientAdd",
        title: "Add patient",
        icon: <Plus />,
        navLink: "/patient/add",
      },
    ],
  },
  {
    id: "receptApp",
    title: "Recept",
    icon: <CheckSquare size={20} />,
    children: [
      {
        id: "receptList",
        title: "Reception list",
        icon: <List />,
        navLink: "/admittance/list",
      },
      {
        id: "receptAdd",
        title: "Add recept",
        icon: <Plus />,
        navLink: "/admittance/add",
      },
    ],
  },
];
