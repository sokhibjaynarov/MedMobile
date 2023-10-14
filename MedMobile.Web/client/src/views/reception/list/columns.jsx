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
                <Link to={`/reception/preview/${row.id}`}>{name}</Link>
              </h6>
            </div>
          </div>
        );
      },
    },
    {
      name: t("Phone"),
      sortable: true,
      sortField: "client.name",
      cell: () => <span>+99899 324 9477</span>,
    },
    {
      name: t("Additional phone"),
      sortable: true,
      sortField: "client.name",
      cell: () => <span>+99899 324 9477</span>,
    },
    {
      right: true,
      name: t("Action"),
      maxWidth: "120px",
      cell: (row) => (
        <div className="column-action d-flex gap-1 align-items-center">
          <Link id={`pw-tooltip-${row.id}`} to={`/reception/preview/${row.id}`}>
            <Eye size={17} />
          </Link>
          <Link to={`/reception/edit/${row.id}`}>
            <Edit size={17} />
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
