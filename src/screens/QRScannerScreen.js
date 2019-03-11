import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import headerStyling from "../styles/ui/Header";
import { Input, Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner'

class ScannerScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <Text style={styles.account}>Settings</Text>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occurred', err));
    }



    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Text style={styles.bookingsHeading}>QR Scanner</Text>

                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    account: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        marginTop: 10,
        marginRight: 25
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        fontWeight: "bold",
        padding: 10,
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0
    },
    inputStyle: {
        textAlign: 'center',
        paddingLeft: 10,
        fontSize: 15
    },
    inputOuterContainer : {
        borderColor: 'grey',
        borderWidth: 1,
        width: '80%',
        margin: 20,
    },
    bookingsHeading: {
        color: 'tomato',
        fontSize: 24,
        // fontWeight: "bold",
        paddingTop: 20,
    },
    bookingButton : {
        padding: 10,
    },
    bookingButtonContainer : {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    bookingModalButton : {
        width: '120%',
        backgroundColor: 'tomato',
        padding: 20,
    },

});

export default ScannerScreen;