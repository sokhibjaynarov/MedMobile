import { Fragment } from "react";
import PatientPreviewTable from "./table";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import {
  User,
  Link2,
  Phone,
  MapPin,
  UserPlus,
  UserCheck,
  CreditCard,
  PhoneOutgoing,
} from "react-feather";
import avatarImg from "@src/assets/images/portrait/small/avatar-s-20.jpg";
import { Row, Col, Card, CardImg, CardBody, CardHeader } from "reactstrap";
import "../index.scss";
import { useState } from "react";

const PatientPreview = () => {
  const { t } = useTranslation();

  const [data, setData] = useState({
    idCard: "AD423",
    firstName: "Ulug'bek",
    lastName: "Shukurulloyev",
    fatherName: "Erkinovich",
  });

  const breadcumbList = [
    { title: t("Patients"), link: "/patient/list" },
    { title: data.firstName + " " + data.lastName },
  ];
  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <Card>
        <CardHeader className="justify-content-center">
          <h4 className="fw-bolder">Информация о пациенте</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl="2" md="2" sm="12">
              <div style={{ width: 100, height: 100 }}>
                <CardImg
                  width={100}
                  height={100}
                  src={avatarImg}
                  alt="User Profile Image"
                />
              </div>
            </Col>
            <Col xl="4" md="4" sm="12">
              <ul className="item-list">
                <li className="item-list__item">
                  <CreditCard size={17} />
                  <span>{t("ID Card")}: </span>
                  <span>{data.idCard}</span>
                </li>
                <li className="item-list__item">
                  <User size={17} />
                  <span>{t("First name")}: </span>
                  <span>{data.firstName}</span>
                </li>
                <li className="item-list__item">
                  <UserCheck size={17} />
                  <span>{t("Last name")}: </span>
                  <span>{data.lastName}</span>
                </li>
                <li className="item-list__item">
                  <UserPlus size={17} />
                  <span>{t("Father name")}: </span>
                  <span>{data.fatherName}</span>
                </li>
              </ul>
            </Col>
            <Col xl="4" md="4" sm="12">
              <ul className="item-list">
                <li className="item-list__item">
                  <Link2 size={17} />
                  <span>{t("Blood type")}: </span>
                  <span>2+</span>
                </li>
                <li className="item-list__item">
                  <Phone size={17} />
                  <span>{t("Phone")}: </span>
                  <span>+998915624837</span>
                </li>
                <li className="item-list__item">
                  <PhoneOutgoing size={17} />
                  <span>{t("Additional phone")}: </span>
                  <span>+998915624803</span>
                </li>
                <li className="item-list__item">
                  <MapPin size={17} />
                  <span>{t("Workplace")}: </span>
                  <span>Techno group MCHJ</span>
                </li>
              </ul>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <PatientPreviewTable />
    </Fragment>
  );
};

export default PatientPreview;
