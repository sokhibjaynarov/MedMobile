import { Card } from "reactstrap";
import { getData } from "../store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Eye } from "react-feather";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import PatientPreviewFilter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "@/@core/components/pagination";

import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const PatientPreviewTable = ({ data }) => {
  /* Translation */
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);

  /* States */
  const [statusValue] = useState("");
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("id");

  const columns = [
    {
      name: "ID",
      minWidth: "70px",
      maxWidth: "120px",
      cell: (row) => (
        <Link to={`/doctors/preview/${row.id}`}>{`#${row.id}`}</Link>
      ),
    },
    {
      name: t("Doctor"),
      minWidth: "250px",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">
                <Link to={`/doctors/preview/${row.id}`}>{name}</Link>
              </h6>
            </div>
          </div>
        );
      },
    },
    {
      minWidth: "200px",
      name: t("Specialization"),
      cell: () => <span>Гинеколог</span>,
    },
    {
      name: t("Departments"),
      cell: () => <span>Гинекология</span>,
    },
    {
      name: t("Date"),
      cell: () => <span>25.01.2023</span>,
    },
    {
      name: t("Status"),
      cell: () => <span>Ожидание</span>,
    },
    {
      right: true,
      name: t("Action"),
      maxWidth: "120px",
      cell: (row) => (
        <Link id={`pw-tooltip-${row.id}`} to={`/doctors/preview/${row.id}`}>
          <Eye size={17} />
        </Link>
      ),
    },
  ];

  const dataToRender = () => {
    const filters = { q: value, status: statusValue };

    const isFiltered = Object.keys(filters).some((k) => filters[k].length > 0);

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };
  const handleSort = () => {};
  const handleFilter = () => {};
  const handlePerPage = () => {};
  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
      })
    );
  }, [dispatch, store.data.length]);

  return data !== null ? (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable">
          <DataTable
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable invoice-padding"
            defaultSortField="invoiceId"
            paginationComponent={() => (
              <CustomPagination
                total={store.total}
                onPageChange={null}
                rowsPerPage={rowsPerPage}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              />
            )}
            subHeaderComponent={
              <PatientPreviewFilter
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
  ) : null;
};
export default PatientPreviewTable;
