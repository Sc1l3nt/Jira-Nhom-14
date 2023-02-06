import React from 'react'
import LoginTemplate from '../templates/LoginTemplate/LoginTemplate'
import LoginTemplateMobile from '../templates/LoginTemplate/LoginTemplateMobile'
import ReponsiveItem from './ReponsiveItem'

const Test = () => {
    return (
        <ReponsiveItem component={LoginTemplate} componentMobile={LoginTemplateMobile}/>
    )
}

export default Test