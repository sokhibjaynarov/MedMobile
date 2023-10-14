// ** React Imports
import { useState } from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { useTranslation } from "react-i18next";
// import { useParams } from "react-router-dom";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import PreviewProfileCard from "@components/preview";
import avatarImg from "@src/assets/images/portrait/small/avatar-s-20.jpg";
import { Row, Col, Card, Label, Input, CardBody, CardHeader } from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ReceptionPreview = () => {
  // ** HooksVars
  // const { id } = useParams();

  // ** Translation
  const { t } = useTranslation();

  // ** States
  const [data, setData] = useState({
    firstName: "Shakhzod",
    lastName: "Namazbaev",
    fatherName: "Abduraximovich",
    phone: "+998993249488",
    additionalPhone: "+998993249499",
    birthday: "17.04.1997",
    hospital: "City Med",
    gender: "male",
    photo: avatarImg,
    email: "shakhzod.namazbaev@gmail.com",
  });
  const genders = [
    { value: "male", label: t("Male") },
    { value: "female", label: t("Female") },
  ];
  return (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={12}>
          <Card className="invoice-preview-card">
            <CardBody className="invoice-padding px-2">
              <PreviewProfileCard title="Registrar data" data={data} />
              <Row>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label">{t("First name")}</Label>
                  <Input disabled value={data.firstName} />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label">{t("Last name")}</Label>
                  <Input disabled value={data.lastName} />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label">{t("Father name")}</Label>
                  <Input disabled value={data.fatherName} />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label">{t("Birthday")}</Label>
                  <Flatpickr
                    disabled
                    value={data.birthday}
                    className="form-control"
                    options={{ locale: Russian, dateFormat: "d.m.Y" }}
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
                <Col md="6" sm="12" className="mb-1">
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
                  <Input disabled value={data.phone} />
                </Col>
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label">{t("Additional phone")}</Label>
                  <Input disabled value={data.additionalPhone} />
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                  <Label className="form-label">{t("Hospital")}</Label>
                  <Select
                    isDisabled
                    value={genders[0]}
                    options={genders}
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    placeholder={t("Hospital placeholder")}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ReceptionPreview;
