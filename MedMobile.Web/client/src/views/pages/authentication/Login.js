// ** React Imports
import {useContext, useState} from "react";
import {useSkin} from "@hooks/useSkin";
import {USER_ROLE} from "@/utility/constants";
import themeConfig from "@configs/themeConfig";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {Coffee, X} from "react-feather";
import {AbilityContext} from "@src/utility/context/Can";
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";
import {handleLogin} from "@store/authentication";
import {handleLayout, handleNavbarType} from "@store/layout";

// ** Reactstrap Imports
import {Button, CardTitle, Col, Form, Input, Label, Row,} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/banner.svg";
import illustrationsDark from "@src/assets/images/pages/banner.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import {useLogin} from "@/api/auth";

const ToastContent = ({t, name, role}) => {
    return (
        <div className="d-flex">
            <div className="me-1">
                <Avatar size="sm" color="success" icon={<Coffee size={12}/>}/>
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <h6>{name}</h6>
                    <X
                        size={12}
                        className="cursor-pointer"
                        onClick={() => toast.dismiss(t.id)}
                    />
                </div>
                <span>
          You have successfully logged in as an {role} user to MedMobile. Now
          you can start to explore. Enjoy!
        </span>
            </div>
        </div>
    );
};

const defaultValues = {
    password: "@Admin123",
    loginEmail: "user@gmail.com",
};

const Login = () => {
    // ** Hooks
    const {skin} = useSkin();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ability = useContext(AbilityContext);
    const {ADMIN} = USER_ROLE;
    const [role, setRole] = useState("Patient")
    const {
        control,
        setError,
        handleSubmit,
        formState: {errors},
    } = useForm({defaultValues});

    const source = skin === "dark" ? illustrationsDark : illustrationsLight;

    const onSubmit = (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            useLogin({email: data.loginEmail, password: data.password, role})
                .then((res) => {
                    console.log(res.data);
                    const data = {
                        ...res.data.user,
                        accessToken: res.data.token,
                        refreshToken: res.data.token,
                        role: role,
                    };
                    dispatch(handleLogin(data));
                    if (data.accessToken) {
                        dispatch(handleLayout("vertical"));
                        dispatch(handleNavbarType("floating"));
                    } else {
                        dispatch(handleLayout("vertical"));
                        dispatch(handleNavbarType("floating"));
                    }
                    ability.update(res.data.user);
                    navigate("/dashboard/ecommerce");
                    toast((t) => (
                        <ToastContent
                            t={t}
                            role={data.role || ADMIN}
                            name={data.fullName || data.username || "John Doe"}
                        />
                    ));
                })
                .catch((err) => {
                    console.log({err});
                    setError("loginEmail", {
                        type: "manual",
                        // message: err.response.data.error,
                        message: "Login or password is wrong ",
                    });
                    setError("password", {
                        type: "manual",
                        // message: err.response.data.error,
                        message: "Login or password is wrong ",
                    });
                });
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: "manual",
                    });
                }
            }
        }
    };

    return (
        <div className="auth-wrapper auth-cover">
            <Row className="auth-inner m-0">
                <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                    <img src={themeConfig.app.appLogoImage}/>
                    <h2 className="brand-text text-primary">MedMobile</h2>
                </Link>
                <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <img className="img-fluid" src={source} alt="Login Cover"/>
                    </div>
                </Col>
                <Col
                    className="d-flex align-items-center auth-bg px-2 p-lg-5"
                    lg="4"
                    sm="12"
                >
                    <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                        <CardTitle tag="h2" className="text-left fw-bold mb-1">
                            Welcome to MedMobile! 👋
                        </CardTitle>
                        <div className={"flex "}>
                            <Button color={role == "Patient" && 'success'} onClick={() => setRole("Patient")}
                                    className={"me-1"}>
                                Be'mor
                            </Button>
                            <Button color={role == "Doctor" && 'success'} onClick={() => setRole("Doctor")}>
                                Shifokor
                            </Button>
                        </div>
                        <Form
                            className="auth-login-form mt-2"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-1">
                                <Label className="form-label" for="login-email">
                                    Email
                                </Label>
                                <Controller
                                    id="loginEmail"
                                    name="loginEmail"
                                    control={control}
                                    render={({field}) => (
                                        <Input
                                            autoFocus
                                            type="email"
                                            placeholder="john@example.com"
                                            invalid={errors.loginEmail && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="mb-1">
                                <div className="d-flex justify-content-between">
                                    <Label className="form-label" for="login-password">
                                        Password
                                    </Label>
                                </div>
                                <Controller
                                    id="password"
                                    name="password"
                                    control={control}
                                    render={({field}) => (
                                        <InputPasswordToggle
                                            className="input-group-merge"
                                            invalid={errors.password && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            {errors.password && (<div className="d-flex justify-content-between">
                                <div className={"text-danger"}>Login or email is wrong</div>
                                <Link to="/forgot-password">
                                    <small>Forgot Password?</small>
                                </Link>
                            </div>)}


                            <Button className={"mt-2"} type="submit" color="primary" block>
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};
export default Login;
