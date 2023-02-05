import React from 'react'
import '../../../assets/scss/template/HomeHeaderMobile.scss'
import HomeSiderMobile from './HomeSiderMobile'

const HomeHeaderMobile = () => {
    return (
        <div className='header-mobile'>
            <div className='rounded-bottom border border-primary border-3 p-3'>
                <div className='d-flex justify-content-between'>
                    <HomeSiderMobile/>
                    <div className='logo'>
                        <div className='position-relative'>
                            <div className='position-absolute top-0 start-50 logo-render'>
                                <img className='bg-light rounded-circle p-2 border border-primary border-3' style={{width: '5rem'}} src='../img/Jira-Logo.png' alt='...' />
                            </div>
                        </div>
                    </div>
                    <div>profile</div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeaderMobile 