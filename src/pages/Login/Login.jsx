import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Login = () => {
  let listRender = ["email", "password", "remamber&recovery", "login"];
  return (
    <FormInput
      listRender={listRender}
      textButton="Login"
      link={
        <NavLink className="mt-2" to="/register">
          I don't have an account
        </NavLink>
      }
    />
  );
};

export default Login;
