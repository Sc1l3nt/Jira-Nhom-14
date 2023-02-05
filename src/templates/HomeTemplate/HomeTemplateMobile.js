import React from 'react'
import { Layout, Space } from 'antd';
import HomeHeaderMobile from '../../components/template/Hometemplate/HomeHeaderMobile';

const { Header, Content } = Layout;

const HomeTemplateMobile = () => {
    return (
        <Space direction="vertical" style={{ maxHeight: window.innerHeight, width: '100%' }} size={[0, 48]}>
            <Header><HomeHeaderMobile /></Header>
            <Layout>
                <Content style={{ minHeight: window.innerHeight}}>
                    Content
                </Content>
            </Layout>
        </Space>
    )
}

export default HomeTemplateMobile