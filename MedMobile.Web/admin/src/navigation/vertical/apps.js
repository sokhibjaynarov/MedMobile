// ** Icons Import
import {
  Plus,
  List,
  FileText,
  Calendar,
  MessageSquare,
  CheckSquare,
} from "react-feather";

export default [
  {
    header: "Schedule",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
  {
    id: "clinics",
    title: "Klinikalar",
    icon: <CheckSquare size={20} />,
    navLink: "/apps/hospitals",
  },
  {
    id: "invoiceApp",
    title: "Schedule",
    icon: <FileText size={20} />,
    children: [
      {
        id: "invoiceList",
        title: "Schedule List",
        icon: <List />,
        navLink: "/invoice/list",
      },
      {
        id: "addSchedule",
        title: "Add Schedule",
        icon: <Plus />,
        navLink: "/invoice/add",
      },
    ],
  },
];
