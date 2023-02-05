import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const HomeHeader = (props) => {
    return (
        <div className='header'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='btn' onClick={props.handleChangeCollapsed}>{props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
                <div className='d-flex'>
                    <div>search</div>
                    <button className='userIcon btn'>
                        <div>
                            profile
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader