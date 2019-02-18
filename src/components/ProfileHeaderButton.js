import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/FontAwesome";

class ProfileHeaderButton extends Component {
    render() {
        return (
            <TouchableOpacity style={this.props.buttonStyle} onPress={() => {
                this.props.navigation.navigate("Account");
            }}>
                <Ionicons name='user-circle' size={35} color={'tomato'} style={styles.icon}  />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon:{
        width: 35,
        height: 35,
        marginTop: 10,
        marginRight: 25
    }
});


export default ProfileHeaderButton;
