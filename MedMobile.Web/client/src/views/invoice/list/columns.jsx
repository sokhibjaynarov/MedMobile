import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { useTranslation } from "react-i18next";
import { Eye, Edit, Trash } from "react-feather";
import { UncontrolledTooltip } from "reactstrap";
import ConfirmDelete from "./components/ConfirmDelete";

const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-info",
      "light-danger",
      "light-success",
      "light-warning",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];

  if (row.avatar.length) {
    return <Avatar className="me-50" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        color={color}
        className="me-50"
        content={row.client ? row.client.name : "John Doe"}
      />
    );
  }
};
export const Column = () => {
  const { t } = useTranslation();
  const { handleConfirmText } = ConfirmDelete(1);
  const columns = [
    {
      name: "ID",
      sortable: true,
      sortField: "id",
      minWidth: "150px",
      maxWidth: "200px",
      cell: (row) => (
        <Link to={`/invoice/preview/${row.id}`}>{`#${row.id}`}</Link>
      ),
    },
    {
      name: t("Doctor"),
      sortable: true,
      minWidth: "350px",
      sortField: "client.name",
      cell: (row) => {
        const name = row.client ? row.client.name : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
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
      minWidth: "150px",
      cell: (row) => (
        <div className="column-action d-flex gap-1 align-items-center">
          <Link id={`pw-tooltip-${row.id}`} to={`/invoice/preview/${row.id}`}>
            <Eye size={17} />
          </Link>
          <Link to={`/invoice/edit/${row.id}`}>
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
