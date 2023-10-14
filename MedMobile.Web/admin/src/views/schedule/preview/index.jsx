// ** React Imports
import axios from "axios";
import { useEffect, useState } from "react";
import { List, Edit3 } from "react-feather";
import { useTranslation } from "react-i18next";
import CustomProfile from "@components/profile";
import { Link, useParams } from "react-router-dom";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";

const SchedulePreview = () => {
  // ** HooksVars
  const { id } = useParams();

  // ** Translation
  const { t } = useTranslation();

  // ** States
  const [data, setData] = useState(null);

  // ** Get invoice on mount based on id
  useEffect(() => {
    axios.get(`/profile/data`).then((response) => {
      setData(response.data);
    });
  }, []);

  // ** Available Keys
  const keys = {
    position: true,
    department: true,
    specialization: true,
  };

  return (
    <div className="invoice-preview-wrapper">
      <CustomProfile keys={keys} data={data?.header || {}} />
      <Card className="card-user-timeline">
        <CardHeader>
          <div className="d-flex align-items-center">
            <List size={16} className="user-timeline-title-icon" />
            <CardTitle className="fw-bold" tag="h2">
              {t("Schedule")}
            </CardTitle>
          </div>
        </CardHeader>
        <CardBody className="mt-2">
          <ul className="list-unstyled">
            <Row>
              <Col sm="6">
                <li className="mb-2 fw-bold">
                  <Row>
                    <Col md="6">{t("Monday")}</Col>
                    <Col md="6">08:10 - 09:20</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="mb-2 fw-bold">
                  <Row>
                    <Col md="6">{t("Tuesday")}</Col>
                    <Col md="6">09:35 - 10:30</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="mb-2 fw-bold">
                  <Row>
                    <Col md="6">{t("Wednesday")}</Col>
                    <Col md="6">10:50 - 11:40</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="mb-2 fw-bold">
                  <Row>
                    <Col md="6">{t("Thursday")}</Col>
                    <Col md="6">12:25 - 14:00</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="mb-2 fw-bold">
                  <Row>
                    <Col md="6">{t("Friday")}</Col>
                    <Col md="6">16:45 − 17:35</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="mb-2">
                  <Row>
                    <Col md="6">{t("Saturday")}</Col>
                    <Col md="6">18:25 - 18:50</Col>
                  </Row>
                </li>
              </Col>
              <Col sm="6">
                <li className="fw-bold">
                  <Row>
                    <Col md="6">{t("Sunday")}</Col>
                    <Col md="6">16:45 - 17:35</Col>
                  </Row>
                </li>
              </Col>
            </Row>
          </ul>
          <hr className="my-2" />
          <Row>
            <Col sm="6">
              <Button
                type="submit"
                color="primary"
                tag={data ? Link : "button"}
                className="d-inline-flex align-items-center"
                // onClick={(e) => e.preventDefault()}
                {...(data ? { to: `/invoice/edit/${id}` } : {})}
              >
                <Edit3 size={16} className="me-1" />
                {t("Edit")}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default SchedulePreview;
