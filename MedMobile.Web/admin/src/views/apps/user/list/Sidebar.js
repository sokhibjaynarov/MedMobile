// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils

// ** Third Party Components
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Form, FormFeedback, Input, Label } from "reactstrap";

// ** Store & Actions
import { addUser } from "../store";
import { useDispatch } from "react-redux";
import InputPasswordToggle from "@components/input-password-toggle";
import { createHospital, fetchAllHospital } from "@/api/hospital";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ** Function to handle form submit
  const onSubmit = (data) => {
    console.log("onSubmit user data", { data });
    setData(data);
    if (checkIsValid(data)) {
      createHospital({ location: "location", ...data }).then((res) =>
        console.log({ res })
      );
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: "",
          status: "active",
          email: data.email,
          currentPlan: plan,
          billing: "auto debit",
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          country: data.country.value,
        })
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("country", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      headerClassName="mb-1"
      contentClassName="pt-0"
      title="Tibbiyot muassasasi"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="name">
            Nomi <span className="text-danger">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Kasalxona nomi"
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            Telefon <span className="text-danger">*</span>
          </Label>
          <Controller
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
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            Email
          </Label>
          <Controller
            id="email"
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                autoFocus
                type="email"
                placeholder="user@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="admin.email">
            Admin email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="adminEmail"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="adminEmail"
                placeholder="user@mail.com"
                invalid={errors.adminEmail && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <div className="d-flex justify-content-between">
            <Label className="form-label" for="password">
              Parol
            </Label>
          </div>
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
        <div className="mb-1">
          <Label className="form-label" for="website">
            Veb sayt
          </Label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Input
                id="website"
                invalid={errors.website && true}
                placeholder="https://www.website.uz"
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="description">
            Tavsif
          </Label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input
                rows="3"
                type="textarea"
                id="description"
                placeholder="Tavsif"
                {...field}
              />
            )}
          />
        </div>
        <Button type="submit" className="me-1" color="primary">
          Saqlash
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Bekor qilish
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
