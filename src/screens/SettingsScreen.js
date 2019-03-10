import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import headerStyling from "../styles/ui/Header";

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


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
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



});

export default SettingsScreen;