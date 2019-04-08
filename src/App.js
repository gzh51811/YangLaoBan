import React, { Component } from 'react';
import FooterNav from "./components/Footer"
import {HashRouter,Route,Switch,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import { Layout } from 'antd';
import "./sass/base.scss"
import "antd/dist/antd.css";
import ListClass from "./pages/ListClass"
import List from "./pages/List"
import Detail from "./pages/Detail"
import Login from "./pages/Login"
import PersonCenter from "./pages/PersonCenter"
import Headerykb from "./components/Header_ykb"
const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
  render() {
    return (
        <HashRouter>
            <Layout>
            {
                  this.props.common.head_ykb?<Header>
                  <Headerykb></Headerykb>
                </Header>:null
                }
                
                <Content>
                    <Switch>
                      <Route path="/listclass" component={ListClass}/>
                      <Route path="/list" component={List} exact/>
                      <Route path="/detail" component={Detail}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/personcenter" component={PersonCenter}/>
                      {/* <Redirect to="/home" from="/" ></Redirect>  */}
                        {/* <Route path="/home" component={Home}/>
                        
                        <Route path="/goods/:id" component={Goods}/>
                        <Route path="/mine" component={Mine}/>
                        */}
                    </Switch>
                </Content>
                {
                  this.props.common.foot_ykb?<Footer>
                    <Route component={FooterNav}/>
                </Footer>:null
                }
                
            </Layout>
            
        </HashRouter>
    );
  }
}
App = connect(
  state=>{
    return {...state}
  },
)(App)
export default App;
