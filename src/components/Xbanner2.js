import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';

//引进antd轮播图
import { Carousel } from 'antd';

//达人资讯轮播
class Banner2 extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }
    async componentWillMount() {
        // 使用axios
        // console.log(this)
        let { data: { respBody } } = await this.props.axios.post('/app/article/recommended/top', {
            reqBody: { positions: [0, 7] }
        })
        console.log(respBody[0]);

        this.setState({
            info: respBody[0].list
        });
    }

    render() {
        // console.log(this.state.info);

        return (
            <div className="banner2">
                <div className="super-info">
                    <div className="super-icon"></div>
                    <Carousel dots={false} autoplay>
                        {
                            this.state.info.map(item => {
                                return (
                                    <div  key="item.article.id" style={{height:'2.4rem'}}>
                                        <h3 style={{height:'2.4rem'}}>
                                            <div className="superBanner">
                                                <div className="txt">
                                                    <span>{item.article.summary}</span>
                                                    <span>{item.article.title}</span>
                                                </div>
                                                <div className="imgshow">
                                                    <div className="img-bg"></div>
                                                    <img src={`https://oss.yanglaoban.com/${item.article.thumbnailPics}`} />
                                                </div>
                                            </div>
                                        </h3>

                                    </div>

                                )
                            })
                        }
                    </Carousel>

                </div>
            </div>
        )
    }
}

// 高阶组件的应用
Banner2 = withAxios(Banner2);
export default Banner2;