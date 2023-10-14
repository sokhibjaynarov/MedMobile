// ** Icons Import
import {
  Home,
  Plus,
  List,
  Command,
  Award,
  Hexagon,
  Aperture,
  Bell,
} from "react-feather";

export default [
  {
    header: "Reception & Branches",
  },
  {
    id: "receptionApp",
    title: "Reception",
    icon: <Command />,
    children: [
      {
        id: "receptionList",
        title: "All registration personnel",
        icon: <List />,
        navLink: "/reception/list",
      },
      {
        id: "receptionPreview",
        title: "Add personal",
        icon: <Plus />,
        navLink: "/reception/add",
      },
    ],
  },
  {
    id: "departmentApp",
    title: "Departments",
    icon: <Home />,
    children: [
      {
        id: "departmentList",
        title: "All departments",
        icon: <List />,
        navLink: "/department/list",
      },
      {
        id: "departmentPreview",
        title: "Add department",
        icon: <Plus />,
        navLink: "/department/add",
      },
    ],
  },
  {
    id: "specialtiesApp",
    title: "Specialties",
    icon: <Award />,
    children: [
      {
        id: "specialtiesList",
        title: "List of specialties",
        icon: <List />,
        navLink: "/specialties/list",
      },
      {
        id: "specialtiesPreview",
        title: "Add specialty",
        icon: <Plus />,
        navLink: "/specialties/add",
      },
    ],
  }
];
