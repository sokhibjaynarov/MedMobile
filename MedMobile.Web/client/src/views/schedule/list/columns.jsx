import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, Edit, Trash } from "react-feather";
import { renderUserData } from "@/utility/Helper";
import ConfirmDelete from "./components/ConfirmDelete";
import { UncontrolledTooltip, Badge } from "reactstrap";

export const Column = () => {
  const { t } = useTranslation();
  const { handleConfirmText } = ConfirmDelete(1);
  const columns = [
    {
      name: "ID",
      sortable: true,
      sortField: "id",
      minWidth: "40px",
      maxWidth: "80px",
      cell: (row, index) => (
        <Link to={`/invoice/preview/${row.id}`}>{index + 1}</Link>
      ),
    },
    {
      name: t("Doctor"),
      sortable: true,
      sortField: "client.name",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderUserData(row)}
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
            </div>
          </div>
        );
      },
    },
    {
      name: t("Status"),
      sortable: true,
      sortField: "client.name",
      cell: (row, index) =>
        index % 2 === 0 ? (
          <Badge color="light-success" className="text-uppercase">
            {t("Timetable is set")}
          </Badge>
        ) : (
          <Badge color="light-warning" className="text-uppercase">
            {t("No information added")}
          </Badge>
        ),
    },
    {
      right: true,
      name: t("Action"),
      minWidth: "150px",
      cell: (row) => (
        <div className="column-action d-flex gap-1 align-items-center">
          <Link id={`pw-tooltip-${row.id}`} to={`/invoice/preview/${row.id}`}>
            <Eye size={17} />
          </Link>
          <Link id={`up-tooltip-${row.id}`} to={`/invoice/edit/${row.id}`}>
            <Edit size={17} />
          </Link>
          <a
            id={`dl-tooltip-${row.id}`}
            onClick={(e) => handleConfirmText(e, row.id)}
          >
            <Trash size={17} />
          </a>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
            {t("View")}
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target={`up-tooltip-${row.id}`}>
            {t("Update")}
          </UncontrolledTooltip>
          <UncontrolledTooltip placement="top" target={`dl-tooltip-${row.id}`}>
            {t("Delete")}
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];
  return { columns };
};
