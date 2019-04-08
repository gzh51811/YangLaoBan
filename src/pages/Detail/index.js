import React, { Component } from "react";
import { Icon, Drawer, Button, Carousel, Pagination,Badge } from 'antd';
import "./Detail.scss"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import commonAction from "../../actions/commonAction";
import withAxios from "../../hoc/withAxios"
import { withRouter } from "react-router-dom"
import url from "url"
import Swiper from "../../components/swiper"

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
class List extends Component {
    constructor() {
        super();
        this.state = {
            goodsList: [],
            prodId: "",
            curPage: 1,
            prodImg: [],
            ProdBrandPic: "",
            ProdBrandNameCN: "",
            allRelateBrandProds: [],
            allSeeProds: [],
            visible: false,
            active:"",
            num:1
        }
        this.onChange = this.onChange.bind(this)
        this.changeOpacity = this.changeOpacity.bind(this)

    }
    componentWillMount() {
        this.format()

    }
    componentDidMount() {
        //懒加载
        let _this = this.refs.DetailBox
        _this.addEventListener("scroll", this.changeOpacity.bind(this, _this))
    }

    componentWillUnmount() {
        let _this = this.refs.DetailBox
        _this.removeEventListener("scroll", this.changeOpacity.bind(this, _this))
    }

    //初始化数据
    format() {
        let { query: { prodId } } = url.parse(this.props.history.location.search, true)
        this.props.axios.get("/app/base/share/info", {
            params: {
                reqBody: { "value": prodId, "type": 8 },
                _: 1554215817136
            }

        }).then(res => {
            let { data: { respBody: { shareImg } } } = res;
            this.setState({
                prodImg: [shareImg]
            })
        })
        this.props.axios.get("/app/prod/v2/activity/brandInfo", {
            params: {
                reqBody: { bossProdId: prodId },
                _: 1554290886837
            }

        }).then(res => {
            let { data: { respBody } } = res;
            console.log(respBody)
            this.setState({
                ProdBrandPic: respBody.ProdBrandPic,
                ProdBrandNameCN: respBody.ProdBrandNameCN,
                allRelateBrandProds: respBody.allRelateBrandProds,
                allSeeProds: respBody.allSeeProds
            }, () => {
                console.log(this.state.allRelateBrandProds)
            })
        })
        this.setState({
            prodId
        }, async () => {
            this.props.footshow(false);
            this.props.headshow(false);
        })
    }

    //头部渐变
    changeOpacity(_this) {
        if (_this.scrollTop > 200) {
            let a = _this.scrollTop / 1000;
            this.refs.opa.style.backgroundColor = `rgba(255,255,255,${a})`
            if (a >= 1) {
                this.refs.opa.children[0].style.display = "inline-block"
                this.refs.opa.children[1].style.display = "inline-block"
                this.refs.opa.children[2].style.display = "inline-block"

            } else {
                this.refs.opa.children[0].style.display = "none"
                this.refs.opa.children[1].style.display = "none"
                this.refs.opa.children[2].style.display = "none"
            }
        }
        // if(){

        // }        
        //    this.refs.opa

    }

    onChange(a) {
        this.setState({
            curPage: (a + 1)
        })
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    //选择规格
    chooseType(value){
        this.setState({
            active:value
        },()=>{
            this.refs.confirmBtn.buttonNode.style.backgroundColor="#c11c1c"
            this.refs.confirmBtn.buttonNode.style.color="#fff"
            this.refs.jian.onclick=()=>{
                if(this.state.num>1){
                    this.setState({
                        num:--this.state.num
                    })
                }
                
            }
            this.refs.jia.onclick=()=>{
                this.setState({
                    num:++this.state.num
                })
            }
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return <div className="DetailBox" ref="DetailBox">
            <header ref="opa">
                <span>商品</span>
                <span>详情</span>
                <span>评价</span>
                <Icon type="left-circle" onClick={() => { this.props.history.goBack() }} />
                <IconFont className="provide" type="icon-tuichu" />
                <Icon type="more" />
            </header>
            <Carousel afterChange={this.onChange} dots={false}>
                {this.state.prodImg.map(item => <div key={item}><img src={item} /></div>)}
            </Carousel>
            <Pagination simple current={this.state.curPage} total={this.state.prodImg.length} />
            <main>
                <div className="priceWrapper">
                    <div className="referPrice">
                        <div>零售价</div>
                        <strong><del className="value">￥129.00</del></strong>
                    </div>
                    <div className="prodPrice">
                        <div className="label"><img src={require("../../assets/image/mvp.png")} /></div>
                        <strong className="value">￥87.00</strong>
                    </div>
                </div>
                <div className="mvp">
                    <div className="dis">会员购买商品立省<span>￥11.00</span>
                    </div>
                    <div className="bor"><span>成为会员</span>
                    </div>
                </div>
                <div className="head cor3e" id="prodName">（1瓶装）阳光之宝 北极海豹油软胶囊 100粒/瓶 强健心脑 养肝益肾</div>
                <div className="head-bo fs14 cor999" id="brief">“加拿大小熊啤酒开瓶器钥匙扣” ！多买多送，送完即止！ 开启世界杯啤酒畅饮人生！它是您的血液垃圾的“清洁工”，让血管更通畅，心脑一起深呼吸，能量满满每一天，健康活力+1~</div>
            </main>
            <div className="bra"><img className="" src={require("../../assets/image/au.png")} />澳大利亚&nbsp;|&nbsp;{this.state.ProdBrandNameCN}</div>
            <div className="Ychoose">
                <span>请选择</span>
                <span className="Yval">200粒</span>
                <span className="Yval">400粒</span>
                <Icon type="right-circle" />
            </div>
            <div className="Ypromi">
                <div className="index-line"><img className="" src={require("../../assets/image/index-line11.png")} />全球好货</div>
                <div className="index-line"><img className="" src={require("../../assets/image/index-line22.png")} />产地直采</div>
                <div className="index-line"><img className="" src={require("../../assets/image/index-line33.png")} />100%正品</div>
                <div className="index-line"><img className="" src={require("../../assets/image/index-line44.png")} />无忧退货</div>
            </div>
            <ul className="nation-bo2 fs13 cor3e  clearfix border-b-1px " id="prodBrandTitle">
                <li className="prodBrandPic" id="prodBrandPic">
                    <img src={"https://oss.yanglaoban.com/" + this.state.ProdBrandPic} />
                </li>
                <li className="nation-bo2-content">
                    <div className="prodBrandName">Spring Leaf(Spring Leaf)</div>
                    <div className="prodBrandCount">该品牌有38件商品在售</div>
                </li>
                <li className="textIconWrapper"><span className="text">进入品牌</span><Icon type="right-circle" />
                </li>
            </ul>
            <Swiper allRelate={this.state.allRelateBrandProds}></Swiper>
            <p className="Yrec">大家都在看</p>
            <Swiper allRelate={this.state.allSeeProds}></Swiper>
            <div className="details bortop10" id="descpWrapper" ref="descpWrapper">
                <div className="border" id="descp">
                    <div className="sku-border" id="SKU">
                        <p className="cor666 fs14">蓝帽标识：<span className="cor333">营养补充剂 非食健字</span></p>
                        <p className="cor666 fs14">适用人群：<span className="cor333">成人</span></p>
                    </div>
                    <p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/F742E7241EFE9157.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/F742E7241EFE9157.jpg" alt="1.jpg" style={{ display: "block" }} /><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/E6C082B3FB00633A.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/E6C082B3FB00633A.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/54CB974FCD3EA28B.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/54CB974FCD3EA28B.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/F7FC09C612894927.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/F7FC09C612894927.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/D85BF8BADF8F091C.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/D85BF8BADF8F091C.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/38F69F9A049F90E5.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/38F69F9A049F90E5.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/9DBF86E570BB8A78.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/9DBF86E570BB8A78.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/D9D44EA2C807D6D2.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/D9D44EA2C807D6D2.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/C3202DED1709F34D.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/C3202DED1709F34D.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/7523762E2B6C4201.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/7523762E2B6C4201.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/E82F53ECFD9637BD.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/E82F53ECFD9637BD.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="http://oss.yanglaoban.com/product/23/2305/230502/050/CFFEBA496B948A5A.jpg" data-original="http://oss.yanglaoban.com/product/23/2305/230502/050/CFFEBA496B948A5A.jpg" style={{ display: "block" }} /></p><p><img className="lazy" src="https://oss.yanglaoban.com/product/21/2101/210101/006/19D003156466819B.jpg" data-original="https://oss.yanglaoban.com/product/21/2101/210101/006/19D003156466819B.jpg" style={{ display: "block" }} /></p><p><br /></p>

                </div>
            </div>
            <div id="nav-bot" className="nav-bot iphoneX-fixed-b clearfix saleon border-t-1px">
                <ul className="clearfix">
                    <li className="fl shopCartWrapper border-r-1px" id="shopCartWrapper">
                        <Icon type="shopping-cart" /> <Badge count={1} />
                        <div>购物车</div>
                    </li>
                    <li className="fl serviceWrapper border-r-1px" id="serviceWrapper">
                        <Icon type="qq" />
                        <div>客服</div>
                    </li>
                    <li className="fl collectWrapper" id="collectWrapper">
                        <Icon type="heart" />
                        <div className="text">收藏</div>
                    </li>
                    <li className="fl addCartWrapper" id="addCartBtn" onClick={this.showDrawer}>加入购物车</li>
                    <li className="fl instBuyWrapper" id="instBuyBtn" onClick={this.showDrawer}>立即购买</li>
                </ul>
            </div>
                <Drawer className="Ydrawer"
                    title={<div>
                        <img style={{display:this.state.visible?"block":"none"}} className="YdrawerImg" src={this.state.prodImg[0]}/>
                        <div className="Ypri">
                            <div className="referPrice">
                                <span>零售价</span>&nbsp;&nbsp;
                                <strong><del className="value">￥129.00</del></strong>
                            </div>
                            <div className="prodPrice">
                                <img src={require("../../assets/image/mvp.png")} />
                                <strong className="value">￥87.00</strong>
                            </div>
                            <div className="prodPrice">
                                <strong className="value">请选择:规格1...</strong>
                            </div>
                        </div>
                    </div>
                    }
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div style={{width:"92%"}} id="bossProdSkuPannel" className="sel-check cor3e prod-ri3">
                    <ul className="clearfix " name="规格1">
                        <div className="fs14">规格1</div>
                            <li className={this.state.active=="4867"?"fl fs12 active":"fl fs12"} valid="4867" name="0" onClick={()=>{console.log(666);this.chooseType("4867")}} >200粒</li>
                            <li className={this.state.active=="4868"?"fl fs12 active":"fl fs12"} valid="4868" name="0" onClick={()=>{this.chooseType("4868")}} >400粒</li>
                    </ul>
            </div>
                    <ol className="btn-add-less clearfix">
                        <div className="fs14 numLabel">数量</div>
                        <li className="btn-rem1 border-1px" id="btnCartLess" ref="jian">-</li>
                        <li className="btn-rem2 border-1px" id="txtCartNum" >{this.state.num}</li>
                        <li className="btn-rem3 border-1px" id="btnCartMore" ref="jia">+</li>
                    </ol>
                    <Button ref="confirmBtn" type="danger" block>确定</Button>
                </Drawer>
        </div>
    }
}

List = withRouter(List)
List = withAxios(List)
List = connect(
    state => {
        return { ...state }
    },//将state绑定到props上
    dispatch => bindActionCreators(commonAction, dispatch)//将action函数绑定到props上
)(List)
export default List;