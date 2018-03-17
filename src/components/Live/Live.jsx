import React from 'react'
import  'whatwg-fetch'
import FontAwesome from 'react-fontawesome'
import style from './live.css'
import { Link,Prompt } from 'react-router-dom';
import { handleFeature } from '../../utils/API.js'
import Loading from '../Loading'

class Live extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // 服务器返回状态码, -1 为没有此 live
            fetch_status:-1,
            room_info:null,
            loginStatus:null

        };
        this.getRoomInfo=this.getRoomInfo.bind(this);
        this.getOpened=this.getOpened.bind(this);
    }

    // 获取房间详细信息
    getRoomInfo(){
        const room_id=this.props.match.params.id;
        if(room_id){
            fetch(`/api/RoomApi/room/${room_id}`)
            .then(resp=>resp.json())
            .then(data=>
                this.setState({fetch_status:data.error,room_info:data.data})
            )
        }
    }
    // 获取当前已开播时间
    getOpened(){
        const timestamp=Date.parse(new Date(this.state.room_info.start_time));
        const timestamp2=Date.parse(new Date());
        const times=parseInt((timestamp2-timestamp)/1000/60,10);
        return times;
    }
    //  获取 localStorage 中登录信息
    getLoginStorage=()=>{
        const loginStatus=JSON.parse(localStorage.getItem("login"));
        this.setState({loginStatus:loginStatus});
    }
    componentWillMount(){
        this.getRoomInfo();
        this.getLoginStorage();
    }
    componentDidMount(){
        window.addEventListener("storageChanged",this.getLoginStorage)
    }
    componentWillUnmount(){
        window.removeEventListener("storageChanged",this.getLoginStorage)
    }

    render(){
        const room=this.state.room_info;
        const room_id=room ? room.room_id:null;
        const fetch_status=this.state.fetch_status;
        const isLogin=this.state.loginStatus===null ? false : this.state.loginStatus.isLogin;
        // 获取已开播时间
        const times=room_id && this.getOpened();
        // const room_id=null;
        return(
            <div className={style.container}>
                <Prompt message="您确定您要离开当前页面吗？"/>
                {   fetch_status===0 ? 
                    <div className={style.wrapper}>
                        {/* 主播信息 */}
                        <div className={style.header}>
                            <div className={style.avatar}>
                                <img src={room.avatar} alt={room.owner_name} />
                            </div>
                            <div className={style.msgWarpper}>
                                {/* 房间名与粉丝 */}
                                <div className={style.top}>
                                    <h2 className={style.roomName}>
                                        {room.room_name}
                                        <a href={`/report/uid=${room.room_id}`} onClick={handleFeature}>举报</a>
                                    </h2>
                                    {/* 判断是否登录渲染不同UI */}
                                    {
                                        isLogin ?
                                        <div className={style.fans}>
                                            <span className={style.fansIcon}>
                                                <FontAwesome name="heart"/>
                                                <span onClick={handleFeature} className={style.text}>关注</span>
                                            </span>  
                                            <span className={style.fansNum}>{room.fans_num}</span>
                                        </div>
                                        :
                                        <div className={style.fans}>
                                        <span className={style.fansIcon}>
                                                <FontAwesome name="heart"/>
                                                <span className={style.text}>请登录</span>
                                            </span>  
                                            <span className={style.fansNum}>{room.fans_num}</span>
                                        </div>
                                    }
                                </div>
                                
                                {/* 类别与开播时间 */}
                                <div className={style.mid}>
                                    <div className={style.cateName}>
                                        类别：
                                        <Link className={style.link} to={`/directory/game/${room.cate_id}`}>{room.cate_name}
                                        </Link>
                                    </div>
                                    {   room.room_status==="0"?
                                        <div>上次开播时间：{room.start_time}</div>
                                        :
                                        <div>已开播：{times} 分钟</div>
                                    }
                                </div>

                                {/* 主播热度体重 */}
                                <div className={style.bottom}>
                                    <span className={style.item}>主播：<a href={`/user/${room.room_id}`} onClick={handleFeature} title={room.owner_name}>{room.owner_name}</a></span>
                                    <span className={style.item} title="在线人数"><FontAwesome name="eye" />&ensp;{room.online}</span>
                                    <span className={style.item} title="主播体重"><FontAwesome name="gift"/>&ensp;{room.owner_weight}</span>
                                </div>
                                
                            </div>
                        </div>
                        {/* 视频 */}
                        <div className={style.roomVideo}>
                            <embed width="640" height="360" allownetworking="all" allowscriptaccess="always" 
                            src={`https://staticlive.douyucdn.cn/common/share/play.swf?room_id=${room_id}`} quality="high" bgcolor="#000" 
                            wmode="window" allowfullscreen="true" allowFullScreenInteractive="true" type="application/x-shockwave-flash">
                            </embed>                                
                        </div>
                    </div>
                    :
                    <div className={style.wrapper}>
                        { fetch_status ===-1?
                            <Loading />
                            :
                            <h2>该直播间不存在</h2>
                        }
                    </div>
                }
            </div>
        )
    }
}
export default Live;