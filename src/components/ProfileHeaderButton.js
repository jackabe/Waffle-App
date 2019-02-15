import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import profile from "../assets/images/ic_my_account.png";
import Ionicons from "react-native-vector-icons/Ionicons";

class ProfileHeaderButton extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.buttonStyle} onPress={() => {
                this.props.navigation.navigate("MyAccount");
            }}>
                <Ionicons name='contact' style={styles.icon} color={tintColor} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon:{
        width: 26,
        height: 26,
        marginRight: 20
    }
});


export default ProfileHeaderButton;
