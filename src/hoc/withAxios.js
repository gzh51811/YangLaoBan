import React from "react";
import axios from "axios";

axios.defaults.baseURL = "https://www.nanshig.com";//设置默认的基本路径
export default (Com)=>{
    return function(props){
        return <Com axios={axios} {...props}></Com>
    }
}