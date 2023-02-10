import React, { useState } from 'react'
import { Button, Drawer, FloatButton, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import CreateForm from './CreateForm';
import { useSelector } from 'react-redux';

const CreateIssue = () => {
    const { taskId } = useSelector(state => state.taskReducer)
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {taskId.id?<FloatButton type="primary" style={{ right: '2rem', bottom: '1.5rem' }} icon={<PlusOutlined className='fs-5' />} tooltip={<div>Create Issue</div>} onClick={showDrawer} />: ''}
            <Drawer
                title="CREATE ISSUE"
                width={window.innerWidth < 720 ? '100%' : 720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <CreateForm />
            </Drawer>
        </>
    )
}

export default CreateIssue