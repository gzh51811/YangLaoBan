import React, { Component } from "react";
import { Icon, Badge } from "antd";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import commonAction from "../../actions/commonAction";
import "./PersonCenter.scss"
let aa = 0
class PersonCenter extends Component {
    componentWillMount() {
        this.format();
    }
    //初始化
    format() {
        
        
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split("; ");//分割
        //遍历匹配
        // console.log('aaaa' + arrcookie)
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == 'name') {
                aa = arr[1]  
            }
        }
       var cookie = document.cookie
       

        let { mobile } = this.props.login;
        if (mobile != aa) {
            this.props.history.push({
                pathname: "/login"
            })
        }
        this.props.footshow(true);
        this.props.headshow(false);
    }
    render() {
        return (
            <div className="Ycenter">
                <header>
                    <Badge count={5}><Icon type="message" /></Badge>
                    <Icon type="setting" />
                </header>
                <div className="user-base-info">
                    <div className="person-info-1">
                        <img className="person-logo" src="https://m.yanglaoban.com/images/user-index-default-icon.png" id="m-user-headimg-id" />
                        <span id="person-name" className="person-name">{aa}</span>
                        <a className="person-level" id="personLevel" >
                            <span className="img" id="m-level-tab"><img src="https://m.yanglaoban.com/images/lv-default.png" /></span>
                            <span className="name" id="m-level-name">普通会员</span>
                            <div className="icon-arrow">
                                <img src="https://m.yanglaoban.com/images/user-index-arrow.png" width="100%" />
                            </div>
                        </a>
                    </div>
                    <div className="my-order-status">
                        <ul>
                            <li>
                                <img src="https://m.yanglaoban.com/images/user-index-payment.png" />
                                <h2>待付款</h2>
                                <div className="circle-count" id="unpaidCount" style={{ display: "none" }}>0</div>
                            </li>
                            <li >
                                <img src="https://m.yanglaoban.com/images/user-index-ship.png" />
                                <h2>待发货</h2>
                                <div className="circle-count" id="paidCount" style={{ display: "none" }}>0</div>
                            </li>
                            <li >
                                <img src="https://m.yanglaoban.com/images/user-index-delivery.png" />
                                <h2>待收货</h2>
                                <div className="circle-count" id="deliveredCount" style={{ display: "none" }}>0</div>
                            </li>
                            <li>
                                <img src="https://m.yanglaoban.com/images/user-index-succeed.png" />
                                <h2>我的订单</h2>
                            </li>
                        </ul>
                    </div>
                    
                </div><a className="expired-reminder" id="expiredReminder">
                        <span className="txt">即刻开通店主会员，就送惊喜大礼包</span>
                        <div className="icon-arrow">
                            <img src="https://m.yanglaoban.com//images/user-index-arrow2.png" width="100%" />
                        </div>
                    </a>
                <main>
                    <img src={require("../../assets/image/Yperson.jpg")}/>
                </main>
            </div>
        )
    }
}

PersonCenter = connect(state => {
    return state
}, dispatch => bindActionCreators(commonAction, dispatch))(PersonCenter)
export default PersonCenter;