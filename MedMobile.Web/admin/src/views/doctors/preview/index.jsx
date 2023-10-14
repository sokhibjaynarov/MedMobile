// ** React Imports
import { Fragment, useState, useEffect } from "react";
// ** Third Party Components
import axios from "axios";
// ** Custom Components
import DoctorCalendar from "./calendar";
import DoctorTimeline from "./Timeline";
import CustomProfile from "@components/profile";
import Breadcrumbs from "@components/breadcrumbs";
// ** Styles
import "@styles/react/pages/page-profile.scss";
import { useTranslation } from "react-i18next";
const Profile = () => {
  // ** Translation
  const { t } = useTranslation();

  // ** States
  const [data, setData] = useState(null);

  // ** Breadcrumb items
  const breadcumbList = [
    { title: t("Doctors"), link: "/doctors/list" },
    { title: "Kitty Allanson" },
  ];

  // ** Available Keys
  const keys = {
    room: true,
    floor: true,
    birthday: true,
    position: true,
    department: true,
    specialization: true,
  };

  useEffect(() => {
    axios.get("/profile/data").then(({ data }) => setData(data));
  }, []);

  return (
    <Fragment>
      <Breadcrumbs data={breadcumbList} />
      <CustomProfile keys={keys} data={data?.header || {}} />
      <DoctorTimeline />
      <DoctorCalendar />
    </Fragment>
  );
};

export default Profile;
