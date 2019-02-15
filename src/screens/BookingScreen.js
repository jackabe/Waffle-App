import React from 'react';
import { View, Text } from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";

class BookingScreen extends React.Component {
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Bookig Screen</Text>
            </View>
        );
    }
}

export default BookingScreen;