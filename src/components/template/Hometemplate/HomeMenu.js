import React from 'react'
import { ProjectOutlined, SettingOutlined, ProfileOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Link } from 'react-router-dom';

function getItem(key, icon, label, type, children) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const HomeMenu = () => {
    const projectChildren = [
        getItem('projectList', <ProfileOutlined className='fs-5' />, (<Link to='projects'>Projects List</Link>)), 
        getItem('userList', <UserOutlined className='fs-5' />, (<Link to='users'>Users List</Link>)), 
        getItem('projectCreate', <PlusCircleOutlined className='fs-5' />, (<Link to='create-project'>Create Project</Link>)),
    ]
    const managementChildren = [
        getItem('board', <ProjectOutlined className='fs-5' />, (<Link to='projects/:projectId/board'>Kanban Board</Link>)),
        getItem('projectSetting', <SettingOutlined className='fs-5' />, (<Link to='projects/:id/edit'>Project Setting</Link>)),
    ]
    const items = [
        getItem('1', null, <div>Project</div>, 'group', projectChildren),
        getItem('2', null, <div className='mt-3'>Project Management</div>, 'group', managementChildren),
    ]
    return (
        <Menu
            className='fs-6'
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
        />
    )
}

export default HomeMenu