import React, { useState } from 'react'
import { Layout } from 'antd';
import HomeSider from '../../components/template/Hometemplate/HomeSider';
import HomeHeader from '../../components/template/Hometemplate/HomeHeader';

const { Header, Sider, Content } = Layout;

const HomeTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);
    const handleChangeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ minHeight: window.innerHeight }}>
            <Sider trigger={null} collapsible collapsed={collapsed} className='border border-3 border-primary rounded-end bg-white'>
                <HomeSider />
            </Sider>
            <Layout className="site-layout">
                <Header className='bg-white p-0'>
                    <HomeHeader handleChangeCollapsed={handleChangeCollapsed} collapsed={collapsed} />
                </Header>
                <Content className='bg-white'>
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};


export default HomeTemplate