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
      name: "№",
      sortable: true,
      sortField: "id",
      minWidth: "60px",
      maxWidth: "60px",
      cell: (row, index) => index + 1,
    },
    {
      name: t("FIO"),
      sortable: true,
      minWidth: "300px",
      sortField: "client.name",
      cell: (row) => {
        const name = row?.user
          ? `${row?.user?.firstName} ${row?.user?.lastName}`
          : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">
                <Link to={`/doctors/preview/${row.doctorId}`}>{name}</Link>
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
        const name = row?.hospital ? row?.hospital?.name : "Hospital name";
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
        const fieldName = row?.fields?.length
          ? row?.fields?.map((item) => item?.name).join(", ")
          : "John Doe";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{fieldName}</h6>
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
        const phoneNumber = row?.phoneNumber
          ? row?.phoneNumber
          : "+998992251415";
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <h6 className="user-name text-truncate mb-0">{phoneNumber}</h6>
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
          <Link
            id={`pw-tooltip-${row.doctorId}`}
            to={`/doctors/preview/${row.doctorId}`}
          >
            <Eye size={17} />
          </Link>
          <Link
            id={`up-tooltip-${row.doctorId}`}
            to={`/doctors/edit/${row.doctorId}`}
          >
            <Edit size={17} />
          </Link>
          <a
            id={`dl-tooltip-${row.doctorId}`}
            onClick={(e) => handleConfirmText(e, row.doctorId)}
          >
            <Trash size={17} />
          </a>
          <UncontrolledTooltip
            placement="top"
            target={`pw-tooltip-${row.doctorId}`}
          >
            {t("View")}
          </UncontrolledTooltip>
          <UncontrolledTooltip
            placement="top"
            target={`up-tooltip-${row.doctorId}`}
          >
            {t("Update")}
          </UncontrolledTooltip>
          <UncontrolledTooltip
            placement="top"
            target={`dl-tooltip-${row.doctorId}`}
          >
            {t("Delete")}
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];
  return { columns };
};
