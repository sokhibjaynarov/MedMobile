import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { Fragment, useState } from "react";
import { selectThemeColors } from "@utils";
// import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import PreviewProfileCard from "@components/preview";
import avatarImg from "@src/assets/images/portrait/small/avatar-s-20.jpg";
import { Row, Col, Card, Form, Label, Input, CardBody } from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const PersonalPreview = () => {
  // const { id } = useParams();
  const { t } = useTranslation();

  const [data, setData] = useState({
    photo: avatarImg,
    firstName: "Shakhzod",
    lastName: "Namazbaev",
    birthday: "18.03.1992",
    phone: "+998912264579",
    fatherName: "Abduraximovich",
    email: "namazbaev.yandex.ru",
    additionalPhone: "+998945535691",
    floor: { value: 3, label: "Этаж: 3" },
    hospital: { value: 3, label: "Терапия" },
    position: { value: 3, label: "Терапевт" },
    department: { value: 3, label: "Терапия" },
    gender: { value: "male", label: t("Male") },
    room: { value: 303, label: "Этаж: 3, Кабинет: 303" },
  });

  const breadcumbList = [
    { title: t("List of personal"), link: "/personal/list" },
    { title: data.firstName + " " + data.lastName },
  ];

  const genders = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  const departments = [
    { value: 1, label: "Пульмонология" },
    { value: 2, label: "Неврология" },
    { value: 3, label: "Терапия" },
    { value: 4, label: "Педиатрия" },
    { value: 5, label: "Гинекология" },
  ];
  const specialization = [
    { value: 1, label: "Пульмонолог" },
    { value: 2, label: "Невролог" },
    { value: 3, label: "Терапевт" },
    { value: 4, label: "Педиатр" },
    { value: 5, label: "Гинеколог" },
  ];

  const rooms = [
    { value: 101, label: "Этаж: 1, Кабинет: 101" },
    { value: 202, label: "Этаж: 2, Кабинет: 202" },
    { value: 303, label: "Этаж: 3, Кабинет: 303" },
    { value: 404, label: "Этаж: 4, Кабинет: 404" },
    { value: 520, label: "Этаж: 5, Кабинет: 520г" },
  ];

  const floors = [
    { value: 1, label: "Этаж: 1" },
    { value: 2, label: "Этаж: 2" },
    { value: 3, label: "Этаж: 3" },
    { value: 4, label: "Этаж: 4" },
    { value: 5, label: "Этаж: 5" },
  ];

  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <Card>
        <CardBody>
          <PreviewProfileCard title="Сведения о персонале" data={data} />
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("First name")}</Label>
                <Input
                  disabled
                  value={data.firstName}
                  placeholder={t("First name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Last name")}</Label>
                <Input
                  disabled
                  value={data.lastName}
                  placeholder={t("Last name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Father name")}</Label>
                <Input
                  disabled
                  value={data.fatherName}
                  placeholder={t("Father name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Birthday")}</Label>
                <Flatpickr
                  disabled
                  value={data.birthday}
                  className="form-control"
                  options={{ dateFormat: "d.m.Y" }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Gender")}</Label>
                <Select
                  isDisabled
                  options={genders}
                  value={data.gender}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Gender placeholder")}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label">{t("Email")}</Label>
                <Input
                  disabled
                  value={data.email}
                  placeholder="user@gmail.com"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Phone")}</Label>
                <Input
                  disabled
                  value={data.phone}
                  className="form-control"
                  placeholder="+998993458817"
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="additionalPhone">
                  {t("Additional phone")}
                </Label>
                <Input
                  disabled
                  type="number"
                  className="form-control"
                  placeholder="+998993458810"
                  value={data.additionalPhone}
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Hospital")}</Label>
                <Select
                  isDisabled
                  value={data.hospital}
                  options={specialization}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Hospital placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Departments")}</Label>
                <Select
                  isDisabled
                  options={departments}
                  value={data.department}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Departments placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Position")}</Label>
                <Select
                  isDisabled
                  value={data.position}
                  options={specialization}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Position placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label">{t("Floor")}</Label>
                <Select
                  isDisabled
                  options={floors}
                  value={data.floor}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Floor placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="room">
                  {t("Room")}
                </Label>
                <Select
                  id="room"
                  name="room"
                  isDisabled
                  options={rooms}
                  value={data.room}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Room placeholder")}
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default PersonalPreview;
