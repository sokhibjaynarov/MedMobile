// ** React Imports
import { Fragment } from "react";

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { ArrowRight } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import Select from "react-select";

const defaultValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email(),
    hospitalId: yup.string(),
    fieldIds: yup.lazy((val) =>
      Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
    ),
    password: yup.string().required(),
  });

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Asosiy ma'lumotlar</h5>
        <small className="text-muted">Asosiy ma'lumotlarni kiriting.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="firstName">
              Ism
            </Label>
            <Controller
              id="firstName"
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Jahongir"
                  invalid={errors.firstName && true}
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="lastName">
              Familiya
            </Label>
            <Controller
              id="lastName"
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Abdullayev"
                  invalid={errors.lastName && true}
                  {...field}
                />
              )}
            />
            {errors.lastName && (
              <FormFeedback>{errors.lastName.message}</FormFeedback>
            )}
          </Col>{" "}
          <Col md="6" className="mb-1">
            <Label className="form-label" for="fatherName">
              Otasining ismi
            </Label>
            <Controller
              id="fatherName"
              name="fatherName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Abdullayevich"
                  invalid={errors.fatherName && true}
                  {...field}
                />
              )}
            />
            {errors.fatherName && (
              <FormFeedback>{errors.fatherName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="phoneNumber">
              Telefon
            </Label>
            <Controller
              id="phoneNumber"
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="+998991801020"
                  invalid={errors.phoneNumber && true}
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email`}>
              Email
            </Label>
            <Controller
              control={control}
              id="email"
              name="email"
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="john.doe@email.com"
                  invalid={errors.email && true}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </Col>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for="password">
              Password
            </Label>
            <Controller
              id="password"
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </div>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="country">
              Country
            </Label>
            <Select
              id={`country`}
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={[]}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="language">
              Language
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              id={`language`}
              options={[]}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              Keyingi
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
