import React from 'react';
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Input, Button, Divider, CheckBox} from "react-native-elements";
import headerStyling from "../styles/ui/Header";
import DatePicker from "react-native-datepicker";
import Ionicons from "react-native-vector-icons/Entypo";
import Service from "../utils/Service";
import LotHandler from "../utils/LotHandler";

class BookingScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle  ",
            headerRight: <ProfileHeaderButton navigation={navigation}/>,
        };
    };

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.getLatestPrices();
        this.pricesInterval = setInterval(() => this.getLatestPrices(), 50000)
    }

    componentWillUnmount() {
        clearInterval(this.pricesInterval);
    }

    constructor(props) {
        super(props);
        this.state = {
            // parkingLotId initialized at 1 until address finder feature completed
            date: '',
            regNumber: '',
            disableBooking: true,
            departureDate: '',
            departureTime: '',
            arrivalDate: '',
            arrivalTime: '',
            disabledChecked: false,
            childChecked: false,
            prices: {},
            price: 0
        }
    };

    getLatestPrices() {
        const { navigation } = this.props;
        const parkingLotId = navigation.getParam('parkingLotId');
        Service.getLatestPrices(parkingLotId)
            .then(response => {
                let prices = LotHandler.getLotPrices(response);
                this.setState({
                    prices: prices
                });
            }).catch(error => {
                console.log(error.message);
                Alert.alert(error.message);
            })
    };

    child = () => {
        if (this.state.childChecked) {
            this.setState({childChecked : false});
        }
        else {
            this.setState({childChecked : true});
        }
    };

    disabled = () => {
        if (this.state.disabledChecked) {
            this.setState({disabledChecked : false});
        }
        else {
            this.setState({disabledChecked : true});
        }
    };

    //Checks if reg number entered is valid and start time doesn't exceed end time
    checkDetails() {
        const { arrivalDate, arrivalTime, departureDate, departureTime } = this.state;
        if (arrivalDate.length > 1 && arrivalTime.length > 1 && departureDate.length > 1 && departureTime.length > 1) {
            if (arrivalDate === departureDate && departureTime < arrivalTime) {
                Alert.alert("You cannot depart before you arrive!");
                return true;
            }
            else {
                return false;
            }
        }
        else {
            // Functionality related to parking space in parking lot here , currently mocked---
            return true;
        }
    };

    makeBooking() {
        if (this.state.regNumber.length !== 7) {
            Alert.alert("Registration Number must be 7 characters");
        }
        else {
            const { navigation } = this.props;
            const userId = navigation.getParam('userId');
            const parkingLotName = navigation.getParam('parkingLotName');

            const { regNumber, parkingLotId, arrivalDate, arrivalTime, departureDate, departureTime, disabledChecked, childChecked} = this.state;

            // Firebase for user id?
            let formData = new FormData();

            // formData.append('username', user.uid);
            formData.append('user_id', userId);
            formData.append('location', parkingLotName);
            formData.append('number_plate', regNumber.toUpperCase());
            formData.append('arrival_date', arrivalDate);
            formData.append('arrival_time', arrivalTime);
            formData.append('departure_date', departureDate);
            formData.append('departure_time', departureTime);
            formData.append('child_required', childChecked);
            formData.append('disabled_required', disabledChecked);

            // POST request
            fetch('http://18.188.105.214/makeBooking', {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then(response => {
                Alert.alert('Booking Successful');
                this.props.navigation.navigate("Confirm", {
                    parkingLotName: navigation.getParam('parkingLotName'),
                    reg: this.state.regNumber,
                    arrivalTime: this.state.arrivalTime,
                    arrivalDate: this.state.arrivalDate,
                    departureTime: this.state.departureTime,
                    departureDate: this.state.departureDate,
                    child: this.state.childChecked,
                    disabled: this.state.disabledChecked,
                    price: this.state.price
                })
            }).catch(error => {
                const { code, message } = error;
            })
        }
    }

    getPrice() {
        const {prices, departureDate, departureTime,  arrivalDate, arrivalTime} = this.state;
        if (departureTime.length > 1 && departureDate.length > 1 && arrivalDate.length > 1 && arrivalTime.length > 1) {
            let departureDateFormatted = departureDate.split('-');
            let departureTimeFormatted = new Date("01/01/2007 " + departureTime).getHours();
            let arrivalDateFormatted = arrivalDate.split('-');
            let arrivalTimeFormatted = new Date("01/01/2007 " + arrivalTime).getHours();
            let dateDifference = departureDateFormatted[0] - arrivalDateFormatted[0];
            let timeDifference = departureTimeFormatted - arrivalTimeFormatted;

            let price = 0;
            if (dateDifference === 0) {
                if (timeDifference === 0) {
                    price = prices['1'];
                }
                else {
                    price = prices[timeDifference];
                }
            }
            else {
                price = prices['24']*dateDifference;
            }
            this.setState({price : price.toFixed(2)});
            return '£ ' +price.toFixed(2);
        }
        else {
            return '£0.00'
        }
    }

    render() {
        const { navigation } = this.props;
        const parkingLotName = navigation.getParam('parkingLotName');
        return (
            <View style={styles.container}>

                <View style={styles.lotName}>
                    <Ionicons name='location-pin' size={25} color={'tomato'} style={styles.icon}  />
                    <Text style={styles.parkingLotText}>{parkingLotName}</Text>
                </View>

                <Input
                    leftIcon={{ type: 'font-awesome', name: 'car' , size: 18, color: 'gray'}}
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainer}
                    placeholder='Enter Registration Number'
                    containerStyle={styles.inputOuterContainer}
                    onChangeText={(text) => this.setState({regNumber: text})}
                />

                <View style={styles.dates}>
                    <Text style={styles.dateText}>Arrival:</Text>
                    <View style={styles.dateTimePicker}>
                        <DatePicker
                            style={styles.pickerStyle}
                            date=''
                            hideText={true}
                            mode="date"
                            iconComponent={<Ionicons name='calendar' size={25} color={'tomato'}/>}
                            format="DD-MM-YY"
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
                            onDateChange={(date) => {this.setState({arrivalDate: date})}}
                        />
                    </View>
                    <View style={styles.dateTimePicker}>
                        <DatePicker
                            style={styles.pickerStyle}
                            date=''
                            hideText={true}
                            mode="time"
                            // May need to be updated so that the users can't book in past.
                            iconComponent={<Ionicons name='time-slot' size={25} color={'tomato'}/>}
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
                            onDateChange={(date) => {this.setState({arrivalTime: date})}}
                        />
                    </View>
                </View>

                <View style={styles.dates}>
                    <Text style={styles.dateText}>Departure:</Text>
                    <View style={styles.dateTimePicker}>
                        <DatePicker
                            style={styles.pickerStyle}
                            date=''
                            hideText={true}
                            mode="date"
                            format="DD-MM-YY"
                            // May need to be updated so that the users can't book in past.
                            iconComponent={<Ionicons name='calendar' size={25} color={'tomato'}/>}
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
                            onDateChange={(date) => {this.setState({departureDate: date})}}
                        />
                    </View>
                    <View style={styles.dateTimePicker}>
                        <DatePicker
                            style={styles.pickerStyle}
                            date=''
                            hideText={true}
                            mode="time"
                            // May need to be updated so that the users can't book in past.
                            iconComponent={<Ionicons name='time-slot' size={25} color={'tomato'}/>}
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
                            onDateChange={(date) => {this.setState({departureTime: date})}}
                        />
                    </View>
                </View>

                <View style={styles.dateOverview}>
                    <Text style={styles.arrive}>
                        <Text style={styles.label}>Arrive: </Text>
                        {this.state.arrivalDate}  {this.state.arrivalTime}
                    </Text>
                    <Text style={styles.depart}>
                        <Text style={styles.label}>Depart: </Text>
                        {this.state.departureDate} {this.state.departureTime}
                    </Text>
                </View>

                <Divider style={styles.divider}/>

                <View style={styles.requirements}>
                    <Text style={styles.requirementsText}>Special Requirements</Text>

                    <CheckBox
                        onPress={() => {
                            this.disabled();
                        }}
                        containerStyle={styles.checkBackground}
                        textStyle={styles.checkText}
                        checkedColor='tomato'
                        uncheckedColor='silver'
                        wrapperStyle={styles.checkText}
                        center
                        title='Disabled Bay'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.disabledChecked}
                    />

                    <CheckBox
                        onPress={() => {
                            this.child();
                        }}
                        containerStyle={styles.checkBackground}
                        textStyle={styles.checkText}
                        checkedColor='tomato'
                        uncheckedColor='silver'
                        wrapperStyle={styles.checkText}
                        center
                        title='Parent and Child'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.childChecked}
                    />
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Price:</Text>
                    <Text style={styles.price}>{this.getPrice()}</Text>
                </View>

                <Button
                    disabled={this.checkDetails()}
                    style={styles.bookingButton}
                    containerStyle={styles.bookingButtonContainer}
                        buttonStyle={styles.bookingModalButton}
                        title={"Book"}
                        onPress={()=>{
                            this.makeBooking();
                        }}
                />
            </View>
        );
    }
}

// Styles
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    lotName: {
        marginTop: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        color: 'tomato',
        fontSize: 35,
        letterSpacing: 1.2,
        fontWeight: "bold",
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
        bottom: 10,
        alignItems: 'center',
    },
    bookingModalButton : {
        width: '120%',
        backgroundColor: 'tomato',
        padding: 20,
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
        color: 'tomato',
        fontSize: 17,
        padding: 10,
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
        marginLeft: '50%'
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
    }
});

export default BookingScreen;