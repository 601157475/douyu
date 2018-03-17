import React from 'react'
import 'whatwg-fetch'

import style from'./lives.css'

import {searchRoom} from '../../utils/API.js'
import RoomList from '../../components/RoomList/RoomList.jsx'

import {getT2Room} from '../../utils/API.js'

// 该容器显示 目标频道下的所有直播房间 或 显示搜索结果
// 需分离两种功能
class Lives extends React.Component{
    constructor(props){
        super(props);
        this.state={
            live: {},
            isSearch: false,
            search_count: 0
        };
        this.getAllLive=this.getAllLive.bind(this);
        this.getSearch=this.getSearch.bind(this);
    }
    // 获取当前频道所有 live
    getAllLive(path=null){
        // 获取二级频道
        const short_name=path ? path : this.props.match.params.short_name;
        if(short_name)
        {
            const url=getT2Room(short_name);
            fetch(url)
            .then(resp=>{return resp.json()})
            .then(data=>this.setState({live:data.data}))
        }
    }


    // 初始化搜索信息
    getSearch(path=null){
        // 获取 search_str 路由字段
        const str=path ? path : this.props.match.params.search_str;
        if(str){
            this.setState({isSearch:true})
            const url=searchRoom(str,20,0);
            fetch(url)
            .then(resp=>{return resp.json()})
            .then(data=>this.setState({live:data.data.room,search_count:data.data.count}))
        }
    }

    componentWillMount(){
        this.getSearch();
        this.getAllLive();
    }
    componentDidMount(){
    
    } 
    // 利用该生命周期，监听路由变化，重新请求数据
    componentWillReceiveProps(nextProps){
        if (nextProps.location.pathname !== this.props.location.pathname) {
            if(nextProps.match.params.search_str){
                this.getSearch(nextProps.match.params.search_str);
            }
            if(nextProps.match.params.short_name){
                this.getAllLive(nextProps.match.params.short_name);
            }
        } 
    }
    render(){
        const live=this.state.live;
        const isSearch=this.state.isSearch;
        return [         
            <div className={style.contianer} key="hom2" >
                <RoomList list={live} 
                title={isSearch?`搜索结果: ${this.props.match.params.search_str}`
                :
                live.length>0 && live[0].game_name} />
            </div>
        ]
    }

}
export default Lives