import { Layout } from 'antd'
import React from 'react'
import '../../assets/scss/template/LoginTemplate.scss'

const { Content } = Layout;

const LoginTemplateMobile = () => {
    return (
        <div className='login-template'>
            <Layout style={{ overflow: "hidden", backgroundColor: "transparent", height: window.innerHeight }}>
                <Content>
                    Content
                </Content>
            </Layout>
        </div>
    )
}

export default LoginTemplateMobile