import { Avatar, Menu } from 'antd'
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import React from 'react'
import { ACCESS_TOKEN, USER_LOGIN } from '../../constants';
import Swal from "sweetalert2";
import { history } from "../../index";

const UserCard = (props) => {
    const { userLogin } = props
    return (
        <div className='bg-white border border-2 border-primary rounded'>
            <div className="info mt-4 mx-5 bg-white">
                <div className="user">
                    <div className="avatar">
                        <Avatar src={userLogin?.avatar} style={{ width: '7rem', height: '7rem' }} />
                    </div>
                    <div className="text mt-2">
                        <h5>{userLogin?.name}</h5>
                        <p>{userLogin?.email}</p>
                    </div>
                </div>
            </div>
            <Menu
                className='fs-6'
                defaultSelectedKeys={['1']}
                onClick={(item) => { console.log(item.key) }}
                items={[
                    {
                        key: '1',
                        icon: <SettingOutlined className='fs-5' />,
                        label: (<a href='profile'>Profile Setting</a>),
                    },
                    {
                        key: '2',
                        icon: <LogoutOutlined className='fs-5' />,
                        label: (<div onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                            localStorage.removeItem(ACCESS_TOKEN);
                            Swal.fire({
                                title: "Log out successfully",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            history.push("/login");
                        }}>Logout</div>),
                    },
                ]}
            />
        </div>
    )
}

export default UserCard