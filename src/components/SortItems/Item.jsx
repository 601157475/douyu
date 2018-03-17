import React from 'react'

import style from './item.css'

export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isHover:false
        }
        this.isHover=this.isHover.bind(this)
        this.isLeave=this.isLeave.bind(this)
    }
    isHover(){
        this.setState({
            isHover:true
        })
    }
    isLeave(){
        this.setState({
            isHover:false
        })
    }
    render(){
        const isHover=this.state.isHover;
        return(
            <li className={style.itemContainer}>
                <span className={style.itemBox} onMouseEnter={this.isHover} 
                    onMouseLeave={this.isLeave}>
                    {/* img 和 a 标签中的data存放频道id */}
                    <img className={style.itemThum} src={this.props.item.game_src||this.props.item.pic_url} 
                    style={isHover?{opacity: 0.8}:null} 
                    alt="图片" onClick={this.props.handleT2Room} data={this.props.item.short_name} />
                    <p className={style.itemTitle} style={isHover?{borderBottomColor: "#D2D2D2"}:null}>
                        <a onClick={this.props.handleT2Room} data={this.props.item.short_name} >
                            {this.props.item.game_name||this.props.item.tag_name}
                        </a>
                    </p>
                </span>
            </li>
        )
    }
}