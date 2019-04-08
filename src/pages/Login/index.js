import React, { Component } from "react";
import { Icon ,Button} from "antd";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import commonAction from "../../actions/commonAction";
import "./Login.scss"
import loginAction from "../../actions/loginAction";
class Login extends Component {
    constructor(){
        super()
        this.jump = this.jump.bind(this)
    }
    componentWillMount() {
        this.format();
    }
    //初始化
    format() {
        this.props.a.footshow(false);
        this.props.a.headshow(false);
    }
    jump(){
        if(this.refs.account.value==this.props.login.mobile&&this.refs.loginCode.value==this.props.login.password){
            this.props.history.goBack()
        }
    }
    render() {
        return (
            <div className="Ylogin">
                <header>
                    <Icon type="left" onClick={()=>{
                        // this.props.history.push({
                        //     // pathname:"/home"
                        // })
                    }}/>
                    <span>登录注册</span>
                </header>
                <main>
                    <div className="Yinput">
                        <div className="Ymobile">
                        <Icon type="mobile" /><input type="number" className="account" maxLength="11" placeholder="请输入手机号码" ref="account"/>
                        </div>
                        <div className="Ymsg">
                        <Icon type="message" /><input type="text" className="loginCode" maxLength="6" placeholder="请输入密码" ref="loginCode" />
                        <div className="getCodeBtn">找回密码</div>
                        </div>
                        <Button block onClick={this.jump}>确定</Button>
                        <div className="Ymethod">
                            <div className="voiceCodeWrapper">新账号注册</div>
                            <div className="pwdLoginBtn changeLoginBtn">验证码登录</div>
                        </div>
                        <img className="youhui" src="https://m.yanglaoban.com/images/loginBenefit-default-black.jpg" />
                        <div className="agreement"><div className="agreeCheck checked"></div><span>已阅读并同意<a href="javascript:;" className="agreementBtn">《洋老板用户服务协议》</a></span></div>
                    </div>
                </main>
                <div id="_commonToast" ref="_commonToast" >账号或密码不正确</div>
            </div>
        )
    }
}

Login = connect(state => {
    return state
}, (dispatch) => {
    return {a:bindActionCreators(commonAction,dispatch),
    b:bindActionCreators(loginAction,dispatch)}
})(Login)
export default Login;