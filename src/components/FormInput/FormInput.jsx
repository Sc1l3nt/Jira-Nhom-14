import React, { useState } from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, Form } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "../../redux/reducers/userReducer";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert2";

const FormInput = (props) => {
  let { listRender, textButton, link } = props;

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const renderComponent = (component) => {
    return component;
  };
  const dispatch = useDispatch();

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have 6-50 characters!")
        .max(50, "Password must have 6-50 characters!"),
      name: yup.string().required("Username is required!"),
      phoneNumber: yup
        .string()
        .required("Phone is required!")
        .matches(/^[0-9]+$/g, "Phone must be a number!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formLogin.setTouched({
        email: true,
        password: true,
      });

      if (!formLogin.isValid) {
        swal("Please check again!");
        return;
      }
    },
  });

  const formRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Password must have 6-50 characters!")
        .max(50, "Password must have 6-50 characters!"),
      name: yup.string().required("Username is required!"),
      phoneNumber: yup
        .string()
        .required("Phone is required!")
        .matches(/^[0-9]+$/g, "Phone must be a number!"),
    }),
  });

  return (
    <Form
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: window.innerHeight }}
    >
      <h1>Welcome</h1>
      {listRender?.map((item, i) => {
        let Component;
        switch (item) {
          case "email": {
            Component = (
              <Form.Item
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  prefix="@"
                  allowClear
                  maxLength={255}
                  id="email"
                  name="email"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                />
              </Form.Item>
            );
            break;
          }
          case "password": {
            Component = (
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
                allowClear
                id="password"
                name="password"
                onChange={formLogin.handleChange}
                onBlur={formLogin.handleBlur}
              />
            );
            break;
          }
          case "comfirm": {
            Component = (
              <Form.Item
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Comfirm Password"
                  prefix={<LockOutlined />}
                  id="passwordConfirm"
                  name="passwordConfirm"
                />
              </Form.Item>
            );
            break;
          }
          case "name": {
            Component = (
              <Form.Item>
                <Input
                  size="large"
                  placeholder="Name"
                  prefix={<UserOutlined />}
                  id="name"
                  name="name"
                />
              </Form.Item>
            );
            break;
          }
          case "phone": {
            Component = (
              <Form.Item>
                <Input
                  size="large"
                  placeholder="Phone number"
                  prefix={<PhoneOutlined />}
                  id="phone"
                  name="phone"
                />
              </Form.Item>
            );
            break;
          }
          case "remamber&recovery": {
            Component = (
              <div className="d-flex justify-content-between">
                <Checkbox onChange={onChange}>Remember me</Checkbox>
                <NavLink to="">Forgot Password?</NavLink>
              </div>
            );
            break;
          }
          default: {
            Component = undefined;
          }
        }
        return (
          <div key={i} className="mt-3 w-50">
            {renderComponent(Component)}
          </div>
        );
      })}
      <Form.Item className="w-100" style={{ marginLeft: "50%" }}>
        <Button
          className="mt-4 w-50"
          size="large"
          onClick={formLogin.handleSubmit}
        >
          {textButton}
        </Button>
      </Form.Item>
      {renderComponent(link)}
    </Form>
  );
};

export default FormInput;
