import React, { Component } from "react";
import { Text } from "react-native";
import Colors from "../config/Colors";

class TabBarLabel extends Component {
    render() {
        return (
            <Text style={[{ fontSize: 10, textAlign: "center" }, this.props.focused ? { color: Colors.COLOR_BLUE } : { color: Colors.COLOR_GRAY }]}>
                {this.props.label}
            </Text>
        );
    }
}

export default TabBarLabel;
