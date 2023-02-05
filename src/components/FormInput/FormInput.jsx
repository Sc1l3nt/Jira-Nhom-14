import React, { useState } from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, Form } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "../../redux/reducers/userReducer";

const FormInput = (props) => {
  let { listRender, textButton, link } = props;

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const renderComponent = (component) => {
    return component;
  };
  const dispatch = useDispatch();

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
        <Button className="mt-4 w-50" size="large">
          {textButton}
        </Button>
      </Form.Item>
      {renderComponent(link)}
    </Form>
  );
};

export default FormInput;
