import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

class Miaosha extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }
    async componentDidMount() {
        new Swiper('.swiper-container', {
            observer: true,
            observeParents: true,
            slidesPerView: 4
        })
        let { data: { respBody: { prodList } } } = await this.props.axios.get('/app/busi/activity/v2/seckill')
        console.log(prodList);
        this.setState({
            info: prodList
        })
    }
    render() {
        return (
            
            <div className="miaosha">
                <div className="seckillContentWrapper">
                    <div className="s-top">
                        <h3 className="skillAdvertiseTitle">限时秒杀</h3>
                        <span className="t1">15点场</span>
                        <span className="t2">下一场</span>
                        <span className="more">更多</span>
                    </div>
                    <div className="seckillProduct swiper-container">
                        <div className="wapper swiper-wrapper">

                            {
                                this.state.info.map(item => {
                                    return <div className="swiper-slide" key={item.bossProdId}>
                                        <div className="chanpin" >
                                            <img src={`https://oss.yanglaoban.com/${item.pic}`} />
                                            <p className="product-title">{item.prodName}</p>
                                            <p className="product-price">¥{item.prodPrice}</p>
                                            <p className="product-del"><del>¥{item.referPrice}</del></p>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// 高阶组件的应用
Miaosha = withAxios(Miaosha);

export default Miaosha