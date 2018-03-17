import React from 'react'

import Room from './Room/Room'
import Title from './Title/Title'

import style from './RoomList.css'


// props： 
// list：直播房间列表,数组
// title: 直播列表类别,传递给 Title 

export default  class RoomList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width:275,
            height:154.55
        }
        this.onWindowResize=this.onWindowResize.bind(this);
    }

    // 当改变组件宽度时,计算出Room组件的宽度
    onWindowResize(e){
        // 宽高比
        const base=275/154.55
        // live为该组件id，获取本组件当前宽度，并计算出Room所需宽高
        const lives=document.getElementById('liveRoom');
        // const current_width=document.body.clientWidth-20;
        const current_width=lives.offsetWidth-40;
        let width=0,height=0;
        // 275 330
        // 154.55 185.46
        if(current_width%(310+20)>0){
            const n=parseInt(current_width/(310+20),10);
            width=current_width/(n+1)-20;
            height=width/base+45;
        }
        this.setState({width:width,height:height})
    }
    componentDidMount(){
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize)
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onWindowResize)
    }
    render(){
        const list=this.props.list;
        const roomlist=list.length>0 && list.map(
            (item)=><Room width={this.state.width} height={this.state.height} key={item.room_id} room_info={item}/>
        )
        return (
            <div className={style.container} id="liveRoom">
                <Title title={this.props.title} url={list.length>0 && list[0].game_url}/>
                <ul className={style.roombox}>
                    {roomlist}
                </ul>
            </div>
        )
    }
}