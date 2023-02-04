import React, { useEffect, useState } from 'react'

const ReponsiveItem = (props) => {
    const [screen, setScreen] = useState({
        with: window.innerWidth,
        height: window.innerHeight
    })
    const setScreenWindow=()=>{
        setScreen({
            with: window.innerWidth,
            height: window.innerHeight
        })
    }
    useEffect(() => {
        window.onload = setScreenWindow
        return () => {
            window.removeEventListener('load', setScreenWindow)
        }
    }, [])

    let Component = props.component
    if(props.componentMobile && screen.with < 768){
        Component = props.componentMobile
    }

    return (
        <Component/>
    )
}

export default ReponsiveItem