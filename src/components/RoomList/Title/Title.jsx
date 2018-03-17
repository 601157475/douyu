import React from 'react'

import style from './title.css'

export default function Title(props){
    const title=props.title;
    return(
        <div className={style.warpper}>
            <a href={props.url||null}>
                {title}
            </a>
        </div>
    )
}