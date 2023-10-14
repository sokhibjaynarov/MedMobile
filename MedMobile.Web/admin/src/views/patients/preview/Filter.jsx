import Select from "react-select";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { selectThemeColors } from "@utils";
import { useTranslation } from "react-i18next";
import { Plus, File, Printer, Clipboard, ExternalLink } from "react-feather";
import {
  Col,
  Row,
  Input,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const PatientPreviewFilter = ({
  value,
  rowsPerPage,
  handleFilter,
  handlePerPage,
}) => {
  const { t } = useTranslation();

  const departments = [
    { value: 1, label: "Пульмонология" },
    { value: 2, label: "Неврология" },
    { value: 3, label: "Терапия" },
    { value: 4, label: "Педиатрия" },
    { value: 5, label: "Гинекология" },
  ];

  return (
    <div className="invoice-list-table-header w-100 py-2">
      <h4 className="fw-bolder text-center mb-2">История болезни</h4>
      <Row>
        <Col md="4">
          <Select
            isClearable
            className="w-100"
            options={departments}
            classNamePrefix="select"
            theme={selectThemeColors}
            placeholder={t("Specialties")}
          />
        </Col>
        <Col md="4" className="d-flex align-items-center px-0 px-lg-1">
          <Select
            isClearable
            className="w-100"
            options={departments}
            classNamePrefix="select"
            theme={selectThemeColors}
            placeholder={t("Departments")}
          />
        </Col>
        <Col md="4" className="d-flex align-items-center px-0 px-lg-1">
          <Select
            isClearable
            className="w-100"
            options={departments}
            classNamePrefix="select"
            theme={selectThemeColors}
            placeholder={t("Status")}
          />
        </Col>
      </Row>
      <hr className="my-2" />
      <Row>
        <Col lg="3" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">{t("Show")}</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
        </Col>
        <Col
          lg="9"
          className="actions-right d-flex gap-2 align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">{t("Search")}</label>
            <Input
              value={value}
              id="search-invoice"
              className="ms-50 w-100"
              placeholder={t("Search placeholder")}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              caret
              outline
              color="secondary"
              className="d-flex align-items-center"
            >
              <ExternalLink className="font-small-4 me-50" />
              <span className="align-middle">{t("Export")}</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100">
                <Printer className="font-small-4 me-50" />
                <span className="align-middle">{t("Print")}</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File className="font-small-4 me-50" />
                <span className="align-middle">Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Clipboard className="font-small-4 me-50" />
                <span className="align-middle">PDF</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button
            tag={Link}
            color="primary"
            to="/patient/add"
            className="d-flex align-items-center gap-xl-1"
          >
            <Plus size={16} /> {t("Recept")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default memo(PatientPreviewFilter);
