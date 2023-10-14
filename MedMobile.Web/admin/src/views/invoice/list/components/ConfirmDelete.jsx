import Swal from "sweetalert2";
import { store } from "@store/store";
import { deleteInvoice } from "../../store";
import { useTranslation } from "react-i18next";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ConfirmDelete = () => {
  const { t } = useTranslation();
  const handleConfirmText = (e, id) => {
    return MySwal.fire({
      title: t("Are you sure"),
      text: t("You won't be able to revert this"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonText: t("Yes, delete it"),
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: t("Deleted"),
          text: t("Your file has been deleted"),
          customClass: { confirmButton: "btn btn-success" },
        });
        e.preventDefault();
        store.dispatch(deleteInvoice(id));
      }
    });
  };

  return { handleConfirmText };
};
export default ConfirmDelete;
