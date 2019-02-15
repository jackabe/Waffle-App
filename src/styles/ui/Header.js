import { StyleSheet } from "react-native";
import Colors from "../../config/Colors";

export default StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.COLOR_NAV_BACKGROUND,
        borderBottomColor: Colors.COLOR_NAV_BORDER,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10
    },
    headerMainTitleStyle: {
        color: Colors.COLOR_BLUE,
        fontSize: 25,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
    }
});
