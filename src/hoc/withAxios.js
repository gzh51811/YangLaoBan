import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000/ylbapi";//设置默认的基本路径
export default (Com)=>{
    return function(props){
        return <Com axios={axios} {...props}></Com>
    }
}