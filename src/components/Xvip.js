import React, { Component } from 'react';
//引进高阶组件
import withAxios from '../hoc/withAxios';

class Xvip extends Component {
    constructor() {
        super();
        this.state = {
            info: []
        }
    }
    async componentWillMount() {
        let { data: { respBody: { prodsInfo } } } = await this.props.axios.get('/app/member-act/prod/info', {
            params: {
                type: 1,
                pageSize: 9,
                page: 1
            }
        })
        // console.log(prodsInfo);
        this.setState({
            info: prodsInfo
        })
    }
    render() {
        return (
            <div className="vip">
                <div className="vipimg"><img src="https://oss.yanglaoban.com/system/activity/440221BDEBF9BE90.jpg?x-oss-process=image/resize,p_70" /></div>
                <ul className="vipProd">
                    {
                        this.state.info.map(item => {
                            return <li className="vipChilder" key={item.memberProdId}>
                                <span className="free-taken">免费领</span>
                                <img src={`https://oss.yanglaoban.com/${item.prodPic}`} />
                                <h2>{item.prodTitle}</h2>
                                <p className="price">¥{item.price}</p>
                            </li>
                        })
                    }

                </ul>
            </div>
        )
    }
}
// 高阶组件的应用
Xvip = withAxios(Xvip);
export default Xvip;