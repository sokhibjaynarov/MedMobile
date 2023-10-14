import axios from "axios";
import { Fragment, useEffect, useState, lazy } from "react";
import { useTranslation } from "react-i18next";
import CustomProfile from "@components/profile";
import { Home, Plus, Grid, Users, Calendar, CheckSquare } from "react-feather";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
const CashierDoctors = lazy(() => import("../doctors"));
const CashierSchedule = lazy(() => import("../schedule"));
const CashierAdmittance = lazy(() => import("../admittance"));
const CashierDepartments = lazy(() => import("../department"));

const CashierDashboard = () => {
  const tabKeys = {
    HOME: "home",
    RECEPT: "recept",
    DOCTORS: "doctors",
    SCHEDULE: "schedule",
    ADMITTANCE: "admittance",
    DEPARTMENT: "department",
  };
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [active, setActive] = useState(tabKeys.HOME);
  const toggle = (tab) => {
    setActive(tab);
  };
  const keys = {
    room: false,
    floor: false,
    birthday: false,
    position: false,
    department: false,
    specialization: false,
  };

  useEffect(() => {
    axios.get("/profile/data").then(({ data }) => setData(data));
  }, []);
  return (
    <Fragment>
      <CustomProfile keys={keys} data={data?.header || {}} />
      <div className="w-60">
        <Nav pills fill>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.RECEPT}
              onClick={() => toggle(tabKeys.RECEPT)}
            >
              <Plus size="16" />
              {t("Recept")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.HOME}
              onClick={() => toggle(tabKeys.HOME)}
            >
              <Home size="16" />
              {t("Home")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.DOCTORS}
              onClick={() => toggle(tabKeys.DOCTORS)}
            >
              <Users size="16" />
              {t("Doctors")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.ADMITTANCE}
              onClick={() => toggle(tabKeys.ADMITTANCE)}
            >
              <CheckSquare size="16" />
              {t("Recept")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.SCHEDULE}
              onClick={() => toggle(tabKeys.SCHEDULE)}
            >
              <Calendar size="16" />
              {t("Schedule")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="fw-bold"
              active={active === tabKeys.DEPARTMENT}
              onClick={() => toggle(tabKeys.DEPARTMENT)}
            >
              <Grid size="16" />
              {t("Department")}
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId={tabKeys.RECEPT}>
          <CashierSchedule />
        </TabPane>
        <TabPane tabId={tabKeys.HOME}>Home</TabPane>
        <TabPane tabId={tabKeys.DOCTORS}>
          <CashierDoctors />
        </TabPane>
        <TabPane tabId={tabKeys.SCHEDULE}>
          <CashierSchedule />
        </TabPane>
        <TabPane tabId={tabKeys.ADMITTANCE}>
          <CashierAdmittance />
        </TabPane>
        <TabPane tabId={tabKeys.DEPARTMENT}>
          <CashierDepartments />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CashierDashboard;
