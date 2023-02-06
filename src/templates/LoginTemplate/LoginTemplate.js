import React from 'react'
import { Layout } from "antd";
import '../../assets/scss/template/LoginTemplate.scss'
import '../../assets/scss/template/TextName.scss'
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const LoginTemplate = () => {
    return (
        <div className='login-template'>
            <Layout style={{ overflow: "hidden", backgroundColor: "transparent", height: window.innerHeight }}>
                <Sider className='position-relative' width={(window.innerWidth / 6) * 4} style={{ backgroundColor: "transparent" }}>
                    <div className='position-absolute top-50 start-50 translate-middle w-100'>
                        <img className='w-75 px-5' src="../img/Jira-Software.png" alt="..." />
                    </div>
                    <h5 className='text-name position-absolute'>Author: Trương Văn Đại & Trần Minh Bảo</h5>
                </Sider>
                <Content className='d-flex justify-content-center align-items-center'>
                    <div className="border rounded border-primary border-3 bg-white px-5 py-3">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default LoginTemplate