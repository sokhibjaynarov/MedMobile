import { Fragment, useState } from "react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import { Row, Col, Card, Form, Label, Button, CardBody } from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const AdmittanceForm = () => {
  const { t } = useTranslation();
  const breadcumbList = [
    { title: t("Reception list"), link: "/admittance/list" },
    { title: t("Add recept") },
  ];

  const status = [
    { value: "pending", label: t("Pending") },
    { value: "received", label: t("Received") },
    { value: "receptioned", label: t("At the reception") },
  ];

  const [data, setData] = useState({
    end_date: "",
    start_date: "",
    status: "",
    doctor: "",
    date: "",
    receptionType: "",
  });

  const receptionType = [
    { value: 1, label: "Breket qo'yish" },
    { value: 2, label: "Ichaklarni tekshirish" },
    { value: 3, label: "Quloq yallig'lanishini davolash" },
    { value: 4, label: "Матка с придатками, трансабдоминально" },
    { value: 5, label: "Органы брюшной полости, комплексное" },
    { value: 6, label: "Слюная железа (одноименные)" },
    { value: 7, label: "Лифатические узлы" },
    { value: 8, label: "Мягкие ткани (атерома, липома и др)" },
    { value: 9, label: "Магнитотерапия" },
    { value: 10, label: "Спирография с пробой s" },
  ];

  const doctors = [
    { value: 1, label: "Umarali Eshonqulov" },
    { value: 2, label: "Azizbek Nurxonov" },
    { value: 3, label: "Mirsoli G'aybullayev" },
    { value: 4, label: "Hikmat MirzaAhmedov" },
  ];

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

  const timePickerOption = {
    time_24hr: true,
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
  };

  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Recept")}</h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0" tag="h3">
          Добавить тип приема
        </p>
        <CardBody>
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="receptionType">
                  {t("Recept type")}
                </Label>
                <Select
                  isClearable
                  id="receptionType"
                  name="receptionType"
                  options={receptionType}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  value={data.receptionType}
                  placeholder={t("Recept type placeholder")}
                  onChange={(value) => onChangeInput(value, "receptionType")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="date">
                  {t("Date")}
                </Label>
                <Flatpickr
                  id="date"
                  name="date"
                  value={data.date}
                  className="form-control"
                  placeholder={t("Birthday placeholder")}
                  onChange={(_, date) => onChangeInput(date, "date")}
                  options={{
                    locale: Russian,
                    allowInput: true,
                    dateFormat: "d.m.Y",
                  }}
                />
              </Col>
              <Col lg="6" sm="12" className="mb-1">
                <Label for="start_date">{t("Reception start time")}</Label>
                <Flatpickr
                  id="start_date"
                  name="start_date"
                  placeholder="--:--"
                  value={data?.start_date}
                  className="form-control"
                  options={timePickerOption}
                />
              </Col>
              <Col lg="6" sm="12" className="mb-1">
                <Label for="end_date">{t("Reception end time")}</Label>
                <Flatpickr
                  id="end_date"
                  name="end_date"
                  placeholder="--:--"
                  value={data?.end_date}
                  className="form-control"
                  options={timePickerOption}
                  // onChange={(_, value) => onChangeTime("end", value, setMonday)}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="doctor">
                  {t("Doctor")}
                </Label>
                <Select
                  isClearable
                  id="doctor"
                  name="doctor"
                  options={doctors}
                  value={data.doctor}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Doctor placeholder")}
                  onChange={(value) => onChangeInput(value, "doctor")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="patient">
                  {t("Patient")}
                </Label>
                <Select
                  isClearable
                  id="patient"
                  name="patient"
                  options={doctors}
                  value={data.patient}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Patient placeholder")}
                  onChange={(value) => onChangeInput(value, "patient")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-3">
                <Label className="form-label" for="status">
                  {t("Status")}
                </Label>
                <Select
                  isClearable
                  id="status"
                  name="status"
                  options={status}
                  value={data.status}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Status placeholder")}
                  onChange={(value) => onChangeInput(value, "status")}
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

export default AdmittanceForm;
