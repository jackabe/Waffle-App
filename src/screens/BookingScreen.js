import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {Header} from "react-native-elements";

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
            <View>
                <Header style={{borderBottomWidth: 0}}
                        barStyle="light-content"
                        centerComponent={<Text style={styles.heading}>waffle </Text>}
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

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Booking Screen</Text>
                </View>

            </View>
        );
    }
}

export default BookingScreen;