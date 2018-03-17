import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './navlist.css'

import Drop from './Drop/Drop'
import Menu2 from './Menu2/Menu2'

export default class NavList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isHover:false
        };
        this.onHover=this.onHover.bind(this);
        this.onLeave=this.onLeave.bind(this);
    }
    componentWillMount(){

    }
    onHover(){
        //弹出二级菜单
        const isHover=this.state.isHover;
        if(isHover){
            return;
        }
        this.setState({isHover:true});
        // console.log('hovered')
    }
    onLeave(){
        //隐藏二级菜单
        const isHover=this.state.isHover;
        if(isHover){
            this.setState({isHover:false});
            // console.log('dispeared!')
        }
    }
    render(){
        const isHover=this.state.isHover;
        const items=this.props.items;
        return (
            <ul className={style.container}>
                <li> <NavLink to="/" exact
                    activeClassName={style.selected}> 首页 </NavLink> 
                </li>
                <li> 
                    <NavLink to="/live" activeClassName={style.selected}> 直播 </NavLink> 
                </li>
                <li onMouseEnter={this.onHover}
                    onMouseLeave={this.onLeave}> 
                    <NavLink to="/directory"  activeClassName={style.selected}> 分类 </NavLink> 
                    <Drop isHover={isHover} />
                    <Menu2 items={items} isHover={isHover} className="navlist-menu2"/>
                </li>
                {/* <li> 
                    <a href={path[3]} className={url===path[3]?style.selected:null}> 游戏 </a> 
                </li> */}
            </ul>
        )    
    }
}