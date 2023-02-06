import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom';
import '../../assets/scss/template/LoginTemplate.scss'

const { Content } = Layout;

const LoginTemplateMobile = () => {
    return (
        <div className='login-template'>
            <Layout style={{ overflow: "hidden", backgroundColor: "transparent", height: window.innerHeight }}>
                <Content className='d-flex justify-content-center align-items-center'>
                    <div className="px-3 py-4 w-100">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default LoginTemplateMobile