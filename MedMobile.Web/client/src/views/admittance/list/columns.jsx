import { Link } from "react-router-dom";
import { Eye, Trash } from "react-feather";
import { useTranslation } from "react-i18next";
import ConfirmDelete from "./components/ConfirmDelete";
import { UncontrolledTooltip, Badge } from "reactstrap";

export const Column = () => {
  const { t } = useTranslation();
  const { handleConfirmText } = ConfirmDelete(1);
  const columns = [
    {
      name: t("Doctor"),
      sortable: true,
      minWidth: "200px",
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
      name: t("Patient"),
      sortable: true,
      minWidth: "200px",
      sortField: "client.name",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">
                <Link to={`/patient/preview/${row.id}`}>{name}</Link>
              </h6>
            </div>
          </div>
        );
      },
    },
    {
      name: t("Status"),
      sortable: true,
      center: true,
      minWidth: "150px",
      maxWidth: "150px",
      sortField: "client.name",
      cell: () => <Badge color="success">Pending</Badge>,
    },
    {
      name: t("Date"),
      sortable: true,
      minWidth: "130px",
      maxWidth: "130px",
      sortField: "client.name",
      cell: () => <span>14.05.2022</span>,
    },
    {
      name: t("Reception start time"),
      sortable: true,
      minWidth: "240px",
      sortField: "client.name",
      cell: (row) => <span>14:15</span>,
    },
    {
      name: t("Reception end time"),
      sortable: true,
      minWidth: "280px",
      sortField: "client.name",
      cell: (row) => <span>15:00</span>,
    },
    {
      right: true,
      name: t("Action"),
      maxWidth: "120px",
      cell: (row) => (
        <div className="column-action d-flex gap-1 align-items-center">
          <Link
            id={`pw-tooltip-${row.id}`}
            to={`/admittance/preview/${row.id}`}
          >
            <Eye size={17} />
          </Link>
          <a onClick={(e) => handleConfirmText(e, row.id)}>
            <Trash size={17} />
          </a>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
            {row?.client?.name}
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];
  return { columns };
};
