// ** React Imports
import {Card} from "reactstrap";
import {Column} from "./columns";
import {useEffect, useState} from "react";
import {ChevronDown} from "react-feather";
import {useTranslation} from "react-i18next";
import AdmittanceFilter from "./components/Filter";
import BreadCrumbs from "@components/breadcrumbs";
import DataTable from "react-data-table-component";

// ** Store & Actions
import {getData} from "../store";
import {useDispatch, useSelector} from "react-redux";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomPagination from "../../../@core/components/pagination";
import {getSessions} from "../../../api/time";
import {getUserData} from "../../../auth/utils";

const AdmittanceList = () => {
    // ** Translation
    const {t} = useTranslation();

    // ** Store vars
    const {columns} = Column();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.invoice);
    // ** States
    const [value, setValue] = useState("");
    const [sort, setSort] = useState("desc");
    const [sortColumn, setSortColumn] = useState("id");
    const [currentPage, setCurrentPage] = useState(1);
    const [sessions, setSessions] = useState(1);
    const [statusValue] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const breadcumbList = [
        {title: t("Recept")},
        {title: t("Reception list")},
    ];

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

    const dataToRender = () => {
        const filters = {q: value, status: statusValue};

        const isFiltered = Object.keys(filters).some((k) => filters[k].length > 0);

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
    useEffect(() => {
        getSessions({doctorUserId: getUserData().userId}).then((res) => {
            setSessions(res.data.list)
        })
    }, [])

    return (
        <div className="invoice-list-wrapper">
            <BreadCrumbs data={breadcumbList}/>
            <br/>
            <h2 className="m-0 fw-bolder text-center">{t("Reception list")}</h2>
            <br/>
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
                        data={sessions}
                        sortIcon={<ChevronDown/>}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                        paginationDefaultPage={currentPage}
                        paginationComponent={() => (
                            <CustomPagination
                                total={store.total}
                                rowsPerPage={rowsPerPage}
                                onPageChange={(page) => handlePagination(page)}
                                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                            />
                        )}
                        subHeaderComponent={
                            <AdmittanceFilter
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

export default AdmittanceList;
