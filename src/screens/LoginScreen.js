import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {Header} from "react-native-elements";
import Colors from "../config/Colors";

class LoginScreen extends React.Component {

    login = () => {
        Alert
    };

    render() {
        return (
            <ImageBackground
                source={{uri: 'https://i.ibb.co/MnqwfYS/background2.png'}}
                style={styles.container}
            >
                <Header style={{borderBottomWidth: 0}}
                        barStyle="light-content"
                        centerComponent={<Text style={styles.heading}>waffle</Text>}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            shadowRadius: 0,
                            shadowOffset: {
                                height: 0,
                            },
                            shadowColor: 'transparent',
                            borderBottomWidth: 0
                        }}
                />

                    <View style={styles.content}>

                        <Text style={styles.loginText}>Please login</Text>

                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            raised={true}
                            style={styles.button}
                            type='facebook'
                        />
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            raised={true}
                            style={styles.googleButton}
                            type='google'
                        />
                    </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: -100
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10
    },
    loginText: {
        color: 'tomato',
        fontSize: 25,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
        marginTop: -50,
        marginBottom: 20
    },
    button: {
        margin: 10,
        padding: 30
    },
    googleButton: {
        margin: 10,
        padding: 30,
        backgroundColor: Colors.COLOR_GRAY
    }
});

export default LoginScreen;