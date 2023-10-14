import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Fragment, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Label,
  Button,
  CardText,
  CardBody,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ScheduleForm = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const breadcrumbList = [
    { title: t("Schedule"), link: "/invoice/list" },
    { title: t("Schedule application form") },
  ];

  const [monday, setMonday] = useState({ start: null, end: null });
  const [friday, setFriday] = useState({ start: null, end: null });
  const [sunday, setSunday] = useState({ start: null, end: null });
  const [tuesday, setTuesday] = useState({ start: null, end: null });
  const [saturday, setSaturday] = useState({ start: null, end: null });
  const [thursday, setThursday] = useState({ start: null, end: null });
  const [wednesday, setWednesday] = useState({ start: null, end: null });

  const colorOptions = [
    { value: 1, label: "Absurdum Cahoot" },
    { value: 2, label: "Sanjak Asimov" },
    { value: 3, label: "Ziyodulla Halidom" },
    { value: 4, label: "Nicola Arsonous" },
    { value: 5, label: "Aliter Romanov" },
    { value: 6, label: "Omber Rassle" },
  ];
  const handleInputChange = (newValue) => {
    console.log("newValue", newValue);
  };
  const timePickerOption = {
    time_24hr: true,
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
  };

  const onChangeTime = useCallback(
    (name, value, setState) => setState((prev) => ({ ...prev, [name]: value })),
    [monday, tuesday, friday, saturday, wednesday, sunday, thursday]
  );

  return (
    <Fragment>
      <BreadCrumbs data={breadcrumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Application form")}</h2>
      <br />
      <Card className="week-date-card invoice-padding invoice-product-details">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Doctor")}</CardText>
        </CardHeader>
        <CardBody>
          <Label for="doctor" className="fs-6">
            {t("Doctor")}
          </Label>
          <Select
            isClearable
            isDisabled={!!id}
            options={colorOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onSelect={handleInputChange}
            placeholder={t("Select doctor")}
          />
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Monday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={monday?.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("start", value, setMonday)}
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                value={monday?.end}
                placeholder="--:--"
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setMonday)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Tuesday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={tuesday?.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) =>
                  onChangeTime("start", value, setTuesday)
                }
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={tuesday?.end}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setTuesday)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Wednesday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={wednesday?.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) =>
                  onChangeTime("start", value, setWednesday)
                }
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={wednesday?.end}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) =>
                  onChangeTime("end", value, setWednesday)
                }
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Thursday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={thursday.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) =>
                  onChangeTime("start", value, setThursday)
                }
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={thursday.end}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setThursday)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Friday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={friday.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("start", value, setFriday)}
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                value={friday.end}
                placeholder="--:--"
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setFriday)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Saturday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={saturday.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) =>
                  onChangeTime("start", value, setSaturday)
                }
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                id="timepicker"
                placeholder="--:--"
                value={saturday.end}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setSaturday)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="week-date-card">
        <CardHeader>
          <CardText className="fs-4 fw-bold">{t("Sunday")}</CardText>
        </CardHeader>
        <CardBody>
          <Row className="d-flex justify-content-between">
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception start time")}
              </Label>
              <Flatpickr
                placeholder="--:--"
                value={sunday.start}
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("start", value, setSunday)}
              />
            </Col>
            <Col lg="5" sm="12">
              <Label for="doctor" className="fs-6">
                {t("Reception end time")}
              </Label>
              <Flatpickr
                id="timepicker"
                value={sunday.end}
                placeholder="--:--"
                className="form-control"
                options={timePickerOption}
                onChange={(_, value) => onChangeTime("end", value, setSunday)}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-end pt-2">
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
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ScheduleForm;
