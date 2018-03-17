import React from 'react'
import {getT1Live,getT2Live,getT2Room} from '../../utils/API.js'
import style from './directory.css'
import  'whatwg-fetch'

import SortItems from '../../components/SortItems'
import SideMenu from '../../components/SideMenu/SideMenu'

export default class Directory extends React.Component {
    constructor(props) {
        super(props);

        // live: 所有直播房间列表
        // hot: 热门分类
        // dir: 所有分类列表
        // columns: 一级分类列表
        // short_name: 路由参数，分类下的一级频道名 (废除)

        this.state={
            showLive:false,
            live: [],
            hot:[],
            dir: [],
            columns:[],
            short_name:'all',
        };
        this.getAllLive=this.getAllLive.bind(this);
        this.getAllDir=this.getAllDir.bind(this);
        this.sortDir=this.sortDir.bind(this);
        this.getT1=this.getT1.bind(this);
        this.getT2=this.getT2.bind(this);
        this.getT2Room=this.getT2Room.bind(this);
        this.handleShortName=this.handleShortName.bind(this);
        this.handleGetAndSetTag=this.handleGetAndSetTag.bind(this);
    }
   
    // 获取所有直播房间
    getAllLive(){
        fetch('/api/RoomApi/live')
        .then(resp=>resp.json())
        .then(data=>this.setState({live:data.data}))
    }
    //获取所有分类
    getAllDir(){
        fetch('/api/RoomApi/game')
        .then(resp=>resp.json())
        .then(data=>this.sortDir(data.data))
    }
    //获取一级频道数据
    getT1(){
        const url=getT1Live();
        fetch(url)
            .then(resp=>resp.json())
            .then(data=>this.setState({columns:data.data}))
    }
    //将数据数组按cate_id从小到大排序
    sortDir(data){
        const hot=data;
        hot.sort(function(x,y){
        return x.cate_id-y.cate_id
        });
        this.setState({hot:hot})
    }

    // 传递给子组件的函数
    // SortItems 点击事件，将修改状态和查询数据事件汇总,一次传递
    handleGetAndSetTag(e){
        // 当前 all 标签获取数据使用的是 state.hot 而其它标签数据来自state.dir,存在冗余,后续需做出调整
        this.handleShortName(e);
        if(e.target.getAttribute('data')!=="all"){
            this.getT2(e);
        }else{
            this.setState({dir:[],showLive:false})
        }
    }

    // SortItems 事件1: 根据一级频道获取其子频道信息
    getT2(e){
        this.setState({dir:[]})
        //取得short_name
        const short_name=e.target.getAttribute("data")
        const url=getT2Live(short_name);
        fetch(url)
            .then(resp=>resp.json())
            .then(data=>this.setState({dir:data.data,showLive:false}))
    }
    // SortItems 事件2: 点击分类标签修改 short_name ,通过判断 short_name 修改当前访问标签样式  
    handleShortName(e){
        const short_name=e.target.getAttribute("data");
        this.setState({short_name:short_name})
    }
    // 获取二级频道下所有直播房间
    getT2Room(e){
        //获取tag_id
        const short_name=e.target.getAttribute("data");
        const url=getT2Room(short_name);
        fetch(url)
        .then(resp=>resp.json())
        .then(data=>this.setState({live:data.data,showLive:true}))
    }

    componentWillMount(){
        // this.getAllLive();
        this.getAllDir();
        this.getT1();
    }

    render() {
        const sort=this.state.columns;
        const shortName=this.state.short_name;
        const liveList=this.state.live.slice(0); 
        const dir_lists=this.state.dir.length>0?this.state.dir.slice(0):this.state.hot.slice(0); 
        return (
                [
                    <div className={style.wrapper} key="page-dir">
                        <SideMenu key="dir-side-menu" shortName={shortName} sort={sort} onClick={this.handleGetAndSetTag} />,
                        <div className={style.contianer}>
                            <SortItems sort={sort} items={dir_lists} shortName={shortName} onClick={this.handleGetAndSetTag} handleT2Room={this.getT2Room}
                            liveList={liveList} showLive={this.state.showLive} />    
                        </div>
                    </div>    
                ]
        )
    }
}