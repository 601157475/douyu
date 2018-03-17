import React from 'react'
import {withRouter} from 'react-router-dom'
import style from './search.css'
import FontAwesome from 'react-fontawesome'

// 通过高阶组件 withRouter 包装Search，使用 history 控制路由跳转

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state={
            search_str: null
        }
        this.handleChanged=this.handleChanged.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }
    // 搜索框改变则修改state值
    handleChanged(e){
        const search_str=e.target.value;
        this.setState({search_str:search_str});
        
    }
    handleSearch(){
        if(!this.state.search_str){
            return
        }
        // router v4.0 推荐用法
        this.props.history.push(`/search/${this.state.search_str}`)
    }
    render(){
        return(
            <div className={style.wrapper}>
                <input type="text" className={style.search} placeholder="房间/主播/视频" onChange={this.handleChanged}/>
                <span className={style.btn} onClick={this.handleSearch}><FontAwesome name="search" /></span>
            </div>
        )
    }
}
export default withRouter(Search)