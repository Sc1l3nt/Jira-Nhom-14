import React, { useState } from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "../../Redux/Reducers/userReducer";

const FormInput = (props) => {
  let { listRender, textButton, link } = props;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const renderComponent = (component) => {
    return component;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!passwordConfirm) {
      const actionLogin = loginApi({ email, passWord: password });
      dispatch(actionLogin);
    } else {
      const actionRegister = registerApi({
        email,
        password,
        name,
        phoneNumber,
      });
      dispatch(actionRegister);
    }
  };
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
                  onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
        <Button className="mt-4 w-50" size="large" onClick={handleSubmit}>
          {textButton}
        </Button>
      </Form.Item>
      {renderComponent(link)}
    </Form>
  );
};

export default FormInput;
