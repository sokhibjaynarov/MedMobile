// ** React Imports
import { Card } from "reactstrap";
import { Column } from "./columns";
import { useState, useEffect } from "react";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import DoctorFilter from "./components/Filter";
import BreadCrumbs from "@components/breadcrumbs";
import DataTable from "react-data-table-component";

// ** Store & Actions
import { getData } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/pagination";
import { fetchAllDoctors } from "@/api/doctors";

const DoctorList = () => {
  // ** Translation
  const { t } = useTranslation();

  // ** Store vars
  const { columns } = Column();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);
  const [doctorList, setDoctorList] = useState([]);
  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const breadcumbList = [
    { title: t("Doctors") },
    { title: t("List of doctors") },
  ];
  useEffect(() => {
    fetchAllDoctors().then(({ data }) => {
      setDoctorList(data.result);
    });
  }, []);

  const handleFilter = (val) => {
    setValue(val);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="m-0 fw-bolder text-center">{t("List of doctor")}</h2>
      <br />
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            subHeader
            pagination
            sortServer
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            data={doctorList}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={() => (
              <CustomPagination
                total={doctorList.length}
                rowsPerPage={rowsPerPage}
                onPageChange={(page) => handlePagination(page)}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              />
            )}
            subHeaderComponent={
              <DoctorFilter
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default DoctorList;
