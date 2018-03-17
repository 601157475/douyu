import React from 'react'

import style from "./user.css"
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { handleFeature } from '../../../utils/API.js'
export default class User extends React.Component{

    render(){
        const login=this.props.login;
        return( 
            <ul className={style.wrapper}>
                <FontAwesome name="user" size="lg"/> &ensp;
                {   login.isLogin ?
                    <span>
                        <Link onClick={handleFeature} to={`/user/${login.username}`} style={{color:"#0f0"}}>{login.username}</Link>
                        &ensp;|&ensp;
                        <Link onClick={this.props.handleLoginOut} to={`/user/${login.username}`} style={{color:"#0f0"}}>退出</Link>
                    </span>                
                    :
                    <span>
                        <span className={style.btn} onClick={this.props.handleShowLogin}> 登录 </span>
                        |
                        <span className={style.btn} onClick={this.props.handleRegister}> 注册 </span>
                    </span>
                }
            </ul>
        )
    }
}