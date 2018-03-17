import React from 'react'

import style from './title.css'

// 内联样式, 标签被选中显示
const selected={
    color: "#FFF",
    background: "#ff630e"
}

export default function Title(props){
    // 根据传递进来的一级频道生成小标签
    const shortName=props.shortName;
    const items=props.sort.map((v)=>
        {return(
            <li className={style.item} key={v.cate_id}>
                <a onClick={props.onClick} data={v.short_name} style={shortName===v.short_name?selected:null}>{v.cate_name}</a>
            </li>)
        }
    )

    return(
        <div className={style.warpper}>
            <div className={style.title}>
                全部分类
            </div>
            <ul className={style.classify}>
                <li className={style.item}>
                    <a onClick={props.onClick} data="all" style={shortName==="all"?selected:null}>全部</a>
                </li>
                {items}
            </ul>
            <div className={style.clear}></div>
            <hr />

        </div>
    )

}