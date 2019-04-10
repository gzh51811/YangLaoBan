import React,{Component} from "react";
import "../sass/Footer.scss";
import {Icon} from "antd"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import withAxios from "../hoc/withAxios"


class footer extends Component{
    constructor(){
        super();
        this.state = {
            navs:[{
                text:"全球购",
                path:"/home",
                icon:"compass"
            },{
                text:"分类",
                path:"/listclass",
                icon:"compass"
            },{
                text:"购物车",
                path:"/cart",
                icon:"compass",
              
            },{
                text:"个人中心",
                path:"/personcenter",
                icon:"compass"
            }],
            curPage:"全球购"
        }
        this.jump=this.jump.bind(this)
        this.formatCart=this.formatCart.bind(this)
    }
    componentWillMount(){
        this.formatCart()
        let hash = this.props.history.location.pathname
        this.state.navs.map(item=>{
            if(item.path==hash){
                this.setState({
                    curPage:item.text
                })
            }
        })
    }

    //初始化购物车
    formatCart(){
        this.props.axios.get("http://127.0.0.1:1811/orderForm/find").then(res=>{
            console.log(res.data)
            this.props.dispatch({type:"FORMAT_CART",payload:res.data})
        })
    }


    jump({path,text}){
        console.log(path,text)
        this.props.history.push({
            pathname:path
        })
        this.setState({
            curPage : text
        },()=>{
            // console.log(this.state)
        })
    }
    active(text){
        if(text==this.state.curPage){
            return "active"
        }
    }
    render(){
        // console.log(this.props)
        return (
        <div>
            <ul className="footerNav">
            {
                this.state.navs.map(item=><li className={this.active(item.text)} key={item.text} onClick={this.jump.bind(this,item)}>
                    <Icon type={item.icon} />
                    <span>{item.text}</span>
                    </li>
                )
            }
            </ul>
        </div>
    )
    }
    
}
footer = withAxios(footer)
footer = withRouter(footer)
export default connect((state)=>{
    return {
        ...state
    }
})(footer);