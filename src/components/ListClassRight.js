import React, { Component } from "react";
import "../sass/Header_ykb.scss";
import { Tabs, Select, Divider } from 'antd';
import { connect } from "react-redux";
import withAxios from "../hoc/withAxios"
const TabPane = Tabs.TabPane;
const Option = Select.Option;

// @withAxios
class ListClassRight extends Component {
    constructor() {
        super();
        this.state = {
            brands:[],
        }
        this.changeTab = this.changeTab.bind(this)
    }
    // changeTabPosition = (tabPosition) => {
    //     this.setState({ tabPosition });
    // }
    async componentWillMount(){
        let {data:{respBody:{brandList}}} = await this.props.axios.get("http://localhost:2000/ylbapi/app/base/v2/chosenBrand?_=1554004334758");
        console.log(brandList)
        this.setState({
            brands:brandList,
        });
    }
    async changeTab(id){
        
    }
    render() {
        return (<div className="Navlr">
            <ul>
                {
                    this.state.brands.map(item=><li key={item.name}>
                        <h3>{item.name}</h3>
                        <ol>
                            {
                                item.brands.map(brand=><dl key={brand.brandId}>
                                    <img src={require="https://oss.yanglaoban.com/"+brand.brandIcon} />
                                    <span>{brand.brandNameCn}</span>
                                </dl>)
                            }
                            
                        </ol>
                    </li>)
                }
            </ul>
        </div>
        )
    }

}
ListClassRight = withAxios(ListClassRight)
export default connect((state) => {
    return {
        state
    }
})(ListClassRight);