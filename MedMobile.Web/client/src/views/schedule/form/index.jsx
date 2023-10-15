import Flatpickr from "react-flatpickr";
import {useTranslation} from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import {Fragment, useCallback, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardText, Col, Label, Row,} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import toast from "react-hot-toast";
import {createSession} from "../../../api/doctors";

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

  const onClickSave = (e) => {
    console.log(e)
    e.preventDefault()
    createSession({email: data.loginEmail, password: data.password, role})
        .then((res) => {
          console.log(res.data);
          const data = {
            ...res.data.user,
            accessToken: res.data.token,
            refreshToken: res.data.token,
            role: role,
          };
          dispatch(handleLogin(data));
          if (data.accessToken) {
            dispatch(handleLayout("vertical"));
            dispatch(handleNavbarType("floating"));
          } else {
            dispatch(handleLayout("vertical"));
            dispatch(handleNavbarType("floating"));
          }
          ability.update(res.data.user);
          navigate("/dashboard/ecommerce");
          toast((t) => (
              <ToastContent
                  t={t}
                  role={data.role || ADMIN}
                  name={data.fullName || data.username || "John Doe"}
              />
          ));
        })
        .catch((err) => {
          console.log({err});
          setError("loginEmail", {
            type: "manual",
            // message: err.response.data.error,
            message: "Login or password is wrong ",
          });
          setError("password", {
            type: "manual",
            // message: err.response.data.error,
            message: "Login or password is wrong ",
          });
        });
  }

  return (
    <Fragment>
      <BreadCrumbs data={breadcrumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Application form")}</h2>
      <br />
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
              onClick={onClickSave}
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
