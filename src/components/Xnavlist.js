import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';

class Xnavlist extends Component {
    constructor() {
        super();
        this.state = {
            info: [],
            info2:[]
        }
    }
    async componentWillMount() {
        let {data:{respBody}}= await this.props.axios.get('/app/home/v2/selectednavs', {
            params: {
                _:1554722470935
            }
        })
        // console.log(respBody.navs);
        this.setState({
            info: respBody.navs
        })

    }
    async componentDidMount(){
        let {data:{respBody:{prods}}}= await this.props.axios.get('/app/home/v2/selectednavs/prods', {
            params: {
                // reqBody:'%7B%22page%22%3A1%2C%22pageSize%22%3A10%2C%22navId%22%3A999%7D',
                reqBody: {"page":1,"pageSize":10,"navId":999},
                _:1554776070116
                
            }
        })
        // console.log(prods);
        this.setState({
            info2: prods
        })
    }
    render(){
        return (
            <div className="navProdList">
                <div className="navHead">
                    <ul className="navUl">
                    {
                        this.state.info.map(item=>{
                            return (
                                <li key={item.navId}><img src={`https://oss.yanglaoban.com/${item.afterIcon}`}/></li>
                            )
                        })
                    }
                       
                    </ul>
                </div>
                <div className="navContent">
                    <ul className="navContentUl">
                    {
                        this.state.info2.map(item=>{
                            return (
                                <li className="prodItem" key={item.prodId}>
                                <p className="prodImage">
                                    <img src={`https://oss.yanglaoban.com/${item.pic}`}/>
                                </p>
                                <p className="promName">{item.promName}</p>
                                <p className="prodName">{item.prodName}</p>
                                <div className="priceWrapper">
                                    <div className="referPrice">
                                        <p className="label">零售价</p>
                                        <p className="value">¥{item.referPrice}</p>
                                    </div>
                                    <div className="prodPriceWrap">
                                        <p className="label"></p>
                                        <p className="value">¥{item.price}</p>
                                    </div>
                                </div>
                                <div className="saleTotalWrapper">
                                    <div className="upgradeBtn">成为会员</div>
                                    销量
                                    <span className="saleTotal">{item.saledTotal}</span>
                                    <div className="cartBtn">购物车</div>
                                </div>
                            </li>
                            )
                        })
                    }
                       
                    </ul>
                </div>
            </div>
        )
    }
}

// 高阶组件的应用
Xnavlist = withAxios(Xnavlist);
export default Xnavlist;