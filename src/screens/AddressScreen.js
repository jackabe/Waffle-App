import React from 'react';
import {View, Text, Alert, StyleSheet, PermissionsAndroid } from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {Button, Header, Input, ListItem} from "react-native-elements";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome";

import LocationModule from '../packages/LocationModule';

class AddressScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Waffle',
                    'message': 'Waffle wants access to your location '
                }
            );
            return granted;
        } catch (err) {
            console.warn(err)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            postcode: '',
            parkingList: [
                {
                    name: 'Cardiff Queen Street Parking',
                    price: '£3.20',
                    spaces: 120,
                    favourite: true
                },
            ]
        };
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userId: user.uid
                })
            }
        });
        this.requestLocationPermission().then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                LocationModule.startScanning();
            }
            else {
                alert("Location permission denied");
            }
        })
        .catch(error => {
            Alert.alert(error)
        });
    }

    getAddresses(postcode) {
        this.setState({postcode});
        // Fetch google api and get lat, long, city and address from postcode
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+postcode+'+&key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M', {
            method: 'get',
        }).then(response => {
            let data = JSON.parse(response['_bodyInit'])['results'][0];
            if (data) {
                let address = data['formatted_address'];
                let city = data['address_components'][2]['long_name'];
                let location = data['geometry']['location'];
                let lat = location['lat'];
                let long = location['lng'];

                // Form data to send to Flask
                let formData = new FormData();
                formData.append('city', city);
                formData.append('address', address);
                formData.append('latitude', lat);
                formData.append('longitude', long);

                // Post to flask and get parking lot response
                fetch('http://18.188.105.214/getCarParks', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                }).then(response => {
                    let parkingList = [];
                    let data = JSON.parse(response['_bodyText']);
                    let i = 0;
                    // Get each lot and form JSON
                    for (i; i < data.length; i++) {
                        let carPark = {
                            name: data[i]['name'],
                            price: '£'+data[i]['avg_price'],
                            spaces: data[i]['spaces_available'],
                            favourite: false
                        };
                        parkingList.push(carPark); // Add to list

                        // As not async, check all done before updating state
                        if (i === data.length-1) {
                            this.setState({parkingList : parkingList});
                        }
                    }

                }).catch(error => {
                    const { code, message } = error;
                    Alert.alert(message);
                });
            }
        }).catch(error => {
            const { code, message } = error;
            Alert.alert(message);
        });
    };

    goToBookingScreen(name) {
        this.props.navigation.navigate("GetSpace", {
            userId: this.state.userId,
            parkingLotName: name
        })
    }

    render() {
        return (
            <View style={styles.content}>
                <Input
                    underlineColorAndroid='transparent'
                    leftIcon={{ type: 'font-awesome', name: 'search' }}
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Enter postcode to find nearby parking!'
                    containerStyle={styles.inputOuterContainer}
                    onChangeText={(text) => this.getAddresses(text)}
                />

                {
                    this.state.parkingList.map((l, i) => (
                        <ListItem
                            containerStyle={styles.listContainer}
                            contentContainerStyle={styles.listContentContainer}
                            titleStyle={styles.carParkTitle}
                            subtitleStyle={styles.subtitleStyle}
                            key={i}
                            onPress={() => {
                                this.goToBookingScreen(l.name)
                            }}
                            title={l.name}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    {l.favourite ?
                                    <Icon
                                        style={styles.icon}
                                        name="star"
                                        size={25}
                                        color="white"
                                    /> : null }
                                    <Text style={styles.available}>{l.spaces + ' spaces available TODAY!'}</Text>
                                    <Text style={styles.price}>{'Average price of ' + l.price +' / hour!'}</Text>
                                </View>
                            }
                            // leftAvatar={{ source: require('../images/avatar1.jpg') }}
                        />
                    ))
                }
            </View>
        );
    }
}

export default AddressScreen;

const styles = StyleSheet.create({
    available: {
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    price: {
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'white'
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
    listContainer: {
        width: '100%',
    },
    listContentContainer: {
        backgroundColor: 'tomato',
        padding: 20,
        paddingBottom: 35
    },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 30,
    },
    inputs: {
        width: '100%',
        marginTop: '50%',
        alignItems: 'center',
        textAlign: 'center',
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
    buttonContainer : {
        marginTop: '20%',
        backgroundColor: 'tomato',
        alignItems: 'center',
    },
    button : {
        padding: 20,
        backgroundColor: 'tomato'
    },
    createAccount: {
        paddingTop: 20,
        color: 'tomato'
    },
    signUpContainer : {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    signUpButton : {
        padding: 10,
        backgroundColor: 'tomato'
    },
    icon: {
        right: 0,
        marginTop: -25,
        position: 'absolute'
    },
});
