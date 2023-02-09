import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import swal from "sweetalert2";
import { loginApi } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { FACEBOOK_LOGIN_API } from "../../constants";
import "../../assets/scss/Login/Login.scss";

const Login = () => {
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

  const handleSubmit = async () => {
    await dispatch(loginApi(formLogin.values));
    swal.fire({
      title: "Success",
      text: "Login successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <form
      onSubmit={formLogin.handleSubmit}
      className="container "
      style={{ height: "auto", width: "auto" }}
    >
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <h3
          className="text-center"
          style={{ fontWeight: 500, fontSize: "2rem" }}
        >
          {" "}
          Login
        </h3>

        {/* email*/}
        <div className="mt-3 lg:w-1/2">
          <Input
            name="email"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
            size="large"
            placeholder="email"
            style={{ minWidth: 200, borderRadius: 5 }}
            prefix={<MailOutlined />}
          />
        </div>
        {formLogin.touched.email && (
          <Typography.Text type="danger">
            {formLogin.errors.email}
          </Typography.Text>
        )}

        {/* password */}
        <div className="mt-3 lg:w-1/2">
          <Input
            name="password"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
            type="password"
            size="large"
            placeholder="password"
            style={{ minWidth: 200, borderRadius: 5 }}
            prefix={<LockOutlined />}
          />
        </div>

        {formLogin.touched.password && (
          <Typography.Text type="danger">
            {formLogin.errors.password}
          </Typography.Text>
        )}
        {/* {<p className="text-red-500">{formLogin.errors.password}</p>} */}
        <br />
        {/*  login btn */}
        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 200,
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
            borderRadius: 5,
          }}
          className="mt-5 w-100"
          onClick={() => handleSubmit()}
        >
          Login
        </Button>

        <div className="d-flex justify-content-center">
          <p className="mt-2">
            Don't have an account yet?
            <NavLink to="/register" className="text-blue-500">
              {" "}
              Register now
            </NavLink>
          </p>
        </div>

        {/* fb btn*/}
        <div className="social mt-3 d-flex justify-content-center">
          <FacebookLogin
            appId={FACEBOOK_LOGIN_API}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btnFacebook"
            icon={
              <i className="fa fa-facebook" style={{ marginLeft: "5px" }}></i>
            }
            textButton="&nbsp;&nbsp;Sign In with Facebook"
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
