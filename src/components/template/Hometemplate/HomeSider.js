import React from 'react'
import { Menu } from 'antd'
import { ProjectOutlined, SettingOutlined } from '@ant-design/icons'

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
                className='fs-6'
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={(item)=>{console.log(item.key)}}
                items={[
                    {
                        key: '1',
                        icon: <ProjectOutlined className='fs-5'/>,
                        label: 'Kanban Board',
                    },
                    {
                        key: '2',
                        icon: <SettingOutlined className='fs-5'/>,
                        label: 'Project Settings',
                    },
                ]}
            />
        </div>
    )
}

export default HomeSider