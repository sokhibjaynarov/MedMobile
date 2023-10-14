import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, Edit, Trash } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import ConfirmDelete from "./components/ConfirmDelete";

export const Column = () => {
  const { t } = useTranslation();
  const { handleConfirmText } = ConfirmDelete(1);
  const columns = [
    {
      name: t("ID Card"),
      sortable: true,
      sortField: "id",
      minWidth: "100px",
      maxWidth: "150px",
      cell: (row) => row.id,
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
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
            </div>
          </div>
        );
      },
    },
    {
      name: t("Specialization"),
      sortable: true,
      sortField: "client.name",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
            </div>
          </div>
        );
      },
    },
    {
      name: t("Phone"),
      sortable: true,
      sortField: "client.name",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{name}</h6>
            </div>
          </div>
        );
      },
    },
    {
      right: true,
      name: t("Action"),
      maxWidth: "120px",
      cell: (row) => (
        <div className="column-action d-flex gap-1 align-items-center">
          <Link id={`pw-tooltip-${row.id}`} to={`/doctors/preview/${row.id}`}>
            <Eye size={17} />
          </Link>
          <Link id={`up-tooltip-${row.id}`} to={`/doctors/edit/${row.id}`}>
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
