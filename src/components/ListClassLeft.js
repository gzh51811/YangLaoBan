import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../sass/Header_ykb.scss";
import { Tabs, Select, Divider } from 'antd';
// import { connect } from "react-redux";
import withAxios from "../hoc/withAxios"
const TabPane = Tabs.TabPane;


// @withAxios
class ListClassLeft extends Component {
    constructor() {
        super();
        this.state = {
            brands:[],
            brandsGoods:[]
        }
        this.changeTab = this.changeTab.bind(this)
    }
    // changeTabPosition = (tabPosition) => {
    //     this.setState({ tabPosition });
    // }
    async componentWillMount(){
        let {data:{respBody:{navList}}} = await this.props.axios.get("http://localhost:2000/ylbapi/app/base/bossNavInfos?_=1553947039403");
        let {data:{respBody:{brandList}}} = await this.props.axios.get("http://localhost:2000/ylbapi/app/home/v2/searchSelectedBrand?navId=11&_=1554000170169");
        // console.log(brandList)
        this.setState({
            brands:navList,
            brandsGoods:brandList
        });
    }
    async changeTab(id){
        let {data:{respBody:{brandList}}} = await this.props.axios.get("http://localhost:2000/ylbapi/app/home/v2/searchSelectedBrand?",{
            params:{
                navId:id,
                _ :Date.now()
            }
        });
        // console.log(brandList)
        this.setState({
            brandsGoods:brandList
        });
    }
    render() {
        return (<div className="Navlf" style={{ marginBottom: 16 }}>

            <Tabs tabPosition="left" onChange={this.changeTab}>
                {this.state.brands.map((item,idx)=><TabPane tab={<span>{item.navName}</span>} key={item.navId}><ul>
                    {item.childNavList.map(goods=><li key={goods.navId}><Link to={`/list?cataId=${goods.cataId}`}>
                    <img src={require="https://oss.yanglaoban.com/"+goods.navIcon}/><span>{goods.navName}</span></Link>
                    </li>)}</ul><ol className="brandsGoods">
                    {this.state.brandsGoods.map(goods=><dl key={goods.brandId}>
                    <img src={require="https://oss.yanglaoban.com/"+goods.brandIcon}/></dl>)}</ol></TabPane>)}
                
            </Tabs>
        </div>
        )
    }

}
ListClassLeft = withAxios(ListClassLeft)
export default ListClassLeft;