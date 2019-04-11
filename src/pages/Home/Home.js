import React,{Component} from 'react';

//引进轮播图
import Xbanner from '../../components/Xbanner';
//引进Icon列表
import IconList from '../../components/Xiconlist';
//引进秒杀活动
import Miaosha from '../../components/Xmiaosha';
//引进资讯达人轮播图
import Xbanner2 from '../../components/Xbanner2';
//引进vip区域
import Xvip from  '../../components/Xvip';
//引进产品
import Xproduct01 from '../../components/Xproduct01';
import Xproduct02 from '../../components/Xproduct02';
import Xproduct03 from '../../components/Xproduct03';
//导航列表
import Xnavlist from '../../components/Xnavlist';
import Xnavlist2 from '../../components/Xnavlist2';

//引进样式
import './Home.scss';

class Home extends Component {
    constructor(){
        super();
        this.state={
            info:[]
        }
    }
    render(){
        return (
           <div style={{position:"relative"}} className="home">
               <Xbanner></Xbanner>
               <IconList></IconList>
               <Miaosha></Miaosha>
               <Xbanner2></Xbanner2>
               <Xvip></Xvip>
               <Xproduct01></Xproduct01>
               <Xproduct02></Xproduct02>
               <Xproduct03></Xproduct03>
               <Xnavlist></Xnavlist>
               <Xnavlist2></Xnavlist2>
           </div>
        )
    }
} 

export default Home;