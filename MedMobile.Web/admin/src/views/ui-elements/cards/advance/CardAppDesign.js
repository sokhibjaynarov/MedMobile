// ** Third Party Components
import classnames from "classnames";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Badge,
  Button,
  Col,
  Row,
} from "reactstrap";

// ** Avatar Imports
import avatar7 from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import avatar9 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import avatar14 from "@src/assets/images/portrait/small/avatar-s-14.jpg";
import moment from "moment";

const CardAppDesign = (props) => {
  const {
    name,
    email,
    website,
    latitude,
    longitude,
    phoneNumber,
    description,
  } = props;
  const avatarArr = [
    {
      img: avatar9,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      content: "PI",
      color: "light-danger",
    },
    {
      img: avatar14,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      img: avatar7,
      imgHeight: 34,
      imgWidth: 34,
    },
    {
      content: "AL",
      color: "light-secondary",
    },
  ];

  return (
    <Card className="card-app-design">
      <CardBody>
        <Badge color="light-primary">{moment().format("DD.MM.YYYY")}</Badge>
        <CardTitle className="mt-1 mb-75">{name}</CardTitle>
        <CardText className="font-small-2 text-ellipsis mb-2">
          {description}
        </CardText>
        <div className="design-group pt-25">
          <h6 className="section-label">Shifokorlar</h6>
          {avatarArr.map((obj, index) => {
            return (
              <Avatar
                key={index}
                className={classnames({
                  "me-75": index !== avatarArr.length - 1,
                })}
                {...obj}
              />
            );
          })}
        </div>
        <div className="design-planning-wrapper mb-2 py-75">
          <div className="design-planning">
            <CardText className="mb-25">Telefon</CardText>
            <a href={`tel:${phoneNumber}`} className="mb-0">
              {phoneNumber}
            </a>
          </div>
          <div className="design-planning">
            <CardText className="mb-25">Email</CardText>
            <a href={`mailto:${email}`} className="mb-0">
              {email}
            </a>
          </div>
          <div className="design-planning">
            <CardText className="mb-25">Veb sayt</CardText>
            <a href={website} className="mb-0">
              {website}
            </a>
          </div>
        </div>
        <div className="d-grid">
          <Button color="primary">Ba'tafsil</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardAppDesign;
