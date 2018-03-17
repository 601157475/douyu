import React from 'react'

import style from './logo.css'
import url from './files/react-logo.ico'

export default class Logo extends React.Component{
    render(){
        return <img className={style.logo}
         src={url} alt=""/>
    }
}