// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { fetchAllHospital } from "@/api/hospital";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Spinner,
  CardText,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CardAppDesign from "@/views/ui-elements/cards/advance/CardAppDesign";
import { useDebounce } from "@utils";
import UILoader from "@components/ui-loader";

const UsersList = () => {
  // ** States
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  useEffect(() => {
    setLoading(true);
    fetchAllHospital({ searchText: searchTerm })
      .then(({ data }) => {
        setLoading(false);
        setHospitals(data.list);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const handleSearch = useDebounce((event) => {
    setSearchTerm(event.target.value);
  }, 500);

  const Loader = () => {
    return (
      <Fragment>
        <Spinner />
        <CardText className="mb-0 mt-1 text-white">Biroz kuting...</CardText>
      </Fragment>
    );
  };

  const renderContent = () =>
    hospitals.length ? (
      hospitals.map((item, index) => (
        <Col md="4" sm="12" className="mb-1">
          <CardAppDesign key={index} {...item} />
        </Col>
      ))
    ) : (
      <CardText className="text-center">Ma'lumot mavjud emas</CardText>
    );

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex justify-content-end">
          <Button onClick={toggleSidebar} className="btn-icon" color="primary">
            Qo'shish
          </Button>
        </CardHeader>
        <CardBody>
          <Input
            placeholder="Qidiruv"
            onChange={handleSearch}
            className="search-product"
          />
        </CardBody>
      </Card>
      <UILoader blocking={loading} loader={<Loader />}>
        <Row>{renderContent()}</Row>
      </UILoader>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default UsersList;
