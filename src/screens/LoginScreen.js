import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import {Header, Overlay} from "react-native-elements";
import Colors from "../config/Colors";
import Service from "../utils/Service";
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, Button} from 'react-native-elements';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import Ionicons from "react-native-vector-icons/Ionicons";

class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            email: '',
            password: '',
            date: '',
            firstName: '',
            surname: '',
            showSignUp: false,
            showLogin: false
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
            if (user) {
                this.props.navigation.navigate("App", {
                    userId: user.uid,
                });
            }
            else {
                this.props.navigation.navigate("Auth");
            }
        });
    }

    checkInformation() {
        const { firstName, surname, email, password, date } = this.state;
        return !(firstName.length > 2 && surname.length > 2 && email.length > 2 && password.length > 2 && date.length > 2);
    };

    checkLogin() {
        const {email, password} = this.state;
        return !(email.length > 2 && password.length > 2);
    }

    login = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then((user) => {
            })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert(message);
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    };

    openSignUpModal = () => {
        this.setState({
            showSignUp: true
        })
    };

    closeSignUpModal = () => {
        this.setState({
            showSignUp: false
        })
    };

    openLoginModal = () => {
        this.setState({
            showLogin: true
        })
    };

    closeLoginModal = () => {
        this.setState({
            showLogin: false
        })
    };

    onRegister = () => {
        const { firstName, surname, email, password, date } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((user) => {
                let formData = new FormData();
                formData.append('user_id', user.user.uid);
                formData.append('first_name', firstName);
                formData.append('last_name', surname);
                formData.append('dob', date);
                formData.append('email', email);

                fetch('http://18.188.105.214/signup', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                }).then(response => {
                    Alert.alert('Logged in');
                }).catch(error => {
                    const { code, message } = error;
                    Alert.alert(error);
                })
            })
            .catch((error) => {
                const { code, message } = error;
                Alert.alert(message);
            });
    };

    render() {
        return (
            <ImageBackground
                source={{uri: 'http://18.188.105.214/static/background.png'}}
                style={styles.container}
            >

                <Text style={styles.heading}>waffle</Text>
                <Text style={styles.slogen}>A smarter way to live</Text>

                <View style={styles.buttons}>
                    <View style={styles.buttonDiv}>
                        <Button
                            buttonStyle={styles.button}
                            titleStyle={styles.normalTitleStyle}
                            title='Log in with Email'
                            onPress={() => {
                                this.openLoginModal()
                            }}
                            raised={true}
                            icon={
                                <Icon
                                    name="mail"
                                    size={25}
                                    style={styles.buttonIcon}
                                    color="white"/>}
                        />

                        <View style={styles.buttonDiv}>
                            <Button
                                buttonStyle={styles.signUpButton}
                                titleStyle={styles.titleStyle}
                                title='Sign Up'
                                onPress={() => {
                                    this.openSignUpModal();
                                }}
                                raised={true}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.conditions}>
                    <Text style={styles.conditionsText}>By signing in you agree to our terms and conditions</Text>
                </View>

                {
                    this.state.showSignUp && (
                        <Overlay
                            isVisible
                            windowBackgroundColor="white"
                            overlayBackgroundColor="white"
                            fullScreen={true}>

                            <Text style={styles.signUpHeading}>Sign Up</Text>

                            <TouchableHighlight style={styles.closeView} onPress={this.closeSignUpModal}>
                                <View>
                                    <Icon
                                        name="close"
                                        size={30}
                                        color="tomato"
                                    />
                                </View>
                            </TouchableHighlight>

                            <View style={styles.signUpContainer}>

                                <Input
                                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    placeholder='First name'
                                    containerStyle={styles.inputOuterContainer}
                                    onChangeText={(text) => this.setState({firstName: text})}
                                />
                                <Input
                                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    placeholder='Surname'
                                    containerStyle={styles.inputOuterContainer}
                                    onChangeText={(text) => this.setState({surname: text})}
                                />
                                <Input
                                    leftIcon={{ type: 'Zocial', name: 'email' }}
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    placeholder='Email'
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
                                <DatePicker
                                    style={styles.inputOuterContainer}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Enter date of birth"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-1900"
                                    maxDate="01-01-2000"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            right: 0,
                                            top: 4,
                                            marginLeft: 35
                                        },
                                        dateInput: {
                                            marginLeft: 0
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />

                                <Button
                                    containerStyle={styles.signUpModalButtonContainer}
                                    buttonStyle={styles.signUpModalButton}
                                    disabled={this.checkInformation()}
                                    onPress={() => {
                                        this.onRegister();
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
                        </Overlay>
                    )
                }

                {
                    this.state.showLogin && (
                            <Overlay
                                width="80%"
                                height="auto"
                                isVisible
                                keyboardAvoidingView
                                overlayBackgroundColor="white"
                                fullScreen={false}>

                                <Text style={styles.signUpHeading}>Log in</Text>

                                <TouchableHighlight style={styles.closeView} onPress={this.closeLoginModal}>
                                    <View>
                                        <Icon
                                            name="close"
                                            size={30}
                                            color="tomato"
                                        />
                                    </View>
                                </TouchableHighlight>

                                <View style={styles.signUpContainer}>
                                    <Input
                                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                                        inputStyle={styles.inputStyle}
                                        inputContainerStyle={styles.inputContainer}
                                        placeholder='Email'
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
                                        containerStyle={styles.signUpModalButtonContainer}
                                        buttonStyle={styles.signUpModalButton}
                                        disabled={this.checkLogin()}
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
                                </View>
                            </Overlay>
                    )
                }
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
        marginTop: 30,
        textAlign: 'center',
        color: 'tomato',
        fontSize: 50,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
    slogen: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 1.2,
        fontWeight: "normal",
        padding: 10,
        textAlign: 'center'
    },
    buttons: {
        width: '100%',
        marginTop: '30%',
    },
    buttonDiv: {
        width: '100%',
        marginTop: '10%',
        alignItems: 'center',
        textAlign: 'center',
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
        width: '100%',
        color: 'tomato',
    },
    normalTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        width: '100%',
        color: 'white',
    },
    conditions: {
      bottom: 10,
        position: 'absolute',
      color: 'white',
        width: '100%'
    },
    conditionsText: {
        textAlign: 'center',
        bottom: 10,
        color: 'white'
    },
    button : {
        height: 80,
        padding: 30,
        width: '80%',
        backgroundColor: 'tomato'
    },
    signUpButton : {
        height: 80,
        padding: 30,
        width: '82%',
        backgroundColor: 'transparent'
    },
    buttonIcon: {
    },
    inputs: {
        width: '100%',
        marginTop: '50%',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
    },
    inputStyle: {
        textAlign: 'center'
    },
    inputOuterContainer : {
        borderRadius: 50,
        width: '80%',
        margin: 20,
    },
    createAccount: {
        paddingTop: 20,
        color: 'tomato'
    },
    signUpContainer : {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    icon: {
        paddingRight: 5
    },
    signUpHeading: {
        color: 'tomato',
        fontSize: 28,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
    closeView : {
        backgroundColor: 'white',
        marginLeft:'90%',
        marginTop: -33,
        marginBottom: 33
    },
    signUpModalButtonContainer : {
        marginTop: '10%',
        backgroundColor: 'tomato',
        alignItems: 'center',
    },
    signUpModalButton : {
        padding: 20,
        backgroundColor: 'tomato'
    }
});

export default LoginScreen;

