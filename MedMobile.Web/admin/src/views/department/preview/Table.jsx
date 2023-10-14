import { getData } from "../store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { Card, CardBody, Badge } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const PreviewCard = ({ data }) => {
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
      name: t("ID Card"),
      sortable: true,
      sortField: "id",
      minWidth: "150px",
      maxWidth: "200px",
      cell: (row) => (
        <Link to={`/invoice/preview/${row.id}`}>
          <Badge color="light-info">{`#${row.id}`}</Badge>
        </Link>
      ),
    },
    {
      name: t("FIO"),
      sortable: true,
      minWidth: "300px",
      sortField: "client.name",
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
      name: t("Departments"),
      sortable: true,
      sortField: "client.name",
      cell: () => <span>Гинекология</span>,
    },
    {
      name: t("Position"),
      cell: () => <span>Bosh shifokor</span>,
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
    <Card>
      <CardBody className="invoice-padding pb-0">
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            responsive
            columns={columns}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
          />
        </div>
      </CardBody>
    </Card>
  ) : null;
};

export default PreviewCard;
