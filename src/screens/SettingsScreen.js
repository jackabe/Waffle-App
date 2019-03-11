import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import headerStyling from "../styles/ui/Header";
import { Input, Button} from 'react-native-elements';

class SettingsScreen extends React.Component {
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
            userId: null,
            newPassword: "",
            currentPassword: "",
        }
    }

    // In order to change a user password, there must be a recent authentication because it is a sensitive operation
    reauthenticateUser = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(credentials);
    }

    // https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618
    changeUserPassword = () => {

        this.reauthenticateUser(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(function () {
                Alert.alert("Password Changed");
            }).catch(function (error) {
                Alert.alert(error.message)
            })
        }).catch((error) => {
            Alert.alert(error.message)
        });
    }

    goToScanner(){
        this.props.navigation.navigate("QRScanner", {

        })
    }

        render() {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={styles.bookingsHeading}>Change Password</Text>

                    <Input
                        underlineColorAndroid='transparent'
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Enter current password'
                        containerStyle={styles.inputOuterContainer}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({currentPassword: text})}
                    />

                    <Input
                        underlineColorAndroid='transparent'
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Enter new password'
                        containerStyle={styles.inputOuterContainer}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({newPassword: text})}
                    />

                    <Button
                        title='Change Password'
                        style={styles.bookingButton}
                        containerStyle={styles.bookingButtonContainer}
                        buttonStyle={styles.bookingModalButton}

                        onPress={() => {
                            this.changeUserPassword();
                        }}
                    />

                    <Button
                        title='Scan a code'
                        style={styles.bookingButton}
                        containerStyle={styles.bookingButtonContainer}
                        buttonStyle={styles.bookingModalButton}

                        onPress={() => {
                            this.goToScanner();
                        }}
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

export default SettingsScreen;