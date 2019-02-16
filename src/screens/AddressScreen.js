import React from 'react';
import { View, Text } from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {Header} from "react-native-elements";

class AddressScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };


    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Booking Screen</Text>
                </View>

            </View>
        );
    }
}

export default AddressScreen;