import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';

class Xproduct03 extends Component {
    constructor() {
        super();
        this.state = {
            info1: [],
            info2:[]
        }
    }
    //product1
    
    async componentWillMount() {
        let {data:{respBody}} = await this.props.axios.get('/app/activity/topic/detail/h5/1029')
        // console.log(respBody.specialTopics[0].prods);
        this.setState({
            info1: respBody.specialTopics[0].prods
        })
    }
    // product2
    async componentDidMount() {
        let {data:{respBody}} = await this.props.axios.get('/app/activity/topic/detail/h5/1023')
        // console.log('prodect2:',respBody.specialTopics[0].prods);
        this.setState({
            info2: respBody.specialTopics[0].prods
        })
    }
    render(){
        // console.log('info2:',this.state.info)
        return (
            <div className="product01">
                <div className="subline"></div>
                <div className="special-box">
                    <img className="product01Img" src="https://oss.yanglaoban.com/system/activity/66213F9F844F9A88.jpg"/>
                    <div className="special-prod" style={{background:'#00a9fc'}}>
                        <ul className="product-ul"> 
                        {
                            this.state.info1.map(item=>{
                                return (
                                    <li key={item.bossSkuId}>
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
                <div className="special-box" style={{background:'#5f33ea'}}>
                    <img className="product01Img" src="https://oss.yanglaoban.com/system/activity/A224454FA7038353.jpg"/>
                    <div className="special-prod">
                        <ul className="product-ul"> 
                        {
                            this.state.info2.map(item=>{
                                return (
                                    <li key={item.bossSkuId}>
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
Xproduct03 = withAxios(Xproduct03);
export default Xproduct03;