import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';

class IconList extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }
    async componentWillMount() {
        let { data: { respBody: { firstBannerIconList } } } = await this.props.axios.get('/app/home/v2/banner/load')
        // console.log(firstBannerIconList);

        this.setState({
            info: firstBannerIconList
        });
    }
    render() {
        return (
            <div className="IconList">
                <ul className="bannerbotdiv">
                    {
                        this.state.info.map(item => {
                            return (

                                <li key={item.url}><img src={`https://oss.yanglaoban.com/${item.iconUrl}`} /></li>

                            )

                        })
                    }
                </ul>

            </div >
        )
    }
}

// 高阶组件的应用
IconList = withAxios(IconList);

export default IconList