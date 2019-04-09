import React, { Component } from 'react';
import FooterNav from "./components/Footer"
import {HashRouter,Route,Switch,Redirect} from "react-router-dom";
import {Provider} from "react-redux"
import store from "./store"
import { Layout, List } from 'antd';
import "antd/dist/antd.css";
import Home from './pages/Home/Home'
import MyList from './pages/List/List'

const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
            <Layout>
                {/* <Header>Header</Header> */}
                <Content>
                      <Switch>
                        <Route path="/home" component={Home}/>
                      </Switch>
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
