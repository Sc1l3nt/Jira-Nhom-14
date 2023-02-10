import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card, Popconfirm } from 'antd'
import React from 'react'

const { Meta } = Card

const UserListCard = (props) => {
    const { user, handleEditUser, handleDelete } = props;
    return (
        <div>
            <Card
                style={{ width: '100%', marginTop: 16 }}
                actions={[
                    <SettingOutlined className='fs-4' key="setting" onClick={()=>handleEditUser(user)} />,
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={()=>handleDelete(user)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className='fs-4' key="delete" />
                    </Popconfirm>
                ]}
            >
                <Meta
                    avatar={<Avatar src={user.avatar} />}
                    title={user.name}
                    description={<div className=''>
                        <p className='mb-0'>Email: {user.email}</p>
                        <p className='mb-0'>Phone: {user.phoneNumber}</p>
                    </div>}
                />
            </Card>
        </div>
    )
}

export default UserListCard