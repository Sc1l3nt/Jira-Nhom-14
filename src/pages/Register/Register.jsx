import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Input, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  TwitterOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { registerApi } from "../../redux/reducers/userReducer";
import Swal from "sweetalert2";
import { history } from "../../index";

const Register = () => {
  const dispatch = useDispatch();
  const formRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid! Please enter a valid email"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have 6-50 characters!")
        .max(50, "Password must have 6-50 characters!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      name: yup.string().required("Username is required!"),
      phoneNumber: yup
        .string()
        .required("Phone is required!")
        .matches(/^[0-9]+$/g, "Phone must be a number!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    formRegister.setTouched({
      email: true,
      password: true,
    });
    await dispatch(registerApi(formRegister.values));
    Swal.fire({
      title: "Success",
      text: "Register successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    history.push("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          {" "}
          Register CyberBugs
        </h3>

        {/* name*/}
        <div className="mt-3">
          <Input
            name="name"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            size="large"
            placeholder="name"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<UserOutlined />}
          />
        </div>
        {formRegister.touched.name && (
          <Typography.Text type="danger">
            {formRegister.errors.name}
          </Typography.Text>
        )}

        {/* email*/}
        <div className="mt-3">
          <Input
            name="email"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            size="large"
            placeholder="email"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<MailOutlined />}
          />
        </div>
        {formRegister.touched.email && (
          <Typography.Text type="danger">
            {formRegister.errors.email}
          </Typography.Text>
        )}

        {/* phone */}
        <div className="mt-3">
          <Input
            name="phoneNumber"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            size="large"
            placeholder="phone number"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<PhoneOutlined />}
          />
        </div>
        {formRegister.touched.phoneNumber && (
          <Typography.Text type="danger">
            {formRegister.errors.phoneNumber}
          </Typography.Text>
        )}

        {/* password */}
        <div className="mt-3">
          <Input
            name="password"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            type="password"
            size="large"
            placeholder="password"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<LockOutlined />}
          />
        </div>
        {formRegister.touched.password && (
          <Typography.Text type="danger">
            {formRegister.errors.password}
          </Typography.Text>
        )}

        {/* confirm password */}
        <div className="mt-3">
          <Input
            name="passwordConfirm"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
            type="password"
            size="large"
            placeholder="passwordConfirm"
            style={{ minWidth: 300, borderRadius: 5 }}
            prefix={<LockOutlined />}
          />
        </div>
        {formRegister.touched.passwordConfirm && (
          <Typography.Text type="danger">
            {formRegister.errors.passwordConfirm}
          </Typography.Text>
        )}

        <br />

        {/*  signup btn */}
        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
            borderRadius: 5,
          }}
          className="mt-5"
        >
          Register
        </Button>

        <p>
          Already have an account?
          <NavLink to="/login" className="text-blue-500">
            {" "}
            Login now
          </NavLink>
        </p>

        {/* fb btn*/}
        <div className="social mt-3 flex">
          <Button
            style={{
              backgroundColor: "rgb(59,89,152)",
              height: 42,
              width: 42,
              marginRight: 5,
            }}
            shape="circle"
          >
            <span
              className="font-bold flex justify-center"
              style={{ color: "#fff", fontSize: 20 }}
            >
              f
            </span>
          </Button>

          {/* twitter btn */}
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            style={{ height: 41, width: 41 }}
          ></Button>
        </div>
      </div>
    </form>
  );
};

export default Register;
