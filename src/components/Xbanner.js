import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
//引进高阶组件
import withAxios from '../hoc/withAxios';

//引进antd轮播图
import { Carousel } from 'antd';
//修饰器

class Banner extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }
     async componentWillMount(){
        // 使用axios
        // console.log(this)
        let {data:{respBody:{firstBannerList}}} = await this.props.axios.get('/app/home/v2/banner/load')
        // console.log(firstBannerList);

        this.setState({
            info: firstBannerList
        });
    }
    goto=()=>{
        // console.log('this',this)
        //路由跳转：编程式导航
       // 利用withRouter()高阶组件实现history的传递
        this.props.history.push('/list');
    }
     
    render() {
        // console.log(this.state.info);
        
        return (
            <div className="banner">
                <Carousel  autoplay>
                    {
                        this.state.info.map(item=>{
                            // console.log(item.filterChannels)
                            return <div key={item.applyCrowd} onClick={this.goto}><h3><img className="urlimg" src={`https://oss.yanglaoban.com/${item.pic}`}/></h3></div>
                        })
                    }
                    
                </Carousel>
            </div>
        )
    }
}
// 高阶组件的应用
Banner = withAxios(Banner);
Banner=withRouter(Banner);
export default Banner;