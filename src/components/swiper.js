import React, { Component } from "react";
import { connect } from "react-redux";
import {Icon} from "antd"
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
class SwiperCom extends Component {
    constructor() {
        super();
        this.state = {
        }

    }
    componentDidMount() {

        
    }
    render(){
        if(this.props.allRelate.length>0){
            new Swiper('.swiper-container', {
                slidesPerView : 4,
                centeredSlides : false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                
            })
        }
        return (
            <div className="Yswiper">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {this.props.allRelate.map((item,idx)=>{
                        return <div className="swiper-slide" key={idx}>
                            <img src={"https://oss.yanglaoban.com/"+item.pic}/>
                            <h1>{item.prodName}</h1>
                            <div className="priceWrap">                        <div className="prodPriceWrap"><Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /><span className="prodPrice">¥{item.minPrice}</span></div>                        <div className="referPriceWrap"><span className="t">零售价</span><span className="referPrice">¥{item.maxReferPrice}</span></div>                    </div>
                        </div>
                    })}
                </div>
            </div>
            
          </div>
        )
    }
    
}

export default connect((state) => {
    return {
        state
    }
})(SwiperCom);