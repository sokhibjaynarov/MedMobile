import { Fragment } from "react";
import Select from "react-select";
import Cleave from "cleave.js/react";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { useTranslation } from "react-i18next";
import "cleave.js/dist/addons/cleave-phone.tj";
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
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ReceptionAdd = () => {
  const { t } = useTranslation();
  const breadcumbList = [
    { title: t("All registrars"), link: "/reception/list" },
    { title: t("Add registrar") },
  ];
  const genders = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];

  const phoneOption = { phone: true, phoneRegionCode: "TJ" };
  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Add registrar")}</h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0">
          {t("Registrar - application form")}
        </p>
        <CardBody>
          <Form>
            <p className="h5 mb-2">1. {t("Personal information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  {t("First name")}
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="nameMulti"
                  placeholder={t("First name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="lastNameMulti">
                  {t("Last name")}
                </Label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastNameMulti"
                  placeholder={t("Last name placeholder")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="cityMulti">
                  {t("Father name")}
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="cityMulti"
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
              <Col md="6" sm="12">
                <Label className="form-label" for="CompanyMulti">
                  {t("Photo")}
                </Label>
                <Input type="file" id="inputFile" name="fileInput" />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label" for="EmailMulti">
                  {t("Gender")}
                </Label>
                <Select
                  options={genders}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Gender placeholder")}
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
            </Row>
            <p className="h5 mb-2">2. {t("Contact information")}</p>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  {t("Phone")}
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText>+998</InputGroupText>
                  <Cleave
                    id="phone-number"
                    options={phoneOption}
                    className="form-control"
                    placeholder="97 345 7576"
                  />
                </InputGroup>
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="nameMulti">
                  {t("Additional phone")}
                </Label>
                <InputGroup className="input-group-merge">
                  <InputGroupText>+998</InputGroupText>
                  <Cleave
                    id="phone-number"
                    options={phoneOption}
                    className="form-control"
                    placeholder="99 345 7577"
                  />
                </InputGroup>
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
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="hospital">
                {t("Hospital")}
              </Label>
              <Select
                id="hospital"
                name="hospital"
                options={genders}
                classNamePrefix="select"
                theme={selectThemeColors}
                placeholder={t("Hospital placeholder")}
              />
            </Col>
            <div className="d-flex">
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
export default ReceptionAdd;
