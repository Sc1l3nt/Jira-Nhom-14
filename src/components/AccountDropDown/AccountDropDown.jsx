import React from "react";
import { Avatar, Button, Dropdown, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_LOGIN } from "../../constants";
import Swal from "sweetalert2";
import { history } from "../../index";
import { Link } from "react-router-dom";
const AccountDropDown = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="row align-items-center">
            <div className="col-2">
              <Avatar src={userLogin?.avatar} />
            </div>
            <div className="col-10">
              <Typography.Text>{userLogin?.name}</Typography.Text>
              <br />
              <Typography.Text>{userLogin?.email}</Typography.Text>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <Typography.Text>
            <Link to="/profile">Project Settings</Link>
          </Typography.Text>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <Typography.Text
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(ACCESS_TOKEN);
            Swal.fire({
              title: "Log out successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/login");
          }}
        >
          Log Out
        </Typography.Text>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      // Đoạn này t CSS để cho nó khỏi bị dính dô nhen
      className="m-5"
    >
      <UserOutlined
        style={{
          border: "1px solid black",
          padding: "16px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      />
    </Dropdown>
  );
};

export default AccountDropDown;
