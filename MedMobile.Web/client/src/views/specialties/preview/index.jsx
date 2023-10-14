import Table from "./Table";
import { useState } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
// import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import { Label, Card, CardBody, Row, Col } from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";

const SpecializationPreview = () => {
  const { t } = useTranslation();
  // ** HooksVars
  // const { id } = useParams();

  // ** States
  const [data, setData] = useState({
    id: 1,
    department: { id: 2, name: "IT отдел" },
    position: { id: 1, name: "Back-End developer" },
  });

  const breadcumbList = [
    { title: t("Specialties") },
    { title: data.position.name },
  ];

  const positions = [
    {
      value: 1,
      label: "Back-End developer",
    },
    {
      value: 2,
      label: "Front-End developer",
    },
  ];

  const department = [
    {
      value: 1,
      label: "Гинекология",
    },
    {
      value: 2,
      label: "ИТ специалисть",
    },
  ];

  return (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col>
          <BreadCrumbs data={breadcumbList} />
          <br />
          <h1 className="m-0 fw-bolder text-center">{t("Specialization")}</h1>
          <br />
          <Card className="invoice-preview-card">
            <CardBody className="invoice-padding pb-0">
              <h4 className="fw-bolder m-0">
                {t("Details")} : {data.position.name}
              </h4>
              <br />
              <Row>
                <Col className="mb-1">
                  <Label className="form-label" for="EmailMulti">
                    {t("Position")}
                  </Label>
                  <Select
                    isDisabled
                    value={positions.filter(
                      (item) => item.value === data.position.id
                    )}
                    options={positions}
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    placeholder={t("Position placeholder")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label className="form-label" for="department">
                    {t("Departments")}
                  </Label>
                  <Select
                    isDisabled
                    options={department}
                    value={department.filter(
                      (item) => item.value === data.department.id
                    )}
                    id="department"
                    name="department"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    placeholder={t("Departments placeholder")}
                  />
                </Col>
              </Row>
              <br />
            </CardBody>
          </Card>
          <Table />
        </Col>
      </Row>
    </div>
  );
};
export default SpecializationPreview;
