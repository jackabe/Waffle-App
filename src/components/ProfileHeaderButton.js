import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

class ProfileHeaderButton extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.buttonStyle} onPress={() => {
                this.props.navigation.navigate("MyAccount");
            }}>
                <Ionicons name='ios-contact' size={28} color={'tomato'} style={styles.icon}  />
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
