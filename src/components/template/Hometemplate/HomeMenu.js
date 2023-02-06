import React from 'react'
import { ProjectOutlined, ProfileOutlined } from '@ant-design/icons'
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
                    icon: <ProfileOutlined className='fs-5' />,
                    label: (<a href='profile'>Update Profile</a>),
                },
            ]}
        />
    )
}

export default HomeMenu