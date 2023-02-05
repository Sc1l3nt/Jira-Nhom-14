import React from 'react'
import { ProjectOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const HomeMenu = () => {
    return (
        <Menu
                className='fs-6'
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={(item) => { console.log(item.key) }}
                items={[
                    {
                        key: '1',
                        icon: <ProjectOutlined className='fs-5' />,
                        label: 'Kanban Board',
                    },
                    {
                        key: '2',
                        icon: <SettingOutlined className='fs-5' />,
                        label: 'Project Settings',
                    },
                ]}
            />
    )
}

export default HomeMenu