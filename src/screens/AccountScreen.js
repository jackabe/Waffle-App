import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import { Input, Button, ListItem} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'react-native-firebase';

class AddressScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <Text style={styles.account}>Your Account</Text>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            bookingList: [
                {
                    bookingDate: "18-02-2019",
                    endTime: "18:17",
                    startTime: "17:17",
                    location: "Cardiff Queen Street Parking",
                    numberPlate: "TEST301",
                },
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
                    userId: user.uid
                })
            }

        });
    }

    getBookings(){
        const { userId} = this.state;

        let formData = FormData();
        formData.append('user_id', userId);

        // POST request
        fetch('http://18.188.105.214/getBookings', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            let bookingList = [];
            let data = JSON.parse(response['_bodyText']);
            let i = 0;
            // Get each booking and form JSON
            for (i; i < data.length; i++) {
                let booking = {
                    bookingDate: data[i]['booking_date'],
                    endTime: data[i]['end_time'],
                    startTime: data[i]['start_time'],
                    location: data[i]['location'],
                    numberPlate: data[i]['number_plate']

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

                <Button
                    title='Sign out'
                    buttonStyle={styles.signOut}
                    onPress={() => {
                        this.signOut();
                    }}
                />

                <Text style={styles.bookingsHeading}>My Bookings </Text>

                {
                    this.state.bookingList.map((l, i) => (
                        <ListItem
                            containerStyle={styles.listContainer}
                            contentContainerStyle={styles.listContentContainer}
                            titleStyle={styles.carParkTitle}
                            subtitleStyle={styles.subtitleStyle}
                            key={i}
                            title={l.location}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <Text style={styles.dates}>{'From: '+ l.startTime + ', To: '+ l.endTime}</Text>
                                    <Text style={styles.dates}>{'Date: ' + l.bookingDate}</Text>
                                    <Text style={styles.dates}>{'Number Plate: ' + l.numberPlate}</Text>
                                </View>
                            }

                        />
                    ))
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    signOut: {
        width: 100,
        height: 50
    },
    heading: {
        color: 'tomato',
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
    bookingsHeading: {
        color: 'tomato',
        fontSize: 24,
        // fontWeight: "bold",
        paddingTop: 20,
    },
    listContainer: {
        width: '100%',
    },
    listContentContainer: {
        backgroundColor: 'tomato',
        padding: 20,
        paddingBottom: 35
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
        color: 'white',
        backgroundColor: 'tomato'
    },
    dates: {
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'white'
    },

});

export default AddressScreen;