import React from 'react'
import FontAwesome from 'react-fontawesome'

import style from './more.css'

// props:
// handleMoreLives: 父组件传递的一个函数，用于获取更多数据并修改父组件state，来渲染更多的数据 
export default function More (props){
    return(
        <div className={style.wrapper}>
            <a>
            More
            </a>
        </div>
    )
}