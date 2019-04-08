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
            changebox:false,
            total : 0
        }
    }
    
    //进入购物车页隐藏公共样式 初始化生命函数
    componentDidMount(){
        let footer = document.getElementsByClassName('ant-layout-footer')[0]
        footer.style.display = "none"
        let header = document.getElementsByClassName('ant-layout-header')[0]
        header.style.display = "none"
    }
    componentWillUnmount(){
        let footer = document.getElementsByClassName('ant-layout-footer')[0]
        footer.style.display = "block"
        let header = document.getElementsByClassName('ant-layout-header')[0]
        header.style.display = "block"
    }



    render() {
        var foot_s = document.getElementsByClassName('foot_s')[0]
        let a1 = '';
        let a2 = '';
        let a3 = '';
        
        
        //返回时销毁节点  点击路由跳转时执行
         function fanhui(){
             this.props.history.goBack()
         }


        //解构goodslist
        let { cart: { goodslist } } = this.props;
       
        //香港仓
         goodslist.map(item=>{
             if (item.type == '香港仓发货'){
                 a1 = item.goodslist.length;
             }
         })
         //国内中转仓发货
        goodslist.map(item => {
            if (item.type == '国内中转仓发货') {
                a2 = item.goodslist.length;
            }
        })
        //国内仓发货
        goodslist.map(item => {
            if (item.type == '国内仓发货') {
                a3 = item.goodslist.length;
            }
        })
        //购物车长度
        let lengths = a1 + a2 + a3

       
    
        var onchange = (item) => {
            let zong_1 = '';
            let zong_2 = '';
            let zong_3 = '';
            if(item.zhuangtai){
                this.props.dispatch({ type: 'CHANGE_K', payload: { type: item.type } })
            }else{
                 this.props.dispatch({ type: 'CHANGE_G', payload: { type: item.type} })
            }

            this.props.cart.goodslist.map(item => {
                if (item.type == '香港仓发货' && item.zhuangtai) {
                    //得到数组下的所有状态为选中的数组，与
                    zong_1 = 1
                }
                if (item.type == '国内中转仓发货' && item.zhuangtai) {
                    //得到数组下的所有状态为选中的数组，与
                    zong_2 = 1
                }
                if (item.type == '国内仓发货' && item.zhuangtai) {
                    //得到数组下的所有状态为选中的数组，与
                    zong_3 = 1
                }
            })
            let cc = zong_1 + zong_2 + zong_3
            // console.log(cc)
            if (cc == 3) {
                this.props.dispatch({ type: 'CHANGE_HH', payload: {} })
            }else{
                this.props.dispatch({ type: 'CHANGE_GG', payload: {} })
            }
            this.setState({
                total: 0
            })

            //结算按钮
            for (var i = 0; i < this.props.cart.goodslist.length; i++) {
                let s = this.props.cart.goodslist[i].goodslist.some(goods => { return goods.status == true })
                if (s) {
                    foot_s.style.background = "red";
                    return
                } else {
                    foot_s.style.background = "#999"

                }
            }
        };
        //点击子复选框改变状态
        
        function whs(list,type){
           
            let change = [];
            let goodsarr = []
           this.props.dispatch({ type: 'CHANGE_F', payload: { id:list.cataId, type} })
            // console.log(this.props.cart.goodslist)
            this.props.cart.goodslist.map(item=>{
                if (item.type == type){
                    //得到数组下的所有状态为选中的数组，与
                    goodsarr = item.goodslist 
                    // console.log(item.goodslist)
                    change = item.goodslist.filter(f=>{
                        return f.status;
                    })
                }
               
                //结算按钮
                for (var i = 0; i < this.props.cart.goodslist.length; i++){
                    let s = this.props.cart.goodslist[i].goodslist.some(goods => { return goods.status == true })
                    if (s) {
                        foot_s.style.background = "red";
                        return 
                    }else{
                        foot_s.style.background = "#999"
                        
                    }
                }

                this.setState({
                    total: 0
                })
            })

            //父复选框影响子复选框  用所有商品长度与状态为选中的数组比较
            if (change.length == goodsarr.length){
                this.props.dispatch({ type: 'CHANGE_G', payload: {type}})
            }else{
                this.props.dispatch({ type: 'CHANGE_O', payload: { type} })
            }
        }
        //总复选框
        function onchangeu(e){

            this.setState({
                total : 0
            })
            // console.log(e)
            this.props.dispatch({ type: 'CHANGE_Z', payload: { type: e } })
            //根据数组中的状态去判断是否全选
            if(e.zhuangtai){
                this.props.dispatch({ type: 'CHANGE_T', payload: {} })
                // console.log(123)
            }else{
                this.props.dispatch({ type: 'CHANGE_C', payload: {} })
            }

            //结算按钮
            for (var i = 0; i < this.props.cart.goodslist.length; i++) {
                let s = this.props.cart.goodslist[i].goodslist.some(goods => { return goods.status == true })
                if (s) {
                    foot_s.style.background = "red";
                    return
                } else {
                    foot_s.style.background = "#999"

                }
            }
        }
        //删除
        function del(e){
            // console.log(e)
            e.map(item=>{
                if (item.zhuangtai == true){
                    // console.log(item.name)
                    //得到第一层，父复选框
                    this.props.dispatch({ type: 'CHANGE_CART_DEL', payload: { name: item.name}})
                } else {
                    //如果父复选框都为未选中，找到子复选框中的id
                    item.goodslist.map(item=>{
                        if (item.status == true){
                            this.props.dispatch({ type: 'CHANGE_CART_DELSSS', payload: { id:item.cataId} })
                            // console.log(goodslist)
                        }
                    })
                }
            })
        }
    
        //点击添加数量  函数 onChange事件默认传入参数是value  因为bind把id传过来，所以就有两个参数(先bind ，注意循序)
        let onChangeQty = (id, qty) => {
            this.setState({
                total : 0
            })
            // console.log(qty, id)
            //发起dispatch 传action过去修改store中的value值    id靠bind传过去
            this.props.dispatch({ type: 'CHANGE_QTY', payload: { qty, id } })
        }
      
            //总价
            goodslist.map(item => {
                // console.log(item)
                item.goodslist.filter(goods => {
                    if (goods.status) {
                        this.state.total += goods.price * goods.sum
                    }
                })
            })

        //如果没内容就不渲染节点 过滤掉底下没有数组长度的 
        this.props.cart.goodslist.filter(item => {
            if (item.goodslist.length == 0) {
                // console.log(item.name)
                this.props.dispatch({ type: 'CHANGE_XS', payload: { name: item.name } })
            }
        })

        //封装一个结算变样式
       

        return (
            <div className="cart">
            {/* head */}
                <div className="cart-head">
                    <div className = "head-l">
                        <Row>
                            <Col span={6}>
                                <img src={[require("../../assets/image/Cart_1.png")]} onClick={fanhui.bind(this)}/>
                            </Col>
                            <Col span={13}>购物车（{lengths}）</Col>
                            <Col span={5} className="del" onClick={del.bind(this, this.props.cart.goodslist)}>删除</Col>
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
                                        <div className={ item.name } >
                                            <Checkbox
                                                checked={item.zhuangtai}
                                                onChange={onchange.bind(this, item)}>
                                                {item.type}
                                            </Checkbox>
                                        </div>
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
                                                                <InputNumber min={1} max={5} value={list.sum} onChange={onChangeQty.bind(this, list.cataId)}/>
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
                            <Checkbox onChange={onchangeu.bind(this, this.props.cart)} checked={this.props.cart.zhuangtai}>全选</Checkbox>
                        </Col>
                        <Col span={9} className="foot_t">
                            <span>合计：<i>￥{this.state.total}</i></span>
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
        ...state,
    }
})(Cart)

export default Cart