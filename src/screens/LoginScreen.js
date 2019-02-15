import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Header} from "react-native-elements";
import Colors from "../config/Colors";
import Service from "../utils/Service";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';

class LoginScreen extends React.Component {

    login = () => {
        Service.loginFacebook({email: 'jackallcock@yahoo.co.uk', password: '12345'},(error) => {
            if(error){

            }else{
                Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [
                        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            }
        });
    };

    render() {
        return (
            <ImageBackground
                // source={{uri: 'https://cdn.wallpapersafari.com/71/75/rO3vmn.jpg'}}
                // source={{uri: 'https://ak7.picdn.net/shutterstock/videos/11927447/thumb/1.jpg'}}
                source={{uri: 'https://www.pixelstalk.net/wp-content/uploads/images2/Minimalist-Abstract_arrows-wallpaper-2560x1600.jpg'}}
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

                <View style={styles.inputs}>

                    <Button
                        containerStyle={styles.signUpContainer}
                        buttonStyle={styles.signUpButton}
                        iconContainerStyle={styles.icon}
                        raised
                        icon={
                            <Icon
                                style={styles.icon}
                                name="user-plus"
                                size={15}
                                color="white"
                            />
                        }
                        title='Create account' />

                   <Input
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Username'
                        containerStyle={styles.inputOuterContainer}
                    />

                    <Input
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Password'
                        containerStyle={styles.inputOuterContainer}
                    />

                    <Text style={styles.text}>Forgotten password?</Text>

                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        onPress={() => {
                            Alert.alert('You tapped the button!');
                        }}
                        icon={
                            <Icon
                                name="check"
                                size={20}
                                color="white"
                            />
                        }
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
    inputs: {
        width: '100%',
        marginTop: '50%',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        color: '#000000',
        textAlign: 'center'
    },
    inputStyle: {
        textAlign: 'center'
    },
    inputOuterContainer : {
        borderRadius: 50,
        width: '80%',
        margin: 20,
        textAlign: 'center'
    },
    buttonContainer : {
        marginTop: '30%',
        backgroundColor: 'tomato'
    },
    button : {
        padding: 20,
        backgroundColor: 'tomato'
    },
    text: {
        color: 'tomato'
    },
    signUpContainer : {
        marginTop: -80,
        marginBottom: 80,
        backgroundColor: 'tomato',
        color: 'white'
    },
    signUpButton : {
        padding: 10,
        backgroundColor: 'tomato'
    },
    icon: {
        paddingRight: 5
    }
});

export default LoginScreen;

