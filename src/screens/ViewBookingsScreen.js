import React from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity} from 'react-native';
import headerStyling from "../styles/ui/Header";
import { Input, Button, ListItem} from 'react-native-elements';
import firebase from 'react-native-firebase';
import Location from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import ConfirmationScreen from "./ConfirmationScreen";

class ViewBookingsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            name: null,
            bookingList: [
            ]
        };
    }

    signOut() {
        Alert.alert('Signed out');
        firebase.auth().signOut();
        this.props.navigation.navigate("Auth");
    }


    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userId: user.uid,
                    name: user.email,
                });
                this.getBookings(user.uid);
            }
        });
    }

    convertDate(date){
        let bookingUnix = new Date(date * 1000);
        // Converting timestamp to date
        let bookingDD = bookingUnix.getUTCDate();
        let bookingMM = bookingUnix.getUTCMonth() + 1;
        let bookingYYYY = bookingUnix.getUTCFullYear();
        let minutes = bookingUnix.getMinutes();

        if (minutes.length === 1) {
            minutes = minutes + '0'
        }
        let stringBooking = (bookingUnix.toISOString().substr(0, 16).replace('T', ' '))
        return stringBooking;
    }

    convertBoolean(stringBool){
        if (stringBool === "true"){
            return true;
        }else{
            return false;
        }
    }

    getBookings(userId){
        let formData = new FormData();
        formData.append('user_id', userId);

        // GET request
        fetch('http://18.188.105.214/getBookings', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log(response);
            let bookingList = [];
            let data = JSON.parse(response['_bodyText']);
            let i = 0;
            // Get each booking and form JSON
            for (i; i < data.length; i++) {
                let booking = {
                    arrival: this.convertDate(data[i]['arrival']),
                    departure: this.convertDate(data[i]['departure']),
                    child: this.convertBoolean(data[i]['disabled_required']),
                    numberPlate: data[i]['number_plate'],
                    disabled: this.convertBoolean(data[i]['disabled_required']),
                    location: data[i]['lot_name'],
                    name: data[i]['lot_name'],
                    price: data[i]['price'],
                    ref: data[i]['lot_id']
                };

                bookingList.push(booking); // Add to list

                // As not async, check all done before updating state
                if (i === data.length-1) {
                    this.setState({bookingList : bookingList});
                }
            }

        }).catch(error => {
            const { code, message } = error;
        })
    }

    navigateToConfirmation = (lot) => {
        const { navigation } = this.props;
        navigation.navigate("Confirm", {
            bookingNew: false,
            reg: lot.numberPlate,
            parkingLotName: lot.location,
            arrivalTime: lot.arrival,
            arrivalDate: lot.arrival,
            departureTime: lot.departure,
            departureDate: lot.departure,
            child: lot.child,
            disabled: lot.disabled,
            price: lot.price
        })
    };

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>

                <Text style={styles.bookingHeading}>Your Bookings</Text>

                <ScrollView style={{ width: '100%', height: '100%'}}>
                    {
                        this.state.bookingList.map((l, i) => (
                            <ListItem
                                onPress={() => this.navigateToConfirmation(l)}
                                containerStyle={styles.listContainer}
                                contentContainerStyle={styles.listContentContainer}
                                subtitleStyle={styles.subtitleStyle}
                                key={i}
                                subtitle={
                                    <View style={styles.subtitleView}>

                                        <View>
                                            <View style={styles.section}>
                                                <Location name='location-pin' size={25} color={'gray'} style={styles.locationIcon}  />
                                                <Text style={styles.location}>{l.location}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.section}>
                                             <Text style={styles.dateText}>A: {l.arrival} - D: {l.departure}</Text>
                                            <Icon name='chevron-right' size={15} color={'tomato'} style={styles.icon}  />
                                        </View>

                                        <Text style={styles.regInfo}>{'Number Plate: ' + l.numberPlate}</Text>

                                        <View style={styles.line}></View>

                                        <Text style={styles.regInfo}>{'Ref number: ' + l.ref}</Text>

                                        <View style={styles.section}>
                                            {l.disabled ?
                                                <Text style={styles.info}>Disabled</Text> : null
                                            }
                                            {l.child ?
                                                <Text style={styles.info}>Parent and child</Text> : null
                                            }

                                        </View>

                                        <View style={styles.card1}></View>
                                        <View style={styles.card2}></View>

                                    </View>
                                }
                            />
                        ))
                    }
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    signOut: {
        width: 100,
        height: 50
    },
    profileIcon: {
        alignSelf: 'flex-start',
        marginLeft: 40,
    },
    pencilIcon: {
        marginLeft: '10%',
    },
    icon: {
        marginLeft: 50,
    },
    username: {
        color: 'grey',
        marginTop: 5,
        marginLeft: 20
    },
    line: {
        height: 1,
        width: '100%',
        borderWidth: 0.2,
        borderColor: 'grey',
        marginTop: 8,
        marginBottom: 5
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
        marginLeft: 20,
    },
    heading: {
        color: 'grey',
        fontSize: 35,
        fontWeight: "bold",
        padding: 10,
    },
    account: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        marginTop: 10,
        marginRight: 25
    },
    card1: {
        width: '102%',
        height: 4,
        marginTop: 3,
        marginLeft: -12,
        borderWidth: 1,
        borderColor: '#e2e2e2',
    },
    card2: {
        width: '100%',
        height: 4,
        marginLeft: -9,
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#e2e2e2',
    },
    info: {
        paddingRight: 10,
    },
    bookingsHeading: {
        color: 'tomato',
        fontSize: 24,
        // fontWeight: "bold",
    },
    location: {
        color: 'tomato',
        fontSize: 17,
        paddingBottom: 10
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    bookingHeading: {
        color: 'grey',
        fontSize: 25,
        alignSelf: 'flex-start',
        marginLeft: 30,
        paddingTop: 15,
        paddingBottom: 30
    },
    listContainer: {
        width: '100%',
    },
    listContentContainer: {
        backgroundColor: 'white',
    },
    locationIcon: {
        marginTop: -10,
        paddingRight: 5,
        marginLeft: -5
    },
    dateHeading: {
        color: 'tomato',
        fontSize: 20,
        marginRight: '60%'
    },
    dateText: {
        color: 'grey',
        fontSize: 15,
    },
    carParkTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
    subtitleStyle: {
        color: 'white',
    },
    subtitleView: {
        paddingTop: 15,
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 15,
        paddingLeft: 15,
        marginTop: -30,
        color: 'white',
    },
    regInfo: {
        fontWeight: 'bold',
        color: 'grey',
        paddingBottom: 5
    },
    bookingButton : {
        padding: 10,
    },
    bookingButtonContainer : {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
    },
    bookingModalButton : {
        width: '120%',
        backgroundColor: 'tomato',
        padding: 20,
    },

});

export default (ViewBookingsScreen);