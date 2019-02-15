import React, { Component } from "react";
import { Image } from "react-native";

class TabBarIcon extends Component {
    render() {
        return(
            <Image style={{width: 24, height: 24}} source={this.props.focused ? this.props.icons[1] : this.props.icons[0]} resizeMode={"contain"}/>
        );
    }
}

export default TabBarIcon;
