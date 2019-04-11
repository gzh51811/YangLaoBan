import React, { Component } from 'react';
import { connect } from "react-redux";
//引进高阶组件
import withAxios from '../hoc/withAxios';
import { withRouter } from 'react-router';
class Xproduct02 extends Component {
    constructor() {
        super();
        this.state = {
            info1: [],
            info2:[]
        }
    }
    //product1
    
    async componentWillMount() {
        let {data:{respBody}} = await this.props.axios.get('/app/activity/topic/detail/h5/1024')
        // console.log(respBody.specialTopics[0].prods);
        this.setState({
            info1: respBody.specialTopics[0].prods
        })
    }
    // product2
    async componentDidMount() {
        let {data:{respBody}} = await this.props.axios.get('/app/activity/topic/detail/h5/1026')
        // console.log('prodect2:',respBody.specialTopics[0].prods);
        this.setState({
            info2: respBody.specialTopics[0].prods
        })
        this.props.dispatch({ type: "HEADSHOW", status: true })
        this.props.dispatch({ type: "FOOTSHOW", status: true })
    }


    jump(prodId) {
        // console.log(this.props)
        this.props.history.push({
            pathname: "/detail",
            search: "?prodId=" + prodId
        })
    }

    render(){
        // console.log('info2:',this.state.info)
        return (
            <div className="product01">
                <div className="subline"></div>
                <div className="special-box">
                    <img className="product01Img" src="https://oss.yanglaoban.com/system/activity/A80964FB89951EE3.jpg"/>
                    <div className="special-prod" style={{background:'#ff8b00'}}>
                        <ul className="product-ul"> 
                        {
                            this.state.info1.map(item=>{
                                return (
                                    <li key={item.bossSkuId} onClick={this.jump.bind(this, item.prodId)}>
                                        <p className="everyImg"><img src={`https://oss.yanglaoban.com/${item.pic}`}/></p>
                                        <p className="product-title">{item.prodName}</p>
                                        <p className="product-vipprice"><span>¥{item.prodPrice}</span></p>
                                        <p className="product-price">¥{item.referPrice}</p>
                                    </li>
                                )
                            })
                        }
                            
                        </ul>
                    </div>
                </div>
                <div className="special-box" style={{background:'#3a3b3d'}}>
                    <img className="product01Img" src="https://oss.yanglaoban.com/system/activity/99C5C9682E997AC1.jpg"/>
                    <div className="special-prod">
                        <ul className="product-ul"> 
                        {
                            this.state.info2.map(item=>{
                                return (
                                    <li key={item.bossSkuId} onClick={this.jump.bind(this, item.prodId)}>
                                        <p className="everyImg"><img src={`https://oss.yanglaoban.com/${item.pic}`}/></p>
                                        <p className="product-title">{item.prodName}</p>
                                        <p className="product-vipprice"><span>¥{item.prodPrice}</span></p>
                                        <p className="product-price">¥{item.referPrice}</p>
                                    </li>
                                )
                            })
                        }
                            
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}

// 高阶组件的应用
Xproduct02 = withAxios(Xproduct02);
Xproduct02 = withRouter(Xproduct02);
Xproduct02 = connect(state => {
    return {
        ...state,
    }
})(Xproduct02)
export default Xproduct02;