import React from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import headerStyling from "../styles/ui/Header";
import { Input, Button, ListItem} from 'react-native-elements';
import firebase from 'react-native-firebase';
import Ionicons from "react-native-vector-icons/Ionicons";
import Location from "react-native-vector-icons/Entypo";
import PencilIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import IoniconsProfile from "react-native-vector-icons/FontAwesome";
import ProfileHeaderButton from "../components/ProfileHeaderButton";

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

        let stringBooking = ("" + bookingDD + "/" + bookingMM + "/" + bookingYYYY);
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
                    location: data[i]['lot_name']
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

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>

                <Text style={styles.bookingHeading}>Your Bookings</Text>

                <ScrollView style={{ width: '100%', height: '100%'}}>
                    {
                        this.state.bookingList.map((l, i) => (
                            <ListItem
                                containerStyle={styles.listContainer}
                                contentContainerStyle={styles.listContentContainer}
                                subtitleStyle={styles.subtitleStyle}
                                key={i}
                                subtitle={
                                    <View style={styles.subtitleView}>

                                        <View>
                                            <View style={styles.section}>
                                                <Location name='location-pin' size={25} color={'tomato'} style={styles.locationIcon}  />
                                                <Text style={styles.location}>{l.location}</Text>
                                                <Text style={styles.dateText}>{l.arrival} - {l.departure}</Text>
                                            </View>
                                        </View>

                                        <Text style={styles.regInfo}>{'Number Plate: ' + l.numberPlate}</Text>

                                        <View style={styles.section}>
                                            {l.disabled ?
                                                <Text style={styles.info}>Disabled</Text> : null
                                            }
                                            {l.child ?
                                                <Text style={styles.info}>Parent and child</Text> : null
                                            }

                                        </View>

                                        <View style={styles.line}></View>
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
    username: {
        color: 'grey',
        marginTop: 5,
        marginLeft: 20
    },
    line: {
        height: 1,
        marginLeft: -70,
        width: '200%',
        borderWidth: 0.5,
        borderColor: 'grey',
        marginTop: 5
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
    icon: {
        paddingRight: 15
    },
    account: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        marginTop: 10,
        marginRight: 25
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
        color: 'grey',
        fontSize: 20,
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
        marginTop: -6,
        marginLeft: 50,
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
        paddingLeft: 10,
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

export default ViewBookingsScreen;