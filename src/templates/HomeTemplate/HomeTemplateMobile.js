import React from 'react'
import { Layout, Space } from 'antd';
import HomeHeaderMobile from '../../components/template/Hometemplate/HomeHeaderMobile';
import { Outlet } from 'react-router-dom';
import CreateIssue from '../../components/template/CreateIssue/CreateIssue';

const { Header, Content } = Layout;

const HomeTemplateMobile = () => {
    return (
        <Space direction="vertical" style={{ maxHeight: window.innerHeight, width: '100%' }} size={[0, 48]}>
            <Header><HomeHeaderMobile /></Header>
            <Layout className='bg-gif'>
                <Content style={{ minHeight: window.innerHeight }}>
                    <div className='mt-3'>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <CreateIssue />
        </Space>
    )
}

export default HomeTemplateMobile