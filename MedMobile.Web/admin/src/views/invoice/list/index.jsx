// ** React Imports
import { Card } from "reactstrap";
import { Column } from "./columns";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import DataTable from "react-data-table-component";
// ** Store & Actions
import { getData } from "../store";
import FilterSchedule from "./components/Filter";
import { useDispatch, useSelector } from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const InvoiceList = () => {
  // ** Store vars
  const { columns } = Column();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);
  // ** States
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();
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

  const handleFilter = (val) => {
    setValue(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
      })
    );
  };

  const handlePerPage = (e) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        status: statusValue,
        perPage: parseInt(e.target.value),
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0));
    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField,
      })
    );
  };
  const breadcumbList = [
    { title: t("Schedule") },
    { title: t("Schedule list") },
  ];
  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs data={breadcumbList} />
      <br />
      <h2 className="m-0 fw-bolder text-center">{t("Schedule List")}</h2>
      <br />
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <FilterSchedule
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

export default InvoiceList;
