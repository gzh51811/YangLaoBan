import React, { Component } from 'react';
import Scss from './Cart.scss'
import { Row, Col, Checkbox, InputNumber} from 'antd';
import { connect } from 'react-redux'

class Cart extends Component {
    constructor() {
        super();
        //获取初始化数据
        this.state = {
            //解析：初始化步骤  因为传过来就是个数组，不用再给goodslist：...store.getState() 了，本身就是个goodslist，而在下边直接结构goodslist
           changebox:false
        }
       
    
    }

    onchangeu = (type) => {
        console.log(6666666)
    }
    //进入购物车页隐藏公共样式 初始化生命函数
    componentDidMount(){
        let footer = document.getElementsByClassName('ant-layout-footer')[0]
        footer.style.display = "none"
        let header = document.getElementsByClassName('ant-layout-header')[0]
        header.style.display = "none"
    }
    //返回时重新加载公共样式  销毁生命周期函数
    componentWillUnmount(){
        let footer = document.getElementsByClassName('ant-layout-footer')[0]
        footer.style.display = "block"
        let header = document.getElementsByClassName('ant-layout-header')[0]
        header.style.display = "block"
    }


    render() {
        //解构goodslist
        
        let { cart: { goodslist } } = this.props;
        //
        // console.log(this.props);

       
        var onchange = (item) => {
            if(item.zhuangtai){
                this.props.dispatch({ type: 'CHANGE_K', payload: { type: item.type } })
            }else{
                 this.props.dispatch({ type: 'CHANGE_G', payload: { type: item.type} })
            }
           

        };
    
        function whs(list,type){
            console.log(this.props)
            let change = [];
            let goodsarr = []
           this.props.dispatch({ type: 'CHANGE_F', payload: { id:list.cataId, type} })
            // console.log(this.props.cart.goodslist)
            this.props.cart.goodslist.map(item=>{
                if (item.type == type){
                    goodsarr = item.goodslist 
                    // console.log(item.goodslist)
                    change = item.goodslist.filter(f=>{
                        return f.status;
                    })
                }
            })
            if (change.length == goodsarr.length){
                this.props.dispatch({ type: 'CHANGE_G', payload: {type}})
            }else{
                this.props.dispatch({ type: 'CHANGE_O', payload: { type} })
            }
        }

        return (
            <div className="cart">
            {/* head */}
                <div className="cart-head">
                    <div className = "head-l">
                        <Row>
                            <Col span={6}>
                                <img src={[require("../../assets/image/Cart_1.png")]}/>
                            </Col>
                            <Col span={13}>购物车（{goodslist.length}）</Col>
                            <Col span={5}>删除</Col>
                        </Row>
                    </div>
                </div>
                {/* cont */}
                <div className="cart-cont">
               
                    <div className="cont-xianggang">
                        <ul className="xg_cont">
                            {goodslist.map((item)=>{
                                return (
                                    <div key={item.type}>
                                        <div className="xg_hand" ><Checkbox 
                                            checked={item.zhuangtai}
                                        onChange={onchange.bind(this, item)}></Checkbox></div>
                                        {item.goodslist.map((list)=>{
                                            return (
                                                <li key={list.cataId}>
                                                    <Checkbox checked={list.status} onChange={whs.bind(this, list,item.type)}></Checkbox>
                                                    <div className="xg_cont_l">
                                                        <img src={'https://oss.yanglaoban.com/'+ list.ablum} />
                                                    </div>
                                                    <div className="xg_cont_r">
                                                        <span>{list.prodName}</span>
                                                        <div className="xg_cont_c">
                                                            <span className="xg_cont_r_l">零售价：<i>￥{list.price}</i></span>
                                                            <span className="xg_cont_r_r">
                                                                <InputNumber min={1} max={5} value={list.sum} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </div>
                                )
                                   
                            })}
                            
                        </ul>
                    </div>
                </div>
                {/* footer */}
                <div className="cart-foot">
                    <Row>
                        <Col span={6}>
                            <Checkbox>全选</Checkbox>
                        </Col>
                        <Col span={9} className="foot_t">
                            <span>合计：<i>$0.00</i></span>
                            <span>不含税费和运费</span>
                        </Col>
                        <Col span={9} className="foot_s">结算</Col>
                    </Row>
                </div>
            </div>
        )
    }

}
Cart = connect(state=>{
    return {
        ...state
    }
})(Cart)

export default Cart