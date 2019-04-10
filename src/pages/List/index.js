import React, { Component } from "react";
import { Icon, Drawer, Button, Menu } from 'antd';
import "./List.scss"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import commonAction from "../../actions/commonAction";
import Headerykb from "../../components/Header_ykb";
import withAxios from "../../hoc/withAxios"
import { withRouter } from "react-router-dom"
import url from "url"
const SubMenu = Menu.SubMenu;
class List extends Component {
    constructor() {
        super();
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
        this.state = {
            goodsList: [],
            cataId: "",
            curActive: 0,
            order: "stateDateDown",
            priceKey: true,
            visible: false,
            openKeys: ['sub1'],
        }
        this.change = this.change.bind(this)
        this.active = this.active.bind(this)
        this.showDrawer = this.showDrawer.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onOpenChange = this.onOpenChange.bind(this)
        
    }
    componentWillMount() {
        
    }
    componentDidMount() {this.format()
        //懒加载
        this.eleScroll()
    }
    componentWillUnmount() {
        this.removeScroll()
    }
    eleScroll() {
        var page = 0;
        var _this = this;
        this.refs.gt.addEventListener("scroll", function () {
            var t = this.scrollTop;
            var tt = 1075 * (page + 1);
            if (t >= tt) {
                _this.refs.loading.style.display = "block";
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    page++;
                    var { data: { respBody: { prodList } } } = await _this.props.axios.post("http://localhost:2000/ylbapi/app/prod/v2/list", {
                        reqBody: { cataId: _this.state.cataId, order: _this.state.order, page, pageSize: 12, isNationProd: 1 }
                    });
                    // console.log(prodList)
                    _this.setState({
                        goodsList: [..._this.state.goodsList, ...prodList]
                    }, () => {

                    }); _this.refs.loading.style.display = "none";
                }, 2000)
            }

        })
    }
    removeScroll() {
        var page = 0;
        var _this = this;
        this.refs.gt.removeEventListener("scroll", function () {
            var t = this.scrollTop;
            var tt = 1075 * (page + 1);
            if (t >= tt) {
                _this.refs.loading.style.display = "block";
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    page++;
                    var { data: { respBody: { prodList } } } = await _this.props.axios.post("http://localhost:2000/ylbapi/app/prod/v2/list", {
                        reqBody: { cataId: _this.state.cataId, order: _this.state.order, page, pageSize: 12, isNationProd: 1 }
                    });
                    // console.log(prodList)
                    _this.setState({
                        goodsList: [..._this.state.goodsList, ...prodList]
                    }, () => {

                    }); _this.refs.loading.style.display = "none";
                }, 2000)
            }

        })
    }
    //初始化数据
    format() {
        this.refs.Yloading.style.display = "block";
        // this.props.axios.interceptors.request.use(config => {
        //     return config;
        // }, error => {  //请求错误处理
        //     Promise.reject(error)
        // });
        let { query: { cataId } } = url.parse(this.props.history.location.search, true)
        this.setState({
            cataId
        }, async () => {
            this.props.footshow(false);
            this.props.headshow(false);
            var { data: { respBody: { prodList } } } = await this.props.axios.post("/app/prod/v2/list", {
                reqBody: { cataId: this.state.cataId, order: this.state.order, page: 0, pageSize: 12, isNationProd: 1 }
            });
            // console.log(prodList)
            this.setState({
                goodsList: prodList
            },()=>{
                this.refs.Yloading.style.display = "none"
            });
        })
    }
    //价格排序
    priceSort() {
        this.refs.Yloading.style.display = "block"
        let { query: { cataId } } = url.parse(this.props.history.location.search, true)
        this.setState({
            cataId,
            priceKey: !this.state.priceKey
        }, async () => {
            this.props.footshow(false);
            this.props.headshow(false);
            if (this.state.priceKey) {
                var { data: { respBody: { prodList } } } = await this.props.axios.post("/app/prod/v2/list", {
                    reqBody: { cataId: this.state.cataId, order: "priceUp", page: 0, pageSize: 12, isNationProd: 1 }
                });
                // console.log(prodList)
                this.setState({
                    goodsList: prodList
                },()=>{
                    this.refs.Yloading.style.display = "none"
                });
            } else {
                var { data: { respBody: { prodList } } } = await this.props.axios.post("/app/prod/v2/list", {
                    reqBody: { cataId: this.state.cataId, order: "priceDown", page: 0, pageSize: 12, isNationProd: 1 }
                });
                // console.log(prodList)
                this.setState({
                    goodsList: prodList
                },()=>{
                    this.refs.Yloading.style.display = "none"
                });
            }


        })
    }
    change(idx) {
        switch (idx) {
            case 0:
                this.format();
                break;
            case 1:
                this.priceSort();
                break;

        }
        this.setState({
            curActive: idx
        })
    }
    active(idx) {
        if (this.state.curActive == idx) {
            return "active"
        }
    }
    showDrawer() {
        this.change(2);
        this.setState({
            visible: true
        })
    }
    onOpenChange(openKeys){
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    }
    onClose() {
        this.setState({
            visible: false
        })
    }
    jump(prodId){
        this.props.history.push({
            pathname:"/detail",
            search:"?prodId="+prodId
        })
    }
    render() {
        return <div className="ListNav">
            <div className="listHead">
                <Icon type="left" onClick={function () { this.props.history.goBack() }.bind(this)} /><Headerykb></Headerykb>
            </div>
            <div className="listsort">
                <span className={this.active(0)} onClick={this.change.bind(this, 0)}>新品</span>
                <span className={this.active(1)} onClick={this.change.bind(this, 1)}>价格<Icon className={this.state.priceKey + ""} type="caret-up" /><Icon className={!this.state.priceKey + ""} type="caret-down" /></span>
                <span className={this.active(2)} onClick={this.showDrawer}>筛选<Icon type="filter" /></span>
            </div>
            <div className="Yloading" ref="Yloading">
                <Icon type="loading" />
            </div>
            <div className="prodList">
                <ul ref="gt">{
                    this.state.goodsList.map(item => {
                        return <li onClick={this.jump.bind(this,item.prodId)} key={item.prodId}>
                            <img src={`https://oss.yanglaoban.com//${item.pic}`} />
                            <div style={{ lineHeight: "1rem" }}>
                                <span className="prodName">{item.prodName}</span>
                            </div>
                            <div className="priceWrapper">
                                <div className="referPrice">
                                    <div>零售价</div>
                                    <del className="value">￥{item.referPrice.toFixed(2)}</del>
                                </div>
                                <div className="prodPrice">
                                    <div className="label"><img src={require("../../assets/image/mvp.png")} /></div>
                                    <span className="value">￥{item.prodPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="saleTotalWrapper">
                                <span className="upgradeBtn">成为会员</span>
                                <span className="saleTotal"> 销量&nbsp;{item.saledTotal} </span>
                                <Icon type="shopping-cart" />
                            </div>
                        </li>

                    })
                }
                    <li ref="loading" className="loading" style={{ textAlign: "center" }}><Icon type="loading" />正在加载</li>
                </ul>
            </div>
            <div className="rightDown" style={{ position: "absolute" }}>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{ width: 256 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Drawer>
            </div>
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