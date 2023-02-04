import React, { useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import HomeSider from '../../components/template/Hometemplate/HomeSider';
import HomeHeader from '../../components/template/Hometemplate/HomeHeader';

const { Header, Sider, Content } = Layout;

const HomeTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ height: window.innerHeight }}>
            <div className='border border-3 border-primary rounded-end' style={{ backgroundColor: '#ffffff' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <HomeSider />
                </Sider>
            </div>
            <Layout className="site-layout">
                <Header className='p-0 d-flex justify-content-between align-items-center' style={{ background: '#ffffff' }}>
                    <div className='btn' onClick={() => setCollapsed(!collapsed)}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
                    <div className='pe-3'><HomeHeader/></div>
                </Header>
                <Content style={{ margin: '2rem 1rem', background: '#ffffff' }}>
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};


export default HomeTemplate