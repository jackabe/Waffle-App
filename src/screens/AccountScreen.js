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

class AccountScreen extends React.Component {
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
            }
        });
    }


    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>

                <View style={styles.profileSection}>
                    <IoniconsProfile name='user-circle' size={50} color={'tomato'} style={styles.profileIcon}  />
                    <View>
                        <Text style={styles.name}>Jack Allcock</Text>
                        <Text style={styles.username}>{this.state.name}</Text>
                    </View>
                    <PencilIcon name='pencil-circle' size={50} color={'tomato'} style={styles.pencilIcon}  />
                </View>

                <Button
                    style={styles.bookingButton}
                    containerStyle={styles.bookingButtonContainer}
                    buttonStyle={styles.bookingModalButton}
                    icon={<Ionicons name='md-exit' size={25} color={'white'} style={styles.icon}/>}
                    title='Sign out'
                    onPress={() => {
                        this.signOut();
                    }}
                />

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
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
        marginLeft: 20,
    },
    heading: {
        color: 'tomato',
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
      paddingTop: 10
    },
    bookingsHeading: {
        color: 'tomato',
        fontSize: 24,
        // fontWeight: "bold",
        paddingTop: 20,
    },
    location: {
      color: 'tomato',
      fontSize: 20,
        paddingBottom: 10
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    bookingHeading: {
        color: 'tomato',
        fontSize: 25,
        alignSelf: 'flex-start',
        marginLeft: 40,
        paddingTop: 30
    },
    listContainer: {
        width: '100%',
    },
    listContentContainer: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    },
    locationIcon: {
      marginTop: -10,
        paddingRight: 5,
        marginLeft: -5
    },
    dateHeading: {
      color: 'tomato',
        fontSize: 20,
        marginRight: '20%',
        width: 50
    },
    dateText: {
        color: 'grey',
        fontSize: 19,
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
        padding: 20,
        marginTop: -10,
        color: 'white',
        borderColor: 'grey',
        borderWidth: 1,
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

export default AccountScreen;