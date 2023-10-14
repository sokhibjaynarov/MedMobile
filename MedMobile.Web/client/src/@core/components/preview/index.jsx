import { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { CardImg, CardHeader } from "reactstrap";

const PreviewProfileCard = ({ data, title }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <CardHeader className="px-0 pt-0">
        <h4 className="fw-bolder">{t(title)}</h4>
      </CardHeader>
      <div className="d-flex align-items-center pb-2">
        <div>
          <CardImg
            width={80}
            height={80}
            src={data?.photo}
            alt="User Profile Image"
          />
        </div>
        <div>
          <ul className="list-unstyled mb-0 mx-2">
            <li className="lh-base">
              <span className="fw-bolder">{t("First name")}: </span>
              <span>{data?.firstName}</span>
            </li>
            <li className="lh-base">
              <span className="fw-bolder">{t("Last name")}: </span>
              <span>{data?.lastName}</span>
            </li>
            <li className="lh-base">
              <span className="fw-bolder">{t("Father name")}: </span>
              <span>{data?.fatherName}</span>
            </li>
          </ul>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
export default PreviewProfileCard;

PreviewProfileCard.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  fatherName: PropTypes.string,
};
PreviewProfileCard.defaultProps = {
  title: "Details",
};
