import React from 'react'
import 'whatwg-fetch'

import style from'./index.css'

import RoomList from '../../components/RoomList/RoomList.jsx'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            live: {}
        };
        this.getAllLive=this.getAllLive.bind(this);
    }
    getAllLive(){
        fetch('/api/RoomApi/live')
        .then(resp=>{return resp.json()})
        .then(data=>this.setState({live:data.data}))
    }
    componentWillMount(){
        this.getAllLive();
    }
    componentDidMount(){
    }
    render(){
        const live=this.state.live
        return (         
            <div className={style.contianer}>
                <RoomList list={live} title="所有直播" />
            </div>
        )
    }

}
export default Home