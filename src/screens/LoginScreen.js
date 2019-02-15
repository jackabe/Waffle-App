import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Header} from "react-native-elements";
import Colors from "../config/Colors";
import Service from "../utils/Service";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            email: '',
            password: ''
        };
    }
    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            // this.props.navigation.navigate("App");
        });
    }
    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
    }

    login = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then((user) => {
                Alert.alert('Logged in');
                this.props.navigation.navigate("App");
            })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert(message);
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    };

    openSignedUpModal = () => {

    };

    onRegister = () => {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
            })
            .catch((error) => {
                const { code, message } = error;
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    }

    render() {
        return (
            <ImageBackground
                source={{uri: 'https://www.pixelstalk.net/wp-content/uploads/images2/Minimalist-Abstract_arrows-wallpaper-2560x1600.jpg'}}
                style={styles.container}
            >
                <Header style={{borderBottomWidth: 0}}
                        barStyle="light-content"
                        centerComponent={<Text style={styles.heading}>waffle</Text>}
                        containerStyle={{
                            width: '100%',
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

                    {/*<Button*/}
                        {/*containerStyle={styles.signUpContainer}*/}
                        {/*buttonStyle={styles.signUpButton}*/}
                        {/*iconContainerStyle={styles.icon}*/}
                        {/*raised*/}
                        {/*icon={*/}
                            {/*<Icon*/}
                                {/*style={styles.icon}*/}
                                {/*name="user-plus"*/}
                                {/*size={15}*/}
                                {/*color="white"*/}
                            {/*/>*/}
                        {/*}*/}
                        {/*title='Create account' />*/}
                    <Text style={styles.slogen}>A smarter way to live</Text>

                   <Input
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Username'
                        containerStyle={styles.inputOuterContainer}
                        onChangeText={(text) => this.setState({email: text})}
                    />

                    <Input
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Password'
                        secureTextEntry={true}
                        containerStyle={styles.inputOuterContainer}
                        onChangeText={(text) => this.setState({password: text})}
                    />

                    <Text style={styles.text}>Forgotten password?</Text>

                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        onPress={() => {
                            this.login();
                        }}
                        icon={
                            <Icon
                                name="check"
                                size={20}
                                color="white"
                            />
                        }
                    />

                    <Text style={styles.createAccount}>Don't have an account? <Text style={{color: 'tomato'}}>
                        Sign up
                    </Text></Text>

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
        padding: 10,
    },
    slogen: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        fontWeight: "normal",
        padding: 10,
        marginTop: -80,
        marginBottom: 80,
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
    createAccount: {
        paddingTop: 20,
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

