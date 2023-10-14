import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import "cleave.js/dist/addons/cleave-phone.tj";
import BreadCrumbs from "@components/breadcrumbs";
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

const DepartmentAdd = () => {
  const { t } = useTranslation();
  const breadcumbList = [
    { title: t("All departments"), link: "/department/list" },
    { title: t("Add department") },
  ];

  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Add department")}</h2>
      <br />
      <Card>
        <p className="h4 text-center fw-bold pt-2 m-0">
          {t("Registrar - application form")}
        </p>
        <CardBody>
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="NameUZ">
                  {t("NameUZ")}
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="NameUZ"
                  placeholder={t("NameUZ")}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="NameRU">
                  {t("NameRU")}
                </Label>
                <Input
                  id="NameRU"
                  type="text"
                  name="NameRU"
                  placeholder={t("NameRU")}
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    outline
                    type="reset"
                    className="me-1"
                    color="secondary"
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
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default DepartmentAdd;
