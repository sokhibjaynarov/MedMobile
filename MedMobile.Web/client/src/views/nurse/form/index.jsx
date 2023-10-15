import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { Fragment, useState } from "react";
import { selectThemeColors } from "@utils";
import { maxLength } from "@/utility/Utils";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Input,
  Button,
  CardBody,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const NurseForm = () => {
  // ** Router params
  const { id } = useParams();

  // ** Translation
  const { t } = useTranslation();

  // ** Navigate router
  const navigate = useNavigate();

  // ** Breadcrumb
  const breadcrumbList = [
    { title: t("Nurses / Orderlies"), link: "/nurse/list" },
    { title: t("Add Nurses / Orderlies") },
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

  const [data, setData] = useState({
    room: "",
    email: "",
    floor: "",
    phone: "",
    photo: "",
    gender: "",
    position: "",
    birthday: "",
    lastName: "",
    hospital: "",
    firstName: "",
    fatherName: "",
    department: "",
    additionalPhone: "",
  });

  const onChangeInput = (event, name) => {
    if (name) {
      setData((prev) => ({ ...prev, [name]: event }));
    } else {
      setData((prev) => ({
        ...prev,
        [event?.target?.name]: event?.target?.value,
      }));
    }
  };

  return (
    <Fragment>
      <BreadCrumbs data={breadcrumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Add Nurses / Orderlies")}</h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0" tag="h3">
          {t("Nurses / Orderlies application form")}
        </p>
        <CardBody>
          <Form>
            <p className="h5 mb-2">1. {t("Personal information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="firstName">
                  {t("First name")}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={onChangeInput}
                  placeholder={t("First name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="lastName">
                  {t("Last name")}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={onChangeInput}
                  placeholder={t("Last name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="fatherName">
                  {t("Father name")}
                </Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={data.fatherName}
                  onChange={onChangeInput}
                  placeholder={t("Father name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="birthday">
                  {t("Birthday")}
                </Label>
                <Flatpickr
                  id="birthday"
                  name="birthday"
                  value={data.birthday}
                  className="form-control"
                  placeholder={t("Birthday placeholder")}
                  onChange={(_, date) => onChangeInput(date, "birthday")}
                  options={{
                    locale: Russian,
                    allowInput: true,
                    dateFormat: "d.m.Y",
                    maxDate: "01.01.2000",
                  }}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CompanyMulti">
                  {t("Photo")}
                </Label>
                <Input type="file" id="inputFile" name="fileInput" />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="gender">
                  {t("Gender")}
                </Label>
                <Select
                  id="gender"
                  name="gender"
                  options={genders}
                  value={data.gender}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Gender placeholder")}
                  onChange={(value) => onChangeInput(value, "gender")}
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
            </Row>
            <p className="h5 mb-2">2. {t("Contact information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="phone">
                  {t("Phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  maxLength={12}
                  value={data.phone}
                  onKeyPress={maxLength}
                  className="form-control"
                  onChange={onChangeInput}
                  placeholder="+998993458810"
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="additionalPhone">
                  {t("Additional phone")}
                </Label>
                <Input
                  type="number"
                  maxLength={12}
                  id="additionalPhone"
                  name="additionalPhone"
                  onKeyPress={maxLength}
                  className="form-control"
                  onChange={onChangeInput}
                  placeholder="+998993458810"
                  value={data.additionalPhone}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="email">
                  {t("Email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={onChangeInput}
                  placeholder="user@gmail.com"
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
            </Row>
            <p className="h5 mb-2">3. {t("Workplace information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="hospital">
                  {t("Hospital")}
                </Label>
                <Select
                  isClearable
                  id="hospital"
                  options={specialization}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Hospital placeholder")}
                  onChange={(value) => onChangeInput(value, "hospital")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="department">
                  {t("Departments")}
                </Label>
                <Select
                  isClearable
                  id="department"
                  name="department"
                  options={departments}
                  value={data.department}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Departments placeholder")}
                  onChange={(value) => onChangeInput(value, "department")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="position">
                  {t("Position")}
                </Label>
                <Select
                  isClearable
                  id="position"
                  name="position"
                  value={data.position}
                  options={specialization}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Position placeholder")}
                  onChange={(value) => onChangeInput(value, "position")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="floor">
                  {t("Floor")}
                </Label>
                <Select
                  id="floor"
                  isClearable
                  name="floor"
                  options={floors}
                  value={data.floor}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Floor placeholder")}
                  onChange={(value) => onChangeInput(value, "floor")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="room">
                  {t("Room")}
                </Label>
                <Select
                  id="room"
                  name="room"
                  isClearable
                  options={rooms}
                  value={data.room}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Room placeholder")}
                  onChange={(value) => onChangeInput(value, "room")}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                outline
                type="reset"
                className="me-1"
                color="secondary"
                onClick={() => navigate(-1)}
              >
                {t("Cancel")}
              </Button>
              <Button
                type="submit"
                color="primary"
                onClick={(e) => e.preventDefault()}
              >
                {t("Save")}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default NurseForm;
