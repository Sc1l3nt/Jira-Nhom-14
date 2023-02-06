import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import Search from '../Search/Search';
import AccountDropDown from '../../AccountDropDown/AccountDropDown';

const HomeHeader = (props) => {
    return (
        <div className='header py-2 border border-primary border-3 rounded'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='btn' onClick={props.handleChangeCollapsed}>{props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
                <div className='d-flex'>
                    <Search/>
                    <AccountDropDown />
                </div>
            </div>
        </div>
    )
}

export default HomeHeader