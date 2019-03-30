import React, { Component } from 'react';
import FooterNav from "./components/Footer"
import {HashRouter,Route,Switch,Redirect} from "react-router-dom";
import {Provider} from "react-redux"
import store from "./store"
import { Layout, List } from 'antd';
import "antd/dist/antd.css"
const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
            <Layout>
                <Header>Header</Header>
                <Content>
                    {/* <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/list" component={List_YKB}/>
                        <Route path="/goods/:id" component={Goods}/>
                        <Route path="/mine" component={Mine}/>
                        <Redirect to="/home" from="/" ></Redirect>
                    </Switch> */}
                </Content>
                <Footer>
                    <Route component={FooterNav}/>
                </Footer>
            </Layout>
            
        </HashRouter>
        </Provider>
    );
  }
}

export default App;
