import { Fragment, useState } from "react";
import Select from "react-select";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { maxLength } from "@/utility/Utils";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Russian } from "flatpickr/dist/l10n/ru.js";
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

const PatientAdd = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const [data, setData] = useState({
    phone: "",
    bloodType: "",
  });

  const breadcrumbList = [
    { title: t("Patients"), link: "/patient/list" },
    { title: id ? t("Edit") : t("Add") },
  ];

  const genders = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  const cityRegion = [
    { value: 1, label: "Tashkent" },
    { value: 2, label: "Jizzax" },
    { value: 3, label: "Samarqand" },
    { value: 4, label: "Buxoro" },
    { value: 5, label: "Qashqadaryo" },
    { value: 6, label: "Surxondaryo" },
    { value: 7, label: "Navoiy" },
    { value: 8, label: "Andijon" },
    { value: 9, label: "Farg'ona" },
    { value: 10, label: "Namangan" },
  ];

  const districts = [
    { value: 1, label: "Uchtepa tumani" },
    { value: 2, label: "Shayxontohur tumani" },
    { value: 3, label: "Mirobod tumani" },
    { value: 4, label: "Yashnobod tumani" },
    { value: 5, label: "Mirzo Ulug'bek tumani" },
  ];

  const bloodType = [
    { value: 1, label: "Группа 0 (I)" },
    { value: 2, label: "Группа А (II)" },
    { value: 3, label: "Группа В (III)" },
    { value: 4, label: "Группа АВ (IV)" },
  ];

  const passportOption = {
    serie: { blocks: [2], uppercase: true },
    number: { blocks: [7], uppercase: true, numericOnly: true },
  };

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
      <h2 className="fw-bolder text-capitalize text-center">
        {id ? t("Edit") : t("Add")} {t("Patient")}
      </h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0">
          {t("Patient - application form")}
        </p>
        <CardBody>
          <Form>
            <p className="h5 mb-2">1. {t("Personal information")}</p>
            <Row>
              <Col md="6" sm="12">
                <Label className="form-label" for="idcard">
                  {t("ID Card")}
                </Label>
                <Input
                  id="idcard"
                  name="idcard"
                  type="number"
                  placeholder={t("ID card placeholder")}
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
            </Row>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="firstName">
                  {t("First name")}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
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
                  placeholder={t("Father name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="CountryMulti">
                  {t("Birthday")}
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    locale: Russian,
                    allowInput: true,
                    dateFormat: "d.m.Y",
                    maxDate: "01.01.2000",
                  }}
                  placeholder={t("Birthday placeholder")}
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
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Gender placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="passportSerie">
                  {t("Passport series")}
                </Label>
                <Cleave
                  placeholder="AA"
                  id="passportSerie"
                  name="passportSerie"
                  className="form-control"
                  options={passportOption.serie}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="passportNumber">
                  {t("Passport number")}
                </Label>
                <Cleave
                  id="passportNumber"
                  name="passportNumber"
                  placeholder="6482539"
                  className="form-control"
                  options={passportOption.number}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="bloodType">
                  {t("Blood type")}
                </Label>
                <Select
                  id="bloodType"
                  name="bloodType"
                  options={bloodType}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Blood type placeholder")}
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
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="EmailMulti">
                  {t("City or Region")}
                </Label>
                <Select
                  options={cityRegion}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("City or Region placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="EmailMulti">
                  {t("District")}
                </Label>
                <Select
                  options={districts}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("District placeholder")}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="EmailMulti">
                  {t("Email")}
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="nameMulti"
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
                <Label className="form-label" for="workplace">
                  {t("Workplace")}
                </Label>
                <Input
                  id="workplace"
                  name="workplace"
                  placeholder={t("Father name placeholder")}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button outline type="reset" className="me-1" color="secondary">
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
export default PatientAdd;
