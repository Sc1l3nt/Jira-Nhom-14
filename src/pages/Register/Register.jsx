import React from "react";
import { NavLink } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";

const Register = () => {
  let listRender = ["email", "password", "comfirm", "name", "phone", "login"];
  return (
    <FormInput
      listRender={listRender}
      textButton="Register"
      link={
        <NavLink className="mt-2" to="/login">
          I already have an account
        </NavLink>
      }
    />
  );
};

export default Register;
