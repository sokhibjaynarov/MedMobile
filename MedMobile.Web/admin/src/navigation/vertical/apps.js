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
    id: "todo",
    title: "Todo",
    icon: <CheckSquare size={20} />,
    navLink: "/apps/hospitals",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar size={20} />,
    navLink: "/apps/calendar",
  },
  // {
  //   id: 'kanban',
  //   title: 'Kanban',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/kanban'
  // },
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

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  // {
  //   id: 'users',
  //   title: 'User',
  //   icon: <User size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/list'
  //     },
  //     {
  //       id: 'view',
  //       title: 'View',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     }
  //   ]
  // }
];
