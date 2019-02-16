import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';

import headerStyling from "./styles/ui/Header";
import Tools from "./utils/Tools";

import BookingScreen from "./screens/BookingScreen";
import AddressScreen from "./screens/AddressScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import OffersScreen from "./screens/OffersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";

const strings = Tools.getStrings();

function tabBarScreenOptions(n) {
    return {
        initialRouteName: n,
        cardStyle: {
            backgroundColor: "#FFFFFF"
        }
    };
}

function mainStackOptions(n) {
    return {
        initialRouteName: n,
        headerMode: "none",
        defaultNavigationOptions: {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
        },
        cardStyle: {
            backgroundColor: "#FFFFFF"
        }
    };
}

const AppStack = createBottomTabNavigator(
    {
        Booking: createStackNavigator(
            {
                // Have Swapped Booking: AddressScreen to BookingScreen so that dev on the UI is visible in dev mode
                // Will need to be swapped back
                Booking: BookingScreen,
                GetSpace: AddressScreen,
                Confirm: ConfirmationScreen,
            },
            tabBarScreenOptions("Booking")
        ),
        Offers: createStackNavigator(
            {
                Offers: OffersScreen,
            },
            tabBarScreenOptions("Offers")
        ),
        Settings: createStackNavigator(
            {
                Settings: SettingsScreen,
            },
            tabBarScreenOptions("Settings")
        ),
    },
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            style: {
                height: 50,
                paddingTop: Platform.OS === "android" ? 0 : 5,
                paddingBottom: Platform.OS === "android" ? 0 : 5,
                backgroundColor: "#F9F9F9",
            },
            indicatorStyle: {
                backgroundColor: "transparent",
                borderBottomColor: "rgba(0,0,0,0)",
                borderBottomWidth: 0,
                opacity: 0
            }
        },
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Booking') {
                    iconName = `ios-car`;
                } else if (routeName === 'Offers') {
                    iconName = `ios-bookmark`;
                }
                else {
                    iconName = `ios-settings`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
    }
);

const AuthStack = createStackNavigator({
        Login: LoginScreen,
    },
    mainStackOptions("Login"));

const RootStack = createSwitchNavigator({
        Auth: AuthStack,
        App: AppStack,
    },
    mainStackOptions("Auth"));

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}