import React,{Component} from "react";
import { Tabs, Divider } from 'antd';
import "./ListClass.scss"
import {connect} from "react-redux"
import ListClassLeft from "../../components/ListClassLeft";
import ListClassRight from "../../components/ListClassRight";
import { bindActionCreators } from "redux";
import commonAction from "../../actions/commonAction"
const TabPane = Tabs.TabPane;

class ListClass extends Component{
    constructor(){
        super()
    }
    componentWillMount(){
        this.props.footshow(true)
        this.props.headshow(true)
    }
    callback(key) {
        console.log(key);
    }
    render(){
        return <div className="ListClassNav">
            <Tabs defaultActiveKey="1"  onChange={this.callback}>
                <TabPane tab="分类" key="1"><ListClassLeft></ListClassLeft></TabPane>
                <TabPane tab="品牌" key="2"><ListClassRight></ListClassRight></TabPane>
            </Tabs>
        </div> 
    }
}
ListClass = connect(
    state=>{
      return {...state}
    },
    dispatch=>bindActionCreators(commonAction,dispatch)
  )(ListClass)
export default ListClass;