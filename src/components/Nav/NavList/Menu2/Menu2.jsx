import React from 'react'
import { Link } from 'react-router-dom'
import style from'./menu.css'

export default function Menu2(props){
    const isHover=props.isHover;
    const items = props.items;
    const itemList=items.map((v)=>{
        return <li key={v.cate_id}><Link to={v.game_url.slice(20)}>{v.game_name}</Link></li>
    })
    return(
        isHover &&
        <div className={style.subnav}>
            {/* <i></i> */}
            <div className={style.menu}>
                <h3>热门分类</h3>
                <ul>{itemList}</ul>
            </div>
            <Link className={style.more} to="/directory">全部 &gt;&gt;</Link>
        </div>
    )
}