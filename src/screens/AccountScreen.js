import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import { Input, Button} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'react-native-firebase';

class AddressScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "Account",
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
                <Text>Account</Text>

                <Button
                    onPress={() => {
                        this.signOut();
                    }}
                >
                    Sign out
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
});

export default AddressScreen;