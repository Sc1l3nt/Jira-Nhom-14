import React from 'react'
import { ProjectOutlined, SettingOutlined, ProfileOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

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
        getItem('projectList', <ProfileOutlined className='fs-5' />, (<a href='projects'>Project List</a>)), 
        getItem('projectCreate', <PlusCircleOutlined className='fs-5' />, (<a href='create-project'>Create Project</a>)),
    ]
    const managementChildren = [
        getItem('board', <ProjectOutlined className='fs-5' />, (<a href='projects/:projectId/board'>Kanban Board</a>)),
        getItem('projectSetting', <SettingOutlined className='fs-5' />, (<a href='setting'>Project Setting</a>)),
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
            onClick={(item) => { console.log(item.key) }}
            items={items}
        />
    )
}

export default HomeMenu