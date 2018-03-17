import React from 'react'

import FontAwesome from 'react-fontawesome'
import style from './SideMenu.css'

// 内联样式，当前所在标签
const selected={
    background:"#E8E8E8"
}

export default class SideMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:true
        }
        this.handleOnShow=this.handleOnShow.bind(this);
    }
    
    handleOnShow(){
        const isShow=!this.state.isShow;
        this.refs.menuList.style=isShow ? "" : "display:none";
        this.refs.container.style=isShow ? "" : "max-width:45px;min-width:40px";
        this.setState({isShow});
    }
    //挂载后获取父频道分类信息
    //已转移到父组件
    componentDidMount(){
    }
    render(){
        // 当前标签
        const shortName=this.props.shortName;
        const data=this.props.sort;
        // 标签 UI list
        let li=data.map((v)=>
            <a key={`sidebar-${v.cate_id}`} className={style.item} 
            style={shortName===v.short_name?selected:null}
            data={v.short_name} onClick={this.props.onClick} >
                {v.cate_name}
            </a>
        )
        const head=<a   className={style.item} key="sidebar-all"
                        style={shortName==="all"?selected:null}
                        data="all" onClick={this.props.onClick} >
                        所有分类
                    </a>
        li.unshift(head);
        return(
            <div className={style.container} ref="container">
                <div className={style.list}>
                    <i onClick={this.handleOnShow}>
                        {this.state.isShow ? <FontAwesome name="toggle-on" /> : <FontAwesome name="toggle-off" />}
                    </i>
                </div>
                <div className={style.wrapper} ref="menuList">
                    {/* 填装一级分类 */}
                    
                    {li}
                </div>
            </div>
        )
    }
}