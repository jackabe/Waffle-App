import React from 'react';
import {View, Text, Alert, StyleSheet, PermissionsAndroid, Dimensions } from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {Input} from "react-native-elements";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import LotHandler from "../utils/LotHandler";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';

import LocationModule from '../packages/LocationModule';
import CustomMarker from "../components/CustomMarker";
import Loading from "../components/Loading";

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
            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    'title': 'Waffle',
                    'message': 'Waffle wants access to your location '
                }
            );
            if (granted && granted2) {
                return granted;
            }
        } catch (err) {
            console.warn(err)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            postcode: '',
            lat: 51.482171,
            long: -3.171731,
            region: {
                latitude: 51.482171,
                longitude: -3.171731,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            loading: true,
            markers: [],
            parkingList: [
                {
                    details: {
                        id: 'ABQToXLPhJCk15dJrbYT',
                        name: 'Cardiff Queen Street Parking',
                        lat: 51.482171,
                        long: -3.171731,
                    },
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
                this.findLocation();
            }
            else {
                alert("You will not receive the full benefits of the app without location permissions turned on!");
            }
        })
        .catch(error => {
            Alert.alert(error)
        });
    }

    findLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => this.getLotsByLocation(position),
            error => console.log('Failed, trying with coarse location'), navigator.geolocation.getCurrentPosition(
                position => this.getLotsByLocation(position),
                error => console.log(error),
                {enableHighAccuracy: false, timeout: 5000,
                    maximumAge: 10000},
            ),
            {enableHighAccuracy: true, timeout: 5000,
                maximumAge: 10000}
        );
    };

    getLotsByLocation = (position) => {
        let latutude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let region = {
            latitude: latutude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        };
        this.onRegionChange(region);

        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latutude+','+longitude+'&key=AIzaSyAblfAuUNvSw0MyuoUlGFAbzAmRlCW2B1M', {
            method: 'get',
        }).then(response => {
            let data = JSON.parse(response['_bodyInit'])['results'][0];
            if (data) {
                let address = data['formatted_address'];
                let city = data['address_components'][2]['long_name'];

                // Form data to send to Flask
                let formData = new FormData();
                formData.append('city', city);
                formData.append('address', address);
                formData.append('latitude', position.coords.latitude);
                formData.append('longitude', position.coords.longitude);

                this.getLots(formData)

            }
        }).catch(error => {
            const { code, message } = error;
            Alert.alert(message);
        });

    };

    getLots = (formData) => {
        // Post to flask and get parking lot response
        fetch('http://18.188.105.214/getCarParks', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            let markers = [];
            let data = JSON.parse(response['_bodyText']);
            let i = 0;
            for (i; i < data.length; i++) {
                let details = LotHandler.getLotDetails(data[i]);
                let prices = LotHandler.getLotPrices(data[i]);
                let spaces = LotHandler.getLotSpaces(data[i], details);

                let marker = {
                    details: details,
                    price: prices['1'].toFixed(2),
                    spaces: spaces,
                    coords: {
                        latitude: details.lat,
                        longitude: details.long
                    }
                };

                markers.push(marker);

                // As not async, check all done before updating state
                if (i === data.length-1) {
                    this.setState({markers : markers});
                    this.setState({loading : false});
                }
            }
            if (markers.length === 0) {
                this.setState({loading : false});
                Alert.alert(
                    'No Parking Lots',
                    'Sorry, but we currently do not support this area! Check our website to see when we are coming to you!',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                );
            }
        }).catch(error => {
            const { code, message } = error;
            console.log(message);
            Alert.alert(message);
        });
    };

    getAddresses(postcode) {
        this.setState({postcode});
        if (postcode.length > 5) {
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

                    let region = {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    };

                    this.onRegionChange(region);

                    // Form data to send to Flask
                    let formData = new FormData();
                    formData.append('city', city);
                    formData.append('address', address);
                    formData.append('latitude', lat);
                    formData.append('longitude', long);

                    this.setState({loading: true});

                    this.getLots(formData)
                }});
        }
    };

    goToBookingScreen(name, id) {
        this.props.navigation.navigate("GetSpace", {
            userId: this.state.userId,
            parkingLotName: name,
            parkingLotId: id,
        })
    }

    onRegionChange = (region) => {
        this.setState({ region });
    };

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

                <Loading
                    loading={this.state.loading} />

                <View style={styles.mapView}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        customMapStyle={mapStyle}>
                        {this.state.markers.map(marker => (
                            <Marker
                                key={marker.details.lot_id}
                                coordinate={marker.coords}>
                                <Callout onPress={() => {
                                    this.goToBookingScreen(marker.details.name, marker.details.lot_id)
                                }}>
                                    <CustomMarker data={marker} {...marker} />
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                </View>

                {/*{*/}
                    {/*this.state.parkingList.map((l, i) => (*/}
                        {/*<ListItem*/}
                            {/*containerStyle={styles.listContainer}*/}
                            {/*contentContainerStyle={styles.listContentContainer}*/}
                            {/*titleStyle={styles.carParkTitle}*/}
                            {/*subtitleStyle={styles.subtitleStyle}*/}
                            {/*key={i}*/}
                            {/*title={l.details.name}*/}
                            {/*subtitle={*/}
                                {/*<View style={styles.subtitleView}>*/}
                                    {/*/!*{l.favourite ?*!/*/}
                                    {/*/!*<Icon*!/*/}
                                        {/*/!*style={styles.icon}*!/*/}
                                        {/*/!*name="star"*!/*/}
                                        {/*/!*size={25}*!/*/}
                                        {/*/!*color="white"*!/*/}
                                    {/*/> : null }*/}
                                    {/*<Text style={styles.available}>{l.spaces + ' spaces available TODAY!'}</Text>*/}
                                    {/*<Text style={styles.price}>{'Prices start from £' + l.price +' / hour!'}</Text>*/}

                                    {/*<View style={styles.map}>*/}
                                        {/*<MapView*/}
                                            {/*style={{width: 100, height: 100}}*/}
                                            {/*initialRegion={{*/}
                                                {/*latitude: l.details.lat,*/}
                                                {/*longitude: l.details.long,*/}
                                                {/*latitudeDelta: 0.010,*/}
                                                {/*longitudeDelta: 0.010,*/}
                                            {/*}}*/}
                                            {/*customMapStyle={mapStyle}>*/}
                                            {/*<Marker*/}
                                                {/*coordinate={{*/}
                                                    {/*latitude: l.details.lat,*/}
                                                    {/*longitude: l.details.long*/}
                                                {/*}}*/}
                                            {/*/>*/}
                                        {/*</MapView>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*}*/}
                            {/*// leftAvatar={{ source: require('../images/avatar1.jpg') }}*/}
                        {/*/>*/}
                    {/*))*/}
                {/*}*/}
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 0,
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

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
];
