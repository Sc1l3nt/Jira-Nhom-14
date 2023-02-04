import React from 'react'
import { Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'

const HomeSider = () => {
    return (
        <div style={{backgroundColor: '#ffffff'}}>
            <div className="logo">
                <div className='d-flex justify-content-center py-3'>
                    <div className='w-50'>
                        <img className='w-100 bg-light rounded-circle p-2 border border-primary border-3' src='../img/Jira-Logo.png' alt='...' />
                    </div>
                </div>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </div>
    )
}

export default HomeSider