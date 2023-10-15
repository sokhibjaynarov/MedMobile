// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { useRegister } from "@/api/auth";
import { useDispatch } from "react-redux";
import { handleLogin } from "@store/authentication";
import { Controller, useForm } from "react-hook-form";
import InputPasswordToggle from "@components/input-password-toggle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Register = () => {
  // ** Hooks
  const { skin } = useSkin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SignupSchema = yup.object().shape({
    email: yup.string().email().required("Email majburiy maydon"),
    lastName: yup.string().min(3).required("Familiya majburiy maydon"),
    firstName: yup.string().min(3).required("Ism majburiy maydon"),
    fatherName: yup.string().min(3).required("Otasining ismi majburiy maydon"),
    phoneNumber: yup
      .string()
      .min(13, "Telefon raqam 13 ta raqamdan iborat")
      .max(13, "Telefon raqam 13 ta raqamdan oshmasligi kerak")
      .required("Telefon raqam majburiy maydon"),
    password: yup.string().min(6).required("Parol majburiy maydon"),
  });
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(SignupSchema) });

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const onSubmit = (data) => {
    console.log({ data });
    if (Object.values(data).every((field) => field?.length > 0)) {
      useRegister({ description: "", passportNumber: "", ...data })
        .then((res) => {
          console.log("register api", res);
          if (res.data.error) {
            for (const property in res.data.error) {
              if (res.data.error[property] !== null) {
                setError(property, {
                  type: "manual",
                  message: res.data.error[property],
                });
              }
            }
          } else {
            const data = {
              ...res.data,
              accessToken: res.data.token.token,
            };
            dispatch(handleLogin(data));
            navigate("/dashboard/ecommerce");
          }
        })
        .catch((err) => console.log(err));
    } else {
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key}`,
          });
        }
        if (key === "terms" && data.terms === false) {
          setError("terms", {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="6" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="6"
          sm="12"
        >
          <Col className="mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Ro'yxatdan o'tish 🚀
            </CardTitle>
            <CardText className="mb-2">
              Osonlik bilan ro'yxatdan o'ting va konsultatsiya oling
            </CardText>

            <Form
              action="/"
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="firstName">
                      Ism<span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="firstName"
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Ism"
                          invalid={errors.firstName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.firstName ? (
                      <FormFeedback>{errors.firstName.message}</FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="lastName">
                      Familiya<span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="lastName"
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Familiya"
                          invalid={errors.lastName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.lastName ? (
                      <FormFeedback>{errors.lastName.message}</FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="fatherName">
                      Otasining ismi<span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="fatherName"
                      name="fatherName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Otasining ismi"
                          invalid={errors.fatherName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.fatherName ? (
                      <FormFeedback>{errors.fatherName.message}</FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="email">
                      Email <span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="email"
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          invalid={errors.email && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.email ? (
                      <FormFeedback>{errors.email.message}</FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="phoneNumber">
                      Telefon <span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="phoneNumber"
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="phoneNumber"
                          placeholder="+998991701020"
                          invalid={errors.phoneNumber && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.phoneNumber ? (
                      <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="password">
                      Password <span className="text-danger">*</span>
                    </Label>
                    <Controller
                      id="password"
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <InputPasswordToggle
                          className="input-group-merge"
                          invalid={errors.password && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  {errors.password ? (
                    <FormFeedback>{errors.password.message}</FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <Button type="submit" block color="primary">
                Ro'yxatdan o'tish
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Akkauntingiz bormi?</span>
              <Link to="/login">
                <span>Kirish</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
