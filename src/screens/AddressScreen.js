import React from 'react';
import { View, Text, Alert } from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {Button, Header} from "react-native-elements";
import firebase from "react-native-firebase";

class AddressScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle ",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userId: null
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
                this.setState({
                    userId: user.uid
                })
            }
        });
    }

    render() {

        return (
            <View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Booking Screen</Text>
                    <Button
                        onPress={() => this.props.navigation.navigate("GetSpace", {
                            userId: this.state.userId
                        })}>
                        Book a bay
                    </Button>
                </View>

            </View>
        );
    }
}

export default AddressScreen;