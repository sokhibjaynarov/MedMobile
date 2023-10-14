// ** Custom Components
import { Fragment } from "react";
import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import Timeline from "@components/timeline";
import { useTranslation } from "react-i18next";

// ** Icons Imports
import { List } from "react-feather";

// ** Reactstrap Imports
import { Badge, Card, CardHeader, CardTitle, CardBody } from "reactstrap";

// ** Images
import avatar6 from "@src/assets/images/portrait/small/avatar-s-6.jpg";

// ** Avatar Imports
import avatar9 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import avatar8 from "@src/assets/images/portrait/small/avatar-s-8.jpg";
import "./index.scss";

const DoctorTimeline = () => {
  const { t } = useTranslation();
  const data = [
    {
      color: "warning",
      customContent: (
        <Fragment>
          <div className="d-flex align-items-center">
            <Avatar size="lg" img={avatar9} />
            <div className="ms-50">
              <Link to="/patient/preview/5035">
                {/* /dr/1/admittance/5035/update linkga navigate qilish kerak */}
                <h6 className="mb-0 fullname">John Doe (Client)</h6>
              </Link>
              <span className="fw-bold">15.04.1985</span>
            </div>
          </div>
          <ul className="details">
            <li>
              <Badge color="light-warning" className="badge">
                {t("Status")}: {t("Pending")}
              </Badge>
            </li>
            <li>
              <span className="fw-bold text-center">
                {t("Reception start time")}: 14:10
              </span>
            </li>
            <li>
              <span className="fw-bold flex-fill text-center">
                {t("Reception end time")}: 15:25
              </span>
            </li>
          </ul>
        </Fragment>
      ),
    },
    {
      color: "info",
      customContent: (
        <Fragment>
          <div className="d-flex align-items-center">
            <Avatar size="lg" img={avatar6} />
            <div className="ms-50">
              <Link to="/patient/preview/5035">
                {/* /dr/1/admittance/5035/update linkga navigate qilish kerak */}
                <h6 className="mb-0 fullname">Jane Doe</h6>
              </Link>
              <span className="fw-bold">24.07.1988</span>
            </div>
          </div>
          <ul className="details">
            <li>
              <Badge color="light-info" className="badge">
                {t("Status")}: {t("At the reception")}
              </Badge>
            </li>
            <li>
              <span className="fw-bold text-center">
                {t("Reception start time")}: 14:10
              </span>
            </li>
            <li>
              <span className="fw-bold flex-fill text-center">
                {t("Reception end time")}: 15:25
              </span>
            </li>
          </ul>
        </Fragment>
      ),
    },
    {
      color: "success",
      customContent: (
        <Fragment>
          <div className="d-flex align-items-center">
            <Avatar size="lg" img={avatar8} />
            <div className="ms-50">
              <Link to="/patient/preview/5035">
                {/* /dr/1/admittance/5035/update linkga navigate qilish kerak */}
                <h6 className="mb-0 fullname">Jack Mine</h6>
              </Link>
              <span className="fw-bold">24.07.1988</span>
            </div>
          </div>
          <ul className="details">
            <li>
              <Badge color="light-success" className="badge">
                {t("Status")}: {t("Received")}
              </Badge>
            </li>
            <li>
              <span className="fw-bold text-center">
                {t("Reception start time")}: 14:10
              </span>
            </li>
            <li>
              <span className="fw-bold flex-fill text-center">
                {t("Reception end time")}: 15:25
              </span>
            </li>
          </ul>
        </Fragment>
      ),
    },
  ];
  return (
    <Card className="card-user-timeline">
      <CardHeader>
        <div className="d-flex align-items-center">
          <List className="user-timeline-title-icon" />
          <CardTitle className="fw-bold" tag="h2">
            {t("Patients today")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <Timeline className="ms-50 mb-0" data={data} />
      </CardBody>
    </Card>
  );
};
export default DoctorTimeline;
