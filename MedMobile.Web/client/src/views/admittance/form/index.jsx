import {Fragment, useEffect, useState} from "react";
import Select from "react-select";
import {selectThemeColors} from "@utils";
import {useTranslation} from "react-i18next";
import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card, CardBody, Col, Form, Label, Row} from "reactstrap";

// ** Styles
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {fetchAllDoctors} from "../../../api/doctors";
import {addSessions, getDoctorTimeLines} from "../../../api/time";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../../../auth/utils";

const AdmittanceForm = () => {
    const {t} = useTranslation();
    const [doctors, setDoctors] = useState([])
    const [timeLines, setTimelines] = useState([])
    const [selectedTimeLine, setSelectedTimeline] = useState([])
    const breadcumbList = [{title: t("Reception list"), link: "/admittance/list"}, {title: t("Add recept")},];
    const navigate = useNavigate();

    const [data, setData] = useState({
        end_date: "", start_date: "", status: "", doctor: "", date: "", receptionType: "",
    });
    useEffect(() => {
        getDoctorTimeLines({doctorUserId: data?.doctor?.value}).then(({data}) => {
            setTimelines(data)
        })
    }, [data?.doctor])

    useEffect(() => {
        fetchAllDoctors().then(({data}) => {
            setDoctors(data.map(item => ({value: item?.userId, label: item?.userId})))
        })
    }, [])


    const onChangeInput = (event, name) => {
        if (name) {
            setData((prev) => ({...prev, [name]: event}));
        } else {
            setData((prev) => ({
                ...prev, [event?.target?.name]: event?.target?.value,
            }));
        }
    };

    const writeTimelines = () => {
        if (timeLines?.length === 0) return <h4>No available time</h4>
        return timeLines.map(item => {
            return <Button onClick={() => setSelectedTimeline(item)}
                           color={selectedTimeLine?.timeLineId === item?.timeLineId && "success"}
                           className={"justify-content-start"}>
                <div className={"m-2"}>From: {moment(item.startDateTime).format("dddd, MMMM Do YYYY, h:mm")}</div>
                <div>To: {moment(item.endDateTime).format("dddd, MMMM Do YYYY, h:mm")}</div>
            </Button>
        })
    }
    const onClickSave = (e) => {
        e.preventDefault()
        addSessions({timeLineId: selectedTimeLine?.timeLineId, userId: getUserData()?.userId}).then(res => {
            debugger
        })
    }

    return (<Fragment>
        <BreadCrumbs data={breadcumbList}/>
        <br/>
        <h2 className="fw-bolder text-center">{t("Recept")}</h2>
        <br/>
        <Card>
            <p className="h4 text-center fw-bold pt-2 m-0" tag="h3">
                Добавить тип приема
            </p>
            <CardBody>
                <Form>
                    <Row>
                        <Col md="6" sm="12" className="mb-1">
                            <Label className="form-label" for="doctor">
                                {t("Doctor")}
                            </Label>
                            <Select
                                isClearable
                                id="doctor"
                                name="doctor"
                                options={doctors}
                                value={data.doctor}
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                placeholder={t("Doctor placeholder")}
                                onChange={(value) => onChangeInput(value, "doctor")}
                            />
                        </Col>
                    </Row>
                    <div>
                        {writeTimelines()}
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button outline type="reset" className="me-1" color="secondary">
                            {t("Cancel")}
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            onClick={onClickSave}
                        >
                            {t("Save")}
                        </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    </Fragment>);
};

export default AdmittanceForm;
