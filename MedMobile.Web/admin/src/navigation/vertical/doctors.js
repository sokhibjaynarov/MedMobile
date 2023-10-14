// ** Icons Import
import { Plus, List, User, UserPlus, Users } from 'react-feather'

export default [
  {
    header: 'Doctors & Staff'
  },
  {
    id: 'doctorApp',
    title: 'Doctors',
    icon: <User size={20} />,
    children: [
      {
        id: 'doctorList',
        title: 'List of doctors',
        icon: <List />,
        navLink: '/doctors/list'
      },
      {
        id: 'doctorPreview',
        title: 'Add doctor',
        icon: <Plus />,
        navLink: '/doctors/add'
      }
    ]
  },
  {
    id: 'nurseApp',
    title: 'Nurses / Orderlies',
    icon: <Users />,
    children: [
      {
        id: 'nurseList',
        title: 'Nurses - Orderlies list',
        icon: <List />,
        navLink: '/nurse/list'
      },
      {
        id: 'nursePreview',
        title: 'Add Nurses / Orderlies',
        icon: <Plus />,
        navLink: '/nurse/add'
      }
    ]
  },
  {
    id: 'personalApp',
    title: 'Personal',
    icon: <UserPlus />,
    children: [
      {
        id: 'personalList',
        title: 'List of personal',
        icon: <List />,
        navLink: '/personal/list'
      },
      {
        id: 'personalPreview',
        title: 'Add personal',
        icon: <Plus />,
        navLink: '/personal/add'
      }
    ]
  }
]
