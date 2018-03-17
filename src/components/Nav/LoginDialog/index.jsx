import React from 'react'
import style from './index.css'
import FontAwesome from 'react-fontawesome'

export default class LoginDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usr:"",
            usrMsg:"",
            psw:"",
            pswMsg:"",
            loginMsg:""
        };
        this.handleUsrChange=this.handleUsrChange.bind(this);
        this.handleCheckUsr=this.handleCheckUsr.bind(this);
        this.handlePswChange=this.handlePswChange.bind(this);
        this.handleCheckPsw=this.handleCheckPsw.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
    }
    
    // 登录验证
    handleCheck(){
        const pswMsg=this.state.pswMsg;
        const usrMsg=this.state.usrMsg;
        return pswMsg==="" && usrMsg===""
    }
    // 绑定 usr
    handleUsrChange(e){
        this.setState({usr:e.target.value})
    }
    // usr 验证
    handleCheckUsr(e){
        const usr=this.state.usr;
        if(usr === ""){
            // 不能为空
            this.setState({usrMsg:"用户名不能为空"})
        }else if(! /^[a-zA-Z]\w{4,11}$/.test(usr)){
            this.setState({usrMsg:"由5-12个字符组成,不能以数字开始"})
        }else{
            this.setState({usrMsg:""})
        }
    }
    // 绑定 psw
    handlePswChange(e){
        this.setState({psw:e.target.value})
    }
    // psw 验证
    handleCheckPsw(e){
        const psw=this.state.psw;
        if(psw === ""){
            // 不能为空
            this.setState({pswMsg:"密码不能为空"})
        }else if(psw.length<6){
            this.setState({pswMsg:"密码最少为6位"})
        }else{
            this.setState({pswMsg:""})
        }
    }
    // 提交登录
    handleSubmit(e){
        const usr=this.state.usr;
        const psw=this.state.psw;
        if(this.handleCheck()){
            if(this.props.handleLogin(usr,psw)){
                // 登陆成功

            }else{
                // 登陆失败
                this.setState({loginMsg:"用户名或密码错误!"})
            }
        }
        // e.preventDefault();
    }
    // 清除登录失败后的信息，用于关闭错误消息框
    handleCloseErrMsg=()=>{
        this.setState({loginMsg:""})
    }
    render(){
        return(
            <div className={style.loginDialog}>
                {/* 登陆失败提示层 */}
                <div className={style.errMsgContainer} 
                style={this.state.loginMsg==="" ? {display:"none"} : {display:"block"}}>
                    <div className={style.errMsgBox}></div>
                    <div className={style.errMsg}>
                        <FontAwesome name="warning" /> &ensp;{this.state.loginMsg}
                        <span className={style.errMsgClose} onClick={this.handleCloseErrMsg}>
                            <FontAwesome name="close" />
                        </span>
                    </div>
                </div>
                {/* 登录框层 */}
                <div className={style.loginHeader}>
                    <h1>登录</h1>
                    <span className={style.xx1} title="注册" onClick={this.props.handleRegister}>
                        <FontAwesome name="exchange"/>
                    </span>
                    <i className={style.close} onClick={this.props.handleCloseLogin}>
                        <FontAwesome name="close"/>
                    </i>
                </div>
                <div className={style.loginBody}>
                    <label className={style.inputWrapper}>
                        <FontAwesome name="user-o"/>
                        <input type="text" onBlur={this.handleCheckUsr} onChange={this.handleUsrChange} placeholder="请输入用户名,测试: admin" value={this.state.usr}/>
                    </label>
                    {   this.state.usrMsg==="" 
                        ?
                        <p className={style.warning}></p>
                        :
                        <p className={style.warning}>
                            <FontAwesome name="warning"/>
                            {this.state.usrMsg}
                        </p>
                    }
                    <label className={style.inputWrapper}>
                        <FontAwesome name="lock"/>
                        <input onBlur={this.handleCheckPsw} onChange={this.handlePswChange} type="password" placeholder="请输入密码,测试: admin123" value={this.state.psw}/>
                    </label>
                    {   this.state.pswMsg==="" 
                        ?
                        <p className={style.warning}></p>
                        :
                        <p className={style.warning}>
                            <FontAwesome name="warning"/>
                            {this.state.pswMsg}
                        </p>
                    }
                    <input type="submit" onClick={this.handleSubmit} value="登录" className={style.loginBtn}/>  
                </div>
            </div>
        )
    }
}