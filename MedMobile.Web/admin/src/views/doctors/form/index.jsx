import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { Fragment, useState } from "react";
import { maxLength } from "@/utility/Utils";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DoctorForm = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const breadcrumbList = [
    {
      title: t("Doctors"),
      link: "/doctors/list",
    },
    { title: id ? t("Update doctor") : t("Add doctor") },
  ];
  const genders = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];
  const departments = [
    { value: 1, label: "Пульмонология" },
    { value: 2, label: "Неврология" },
    {
      value: 3,
      label: "Repaint",
    },
    { value: 4, label: "Педиатрия" },
    { value: 5, label: "Гинекология" },
  ];

  const cityRegion = [
    { value: 1, label: "Toshkent" },
    { value: 2, label: "Jizzax" },
    {
      value: 3,
      label: "Samarqand",
    },
    { value: 4, label: "Buxoro" },
    { value: 5, label: "Qashqadaryo" },
    { value: 6, label: "Surxondaryo" },
    {
      value: 7,
      label: "Navoiy",
    },
    { value: 8, label: "Andijon" },
    { value: 9, label: "Farg'ona" },
    { value: 10, label: "Namangan" },
  ];

  const districts = [
    { value: 1, label: "Uchtepa tumani" },
    { value: 2, label: "Shayxontohur tumani" },
    {
      value: 3,
      label: "Mirobod tumani",
    },
    { value: 4, label: "Yashnobod tumani" },
    { value: 5, label: "Mirzo Ulug'bek tumani" },
  ];

  const specialization = [
    { value: 1, label: "Пульмонолог" },
    { value: 2, label: "Невролог" },
    {
      value: 3,
      label: "Терапевт",
    },
    { value: 4, label: "Педиатр" },
    { value: 5, label: "Гинеколог" },
  ];

  const [data, setData] = useState({
    email: id ? "johndoe@gmail.com" : "",
    phone: id ? 998912348530 : "",
    photo: "",
    region: id ? cityRegion[0] : "",
    idcard: id ? 283732323 : "",
    gender: id ? genders[0] : "",
    district: id ? districts[2] : "",
    position: id ? specialization[2] : "",
    birthday: id ? "17.05.1994" : "",
    lastName: id ? "Xushvaqtov" : "",
    firstName: id ? "Ubaydulla" : "",
    fatherName: id ? "Bahromovich" : "",
    department: id ? departments[0] : "",
    specialization: id ? specialization[0] : "",
    additionalPhone: id ? 998932201564 : "",
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
      <h2 className="fw-bolder text-center">
        {id ? t("Update doctor") : t("Add doctor")}
      </h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0" tag="h3">
          {t("Doctor application form")}
        </p>
        <CardHeader>
          <p className="h5">1. {t("Account information")}</p>
        </CardHeader>
        <CardBody>
          <Form>
            <p className="h5 mb-2">2. {t("Personal information")}</p>
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
              <Col md="6" sm="12">
                <Label className="form-label" for="CompanyMulti">
                  {t("Photo")}
                </Label>
                <Input type="file" id="inputFile" name="fileInput" />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="gender">
                  {t("Gender")}
                </Label>
                <Select
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
            <p className="h5 mb-2">3. {t("Contact information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="phone">
                  {t("Phone")}
                </Label>
                <Input
                  name="phone"
                  type="number"
                  maxLength={12}
                  value={data.phone}
                  onKeyPress={maxLength}
                  onChange={onChangeInput}
                  className="form-control"
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
                  onChange={onChangeInput}
                  className="form-control"
                  placeholder="+998993458810"
                  value={data.additionalPhone}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="region">
                  {t("City or Region")}
                </Label>
                <Select
                  isClearable
                  name="region"
                  value={data.region}
                  options={cityRegion}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("City or Region placeholder")}
                  onChange={(value) => onChangeInput(value, "region")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="district">
                  {t("District")}
                </Label>
                <Select
                  isClearable
                  name="district"
                  options={districts}
                  value={data.district}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("District placeholder")}
                  onChange={(value) => onChangeInput(value, "district")}
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
                  value={data.email}
                  onChange={onChangeInput}
                  placeholder="user@gmail.com"
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
            </Row>
            <p className="h5 mb-2">4. {t("Workplace information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="department">
                  {t("Department")}
                </Label>
                <Select
                  isClearable
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
                <Label className="form-label" for="specialization">
                  {t("Specialization")}
                </Label>
                <Select
                  isClearable
                  name="specialization"
                  options={specialization}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Specialization placeholder")}
                  onChange={(value) => onChangeInput(value, "specialization")}
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

export default DoctorForm;
