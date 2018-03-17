import React from 'react'
import style from './index.css'

import '../../utils/API.js'
import User from './User/User.jsx'
import Logo from './Logo/Logo.jsx'
import NavList from './NavList/NavList.jsx'
import Search from './Search/Search'
import LoginDialog from './LoginDialog'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dir:[],
            users:[{username:"admin",password:"admin123"}],
            login:{
                isShowDialog:false,
                isLogin:false,
                username:null,
            }
        }
        this.getAllDir=this.getAllDir.bind(this);
        this.sortDir=this.sortDir.bind(this);
        this.handleShowLogin=this.handleShowLogin.bind(this);
        this.handleCloseLogin=this.handleCloseLogin.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    // 模拟服务器端登录验证
    handleLogin(usr,psw){
        const users=this.state.users;
        for( const user of users){
            // 登陆成功
            if(user.username===usr && user.password===psw){
                this.setState({login:{isLogin:true,username:usr,isShowDialog:false}},()=>{
                    localStorage.setItem("login",JSON.stringify(this.state.login));
                })
                return true;
            }
        }
        return false;
        // return users.indexOf({username:username,password:password})
    }
    // 弹出登录框
    handleShowLogin(){
        this.setState({
            login:{isShowDialog:true}
        })
    }
    // 关闭登录框
    handleCloseLogin(){
        this.setState({
            login:{isShowDialog:false}
        })
    }
    // 获取分类
    getAllDir(){
        fetch('/api/RoomApi/game')
        .then(resp=>{return resp.json()})
        .then(data=>this.sortDir(data.data))
    }
    // 分类排序
    sortDir(data){
        const dir=data;
        dir.sort(function(x,y){
        return x.cate_id-y.cate_id
        });
        this.setState({dir:dir})
    }
    // 注册
    handleRegister=()=>{
        alert("尚未开放注册!")
    }
    //  退出登录
    handleLoginOut=(e)=>{
        localStorage.removeItem("login");
        this.setState({login:{
                isShowDialog:false,
                isLogin:false,
                username:null,
        }});
        e.preventDefault();
    }
    componentWillMount(){
        const login=JSON.parse(localStorage.getItem("login"));
        if(login!==null){
            this.setState({
                login:login
            })
        }
        this.getAllDir();
    }
    render(){
        const items=this.state.dir.length>0 ? this.state.dir.slice(0,9) : false;
        return (
            <div className={style.header}>
                <div className={style.loginContainer} style={this.state.login.isShowDialog ? {display:"flex"} : {display:"none"}}>
                    <div className={style.loginDialog}>
                        <LoginDialog handleRegister={this.handleRegister} login={this.state.login} handleCloseLogin={this.handleCloseLogin} handleLogin={this.handleLogin}/>
                    </div>
                    <div className={style.loginWarpper}>
                    </div>
                </div>
                {   items ?
                    <div className={style.nav}>
                        <Logo />
                        <NavList items={items}/>
                        <User handleShowLogin={this.handleShowLogin} handleLoginOut={this.handleLoginOut} login={this.state.login} handleRegister={this.handleRegister}/>
                        <Search />
                    </div>
                :
                null

                }
            </div>
        )
    }
}
export default Nav