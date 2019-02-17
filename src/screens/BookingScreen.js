import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Header, Overlay, Input, Button} from "react-native-elements";
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from "react-native-datepicker";

class BookingScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle  ",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            // parkingLotId initialized at 1 until address finder feature completed
            parkingLotId: '1',
            date: '',
            regNumber: '',
            startTime: '',
            endTime: '',
            disableBooking: true,
        };
    }


    //Checks if reg number entered is valid and start time doesn't exceed end time
    validateBooking() {
        const { regNumber, startTime, endTime } = this.state;
        if(regNumber.length !== 7){
            Alert.alert("Registration Number must be 7 characters");
            this.setState({disableBooking : true});
            // 24 hr clock
        }else if(startTime > endTime){
            Alert.alert("End time cannot be before start time");
            this.setState({disableBooking : true});
        }else {
            // Functionality related to parking space in parking lot here , currently mocked---

            Alert.alert("Booking Valid");
            this.setState({disableBooking : false});
        }

    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bookingHeading}>Make a Booking</Text>

                <View style={styles.bookingContainer}>

                    <Text style={styles.parkingLotText}>Parking Lot Id: {this.state.parkingLotId}</Text>

                    <Input
                        leftIcon={{ type: 'font-awesome', name: 'car' }}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Registration Number'
                        containerStyle={styles.inputOuterContainer}
                        onChangeText={(text) => this.setState({regNumber: text})}
                    />

                    <DatePicker
                        style={styles.inputOuterContainer}
                        date={this.state.date}
                        mode="date"
                        placeholder="Enter date of booking"
                        format="DD-MM-YYYY"
                        // May need to be updated so that the users can't book in past.
                        minDate="01-01-1900"
                        maxDate="01-01-2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                top: 4,
                                marginLeft: 35
                            },
                            dateInput: {
                                marginLeft: 0
                            }

                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />

                    <DatePicker
                        style={styles.inputOuterContainer}
                        date={this.state.startTime}
                        mode="time"
                        placeholder="Enter start time"
                        // May need to be updated so that the users can't book in past.

                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                top: 4,
                                marginLeft: 35
                            },
                            dateInput: {
                                marginLeft: 0
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({startTime: date})}}
                    />

                    <DatePicker
                        style={styles.inputOuterContainer}
                        date={this.state.endTime}
                        mode="time"
                        placeholder="Enter end time"
                        // May need to be updated so that the users can't book in past.

                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: 0,
                                top: 4,
                                marginLeft: 35
                            },
                            dateInput: {
                                marginLeft: 0
                            }

                        }}
                        onDateChange={(date) => {this.setState({endTime: date})}}
                    />

                    <Button containerStyle={styles.bookingButtonContainer}
                            buttonStyle={styles.bookingModalButton}
                            title={"Check Availability"}
                            onPress={()=>{
                                this.validateBooking();
                            }}
                    />

                    <Button containerStyle={styles.bookingButtonContainer}
                            buttonStyle={styles.bookingModalButton}
                            title={"Make Booking"}
                            disabled={this.state.disableBooking}
                            onPress={()=>{
                                Alert.alert("Pressed");
                            }}
                    />

                </View>

            </View>
        );
    }
}

// Styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: -100
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
    slogen: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        fontWeight: "normal",
        padding: 10,
        marginTop: -80,
        marginBottom: 80,
    },
    inputs: {
        width: '100%',
        marginTop: '50%',
        alignItems: 'center',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        color: '#000000',
        textAlign: 'center'
    },
    inputStyle: {
        textAlign: 'center'

    },
    inputOuterContainer : {
        borderRadius: 50,
        width: '80%',
        margin: 20,
        textAlign: 'center'
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
    bookingContainer : {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    bookingButton : {
        padding: 10,
        backgroundColor: 'tomato'
    },
    icon: {
        paddingRight: 5
    },
    bookingHeading: {
        color: 'tomato',
        fontSize: 28,
        letterSpacing: 1.2,
        fontWeight: "bold",
        padding: 10,
    },
    parkingLotText: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        padding: 10,
    },
    closeView : {
        backgroundColor: 'white',
        marginLeft:'90%',
        marginTop: -33,
        marginBottom: 33
    },
    bookingButtonContainer : {
        marginTop: '10%',
        backgroundColor: 'tomato',
        alignItems: 'center',
    },
    bookingModalButton : {
        padding: 20,
        backgroundColor: 'tomato'
    }
});


export default BookingScreen;