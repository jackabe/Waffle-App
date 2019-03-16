import React from 'react';
import {View, Text, StyleSheet, BackHandler, ToastAndroid, Alert} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import IoniconsCar from 'react-native-vector-icons/Ionicons';
import Ionicons from "react-native-vector-icons/Entypo";
import IoniconsOkay from "react-native-vector-icons/MaterialCommunityIcons";
import {Button} from "react-native-elements";

class ConfirmationScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: null,
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle  ",
        };
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('You cannot go back', ToastAndroid.SHORT);
        return true;
    }
    render() {
        const { navigation } = this.props;
        const parkingLotName = navigation.getParam('parkingLotName');
        const reg = navigation.getParam('reg');
        const arrivalTime = navigation.getParam('arrivalTime');
        const arrivalDate = navigation.getParam('arrivalDate');
        const departureTime = navigation.getParam('departureTime');
        const departureDate = navigation.getParam('departureDate');
        const child = navigation.getParam('child');
        const disabled = navigation.getParam('disabled');
        const price = navigation.getParam('price');
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Booking Complete!</Text>
                <Text style={styles.subHeading}>You can view this booking in the bookings tab</Text>
                <View style={styles.flexContainer}>
                    <Ionicons name='location-pin' size={25} color={'tomato'} style={styles.icon} />
                    <Text style={styles.parkingLotText}>{parkingLotName}</Text>
                </View>
                <View style={styles.flexContainer}>
                    <IoniconsCar name={`ios-car`} size={25} color={'gray'} style={styles.icon}/>
                    <Text style={styles.regInfo}>{reg}</Text>
                </View>
                <View style={styles.datesFlexContainer}>
                    <Text style={styles.datesText}>Arrival:</Text>
                    <Text style={styles.datesTextInfo}>{arrivalDate + ' : ' +arrivalTime}</Text>
                </View>
                <View style={styles.datesFlexContainer}>
                    <Text style={styles.datesText}>Departure:</Text>
                    <Text style={styles.datesTextInfo}>{departureDate + ' : ' +departureTime}</Text>
                </View>
                <View style={styles.requirementsBox}>
                    <Text style={styles.requirementsText}>Disabled</Text>
                    <Text style={styles.requirementsText}>Parent and child</Text>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.priceLabel}>Price:</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <Button
                    style={styles.bookingButton}
                    containerStyle={styles.bookingButtonContainer}
                    buttonStyle={styles.bookingModalButton}
                    icon={<IoniconsOkay name='check' size={50} color={'white'} style={styles.icon} />}
                    title={''}
                    onPress={()=>this.props.navigation.navigate("Booking")}
                />
            </View>
        );
    }
}

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    flexContainer: {
        marginTop: 25,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    datesFlexContainer: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        padding: 10,
        marginTop: 5
    },
    subHeading: {
        color: 'gray',
        fontSize: 15,
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
    pickerStyle: {
        borderWidth: 0,
        borderColor: 'white',
        width: 50,
        margin: 0,
    },
    createAccount: {
        paddingTop: 20,
        color: 'tomato'
    },
    bookingButton : {
        padding: 10,
    },
    icon: {
        paddingRight: 5
    },
    parkingLotText: {
        color: 'tomato',
        fontSize: 20,
        padding: 10,
    },
    bookingButtonContainer : {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
    },
    bookingModalButton : {
        height: 100,
        width: 100,
        backgroundColor: 'tomato',
        padding: 20,
        borderRadius: 360,
    },
    dates : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTimePicker : {
        padding: 10,
    },
    dateText : {
        width: 80
    },
    requirements: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    requirementsText : {
        padding: 10,
        color: 'tomato',
        fontSize: 15,
    },
    requirementsBox : {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider : {
        margin: 10,
        width: '90%',
        backgroundColor: 'tomato',
        height: 1,
    },
    checkBackground: {
        backgroundColor: 'white',
        width: 200
    },
    checkText: {
        marginLeft: 30,
        width: 150
    },
    priceContainer: {
        marginTop: 25,
        flexDirection: 'row',
    },
    priceLabel : {
        fontSize: 23,
        color: 'tomato'
    },
    price : {
        fontSize: 23,
        marginLeft: '2%'
    },
    dateOverview: {
        marginTop: 25,
        flexDirection: 'row',
    },
    arrive: {
        padding: 10,
        color: 'gray',
        fontSize: 17
    },
    depart: {
        padding: 10,
        color: 'gray',
        fontSize: 17
    },
    label: {
        color: 'tomato',
        fontSize: 19
    },
    regInfo: {
        fontSize: 19,
        fontWeight: 'bold',
        padding: 10,
    },
    datesTextInfo: {
        fontSize: 19,
        padding: 10
    },
    datesText: {
        fontSize: 19,
        color: 'tomato',
        padding: 10
    },
});