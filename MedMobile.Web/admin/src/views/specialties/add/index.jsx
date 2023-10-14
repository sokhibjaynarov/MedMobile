import { Fragment } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
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

const SpecialtiesAdd = () => {
  const { t } = useTranslation();
  const breadcumbList = [
    { title: t("Specialization"), link: "/specialties/list" },
    { title: t("Add specialty") },
  ];

  const departments = [
    { value: 1, label: "Пульмонология" },
    { value: 2, label: "Неврология" },
    { value: 3, label: "Гинекология" },
    { value: 4, label: "Терапия" },
    { value: 5, label: "Психосоматика" },
    { value: 5, label: "УЗИ" },
    { value: 5, label: "Педиатрия" },
  ];

  return (
    <Fragment>
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="fw-bolder text-center">{t("Add specialty")}</h2>
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
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="EmailMulti">
                  {t("Departments")}
                </Label>
                <Select
                  options={departments}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  placeholder={t("Departments placeholder")}
                />
              </Col>
              <div className="py-sm-1">
                <hr />
              </div>
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
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default SpecialtiesAdd;
