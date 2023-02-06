import React from 'react'
import HomeMenu from './HomeMenu'

const HomeSider = (props) => {
    return (
        <div className='sider' style={{ backgroundColor: '#ffffff' }}>
            <div className="logo">
                <div className='d-flex justify-content-center py-3'>
                    <div className='w-50'> 
                        <img className='w-100 bg-light rounded-circle border border-primary border-3 p-1' src='../img/Jira-Logo.png' alt='...' />
                    </div>
                </div>
            </div>
            <HomeMenu />
        </div>
    )
}

export default HomeSider