import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from "react-native-elements";

class CustomMarker extends Component {
    render() {
        let data = this.props.data;
        return (
            <View style={styles.box}>
                <Text style={styles.title}>{data.details.name}</Text>
                <Text style={styles.spaces}>{data.spaces + ' spaces available TODAY!'}</Text>
                <Text style={styles.price}>{'Prices start from £' + data.price +' / hour!'}</Text>

                <Button
                    style={styles.bookingButton}
                    containerStyle={styles.bookingButtonContainer}
                    buttonStyle={styles.bookingModalButton}
                    title={"Book"}
                    onPress={()=>{
                        Alert.alert('hi')
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 25,
        color: 'tomato'
    },
    spaces: {
        position: 'absolute',
        color: 'tomato',
        bottom: 10,
        fontSize: 20,
    },
    price: {
        marginTop: 10,
        fontSize: 15,
    },
    bookingButton : {
        padding: 10,
    },
    bookingButtonContainer : {
        alignItems: 'center',
        marginTop: 20
    },
    bookingModalButton : {
        width: '100%',
        backgroundColor: 'tomato',
        padding: 20,
    },
});


export default CustomMarker;
