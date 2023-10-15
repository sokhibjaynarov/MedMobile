// ** Icons Import
import { Plus, List, User, UserPlus, Users } from "react-feather";

export default [
  {
    header: "Doctors & Staff",
  },
  {
    id: "doctorApp",
    title: "Doctors",
    icon: <User size={20} />,
    children: [
      {
        id: "doctorList",
        title: "List of doctors",
        icon: <List />,
        navLink: "/doctors/list",
      },
      {
        id: "doctorPreview",
        title: "Add doctor",
        icon: <Plus />,
        navLink: "/doctors/add",
      },
    ],
  },
];
