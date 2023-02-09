import React from "react";
import { Avatar, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../../assets/scss/AcountDropDown/AcountDropDown.scss";
import UserCard from "./UserCard";
const AccountDropDown = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  return (
    <Dropdown
      dropdownRender={() => <UserCard userLogin={userLogin} />}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="btn p-0">
        <Avatar src={userLogin?.avatar} />
        <CaretDownOutlined className="ms-1 text-secondary icon-drop" />
      </div>
    </Dropdown>
  );
};

export default AccountDropDown;
