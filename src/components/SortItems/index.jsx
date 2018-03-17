import React from 'react'

import style from './index.css'

import Item from './Item'
import Title from './Title/Title'
import Loading from '../Loading'
import RoomList from '../../components/RoomList/RoomList'

// const SortItem=(item)=>{
//     <li key={item.cate_id} className="sort-item">
//     <a className="sort-item-box">
//         <img className="sort-item-thum" src={item.game_src} alt=""/>
//         <p className="sort-item-title">{item.game_name}}</p>
//         <div className="sort-item-shadow">

//         </div>
//     </a>
//     </li>
// }


//显示二级分类列表或二级频道下的直播房间列表
//通过父组件state.showLive是否为true，展示不同列表

// props: 
// shortName: 传递给 Title, 通过判断当前 tag 的 shortName 来确定当前数据来自哪个 tag 的请求 
export default function SortItems (props){
        const items=props.items.slice(0);
        const liveList=props.liveList.slice(0);
        const shortName=props.shortName;
        return (
            <div className={style.container}>
                <Title sort={props.sort} shortName={shortName} onClick={props.onClick}/>
                <div className={style.items}>
                {props.showLive ?
                    <div className={style.h100}>
                    {   liveList.length>0 ?
                        <RoomList list={liveList} title={liveList.length>0 && liveList[0].game_name} />
                        :
                        <h3>该频道暂无直播</h3>
                    }
                    </div>:
                    <div className={style.h100}>
                    { items.length>0 ?
                        items.map((item)=>
                        {
                            return <Item key={item.tag_id||item.cate_id} item={item} handleT2Room={props.handleT2Room} />;
                        }
                        )    
                        :
                        <Loading />}
                    </div>
                }
                </div>   
            
            </div>
        );
}