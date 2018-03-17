import React from 'react'

import style from './drop.css'

export default function Drop(props){
    const isHover=props.isHover;
    return(
        isHover ?
        <i className={[style.normal,style.hover].join(" ")}></i>
        :
        <i className={style.normal} ></i>
    )
}