import React, { useState } from 'react'
import {
    BarsOutlined
} from '@ant-design/icons';
import { Drawer } from 'antd';
import HomeMenu from './HomeMenu';

const HomeSiderMobile = (props) => {
    const [open, setOpen] = useState(false);
    const handleChangeOpen = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className='btn p-0' onClick={handleChangeOpen}>
                <BarsOutlined className='fs-4 text-primary' />
            </div>
            <Drawer className='w-75' title="Jira" placement="left" onClose={handleChangeOpen} open={open}>
                <HomeMenu />
            </Drawer>
        </>
    );
}

export default HomeSiderMobile