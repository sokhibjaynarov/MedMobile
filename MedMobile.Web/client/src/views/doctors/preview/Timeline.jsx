// ** Custom Components
import {Fragment, useState} from "react";
import Avatar from "@components/avatar";
import {Link} from "react-router-dom";
import Timeline from "@components/timeline";
import {useTranslation} from "react-i18next";

// ** Icons Imports
import {List} from "react-feather";

// ** Reactstrap Imports
import {Badge, Button, Card, CardBody, CardHeader, CardTitle} from "reactstrap";

// ** Images
import avatar6 from "@src/assets/images/portrait/small/avatar-s-6.jpg";

// ** Avatar Imports
import avatar9 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import avatar8 from "@src/assets/images/portrait/small/avatar-s-8.jpg";
import "./index.scss";
import JitsimeetingComponents from "../../components/JitsiMeetingComponents/JitsimeetingComponents";

const DoctorTimeline = () => {
    const {t} = useTranslation();
    const id = window.location?.pathname?.split('/')?.slice(-1).pop()

    const [doctorsId, setDoctorsId] = useState()
    const data = [
        {
            color: "warning",
            customContent: (
                <Fragment>
                    <div className="d-flex align-items-center">
                        <Avatar size="lg" img={avatar9}/>
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
                        <Avatar size="lg" img={avatar6}/>
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
                        <Avatar size="lg" img={avatar8}/>
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
                <div className="d-flex align-items-center justify-content-between w-100">
                    <List className="user-timeline-title-icon"/>
                    <CardTitle className="fw-bold" tag="h2">
                        {t("Patients today")}
                    </CardTitle>
                    <Button color={"success"} onClick={() => setDoctorsId(id)} className="fw-bold" tag="h2">
                        call
                    </Button>
                </div>
            </CardHeader>
            {doctorsId && <div className={"w-100"}>
                <JitsimeetingComponents doctorId={doctorsId}/>
            </div>}
            <CardBody>
                <Timeline className="ms-50 mb-0" data={data}/>
            </CardBody>
        </Card>
    );
};
export default DoctorTimeline;
