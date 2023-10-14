import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Card, CardImg } from "reactstrap";
import {
  Home,
  Award,
  Pocket,
  Calendar,
  AlignLeft,
  AlignRight,
} from "react-feather";
import "./index.scss";
import "@styles/react/pages/page-profile.scss";

const CustomProfile = ({ data, keys }) => {
  // ** Translation
  const { t } = useTranslation();

  return data !== null ? (
    <div id="user-profile">
      <Row>
        <Col sm="12">
          <Card className="profile-header mb-2">
            <CardImg src={data?.coverImg} alt="User Profile Image" top />
            <div className="position-relative">
              <div className="profile-img-container d-flex align-items-center">
                <div className="profile-img">
                  <img
                    alt="Card image"
                    src={data?.avatar}
                    className="rounded img-fluid"
                  />
                </div>
                <div className="profile-title ms-3">
                  <h2 className="text-white">{data?.username}</h2>
                  <p className="text-white">{data?.designation}</p>
                </div>
              </div>
            </div>
            <div className="profile-header-nav">
              <ul className="profile-details-wrapper">
                {keys?.specialization ? (
                  <li>
                    <Award />
                    <span className="detail__label">
                      {t("Specialization")}:
                    </span>
                    <span className="detail__value">Невролог</span>
                  </li>
                ) : (
                  ""
                )}
                {keys?.department ? (
                  <li>
                    <Home />
                    <span className="detail__label">{t("Department")}:</span>
                    <span className="detail__value">Неврология</span>
                  </li>
                ) : (
                  ""
                )}
                {keys?.position ? (
                  <li>
                    <Pocket />
                    <span className="detail__label">{t("Position")}:</span>
                    <span className="detail__value">Bosh shifokor</span>
                  </li>
                ) : (
                  ""
                )}
                {keys?.floor ? (
                  <li>
                    <AlignLeft />
                    <span className="detail__label">{t("Floor")}:</span>
                    <span className="detail__value">2</span>
                  </li>
                ) : (
                  ""
                )}
                {keys?.room ? (
                  <li>
                    <AlignRight />
                    <span className="detail__label">{t("Room")}:</span>
                    <span className="detail__value">201</span>
                  </li>
                ) : (
                  ""
                )}
                {keys?.birthday ? (
                  <li>
                    <Calendar />
                    <span className="detail__label">{t("Birthday")}:</span>
                    <span className="detail__value">3 января 2023 г.</span>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    "No data"
  );
};
export default CustomProfile;
