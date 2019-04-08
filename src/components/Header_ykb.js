import React, { Component } from "react";
import "../sass/Header_ykb.scss";
import { Icon ,Input} from "antd"
import { connect } from "react-redux"
class Header extends Component {
    constructor() {
        super();
        this.state = {

        }

    }

    render() {
        return (
            <div className="indexYKB">
                <Icon type="search" /><Input placeholder="发现更多全球好货" />
                <img src={require("../assets/image/headmeg.png")} /> 
            </div>
        )
    }

}

export default connect((state) => {
    return {
        state
    }
})(Header);