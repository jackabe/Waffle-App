import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import { Input, Button} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'react-native-firebase';

class AccountScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <Text style={styles.account}>Your Account</Text>,
        };
    };

    signOut() {
        Alert.alert('Signed out');
        firebase.auth().signOut();
        this.props.navigation.navigate("Auth");
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Button
                    title='Sign out'
                    buttonStyle={styles.signOut}
                    onPress={() => {
                        this.signOut();
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    signOut: {
        width: 100,
        height: 50
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
    account: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        marginTop: 10,
        marginRight: 25
    }
});

export default AccountScreen;