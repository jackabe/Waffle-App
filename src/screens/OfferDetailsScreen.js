import React from 'react';
import {View, Text, StyleSheet, Image, Alert, ImageBackground} from 'react-native';
import headerStyling from "../styles/ui/Header";
import firebase from "react-native-firebase";
import QRCode from 'react-native-qrcode';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Button} from "react-native-elements";

class OfferDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: headerStyling.headerStyle,
            headerTitleStyle: headerStyling.headerTitleStyle,
            headerTitle: "waffle    ",
            headerRight: <Text style={styles.account}>Settings</Text>,
        };
    };

    constructor(props){
        super(props);
        this.state = {
            showCode: false,
            showButton: true,

        }
    }


    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            // if (user) {
            //     this.setState({
            //         userId: user.uid
            //     })
            // }
        });
    }

    getQR(){
        const visibleQR = this.state.showCode;
        const visibleStyle= StyleSheet.create({
            width: '250px',
            height:'250px'
        });
        const invisibleStyle= StyleSheet.create({
            display: 'none'
        });

        if(visibleQR == true){
            return invisibleStyle
        }else {
            return visibleStyle
        }

    }

    redeemOffer() {
        const {navigation} = this.props;
        const offerId = navigation.getParam('offerId');
        const userId = navigation.getParam('userId')

        var date = new Date()
        var today = date.getDate();

        let formData = new FormData();
        formData.append('offer_id', offerId);
        formData.append('user_id', userId);
        formData.append('redeem_date', today);

        fetch('http://18.188.105.214/redeemOffer', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData

        }).then(response => {
            Alert.alert('Offer Redeemed')
            this.setState({showCode: true})
        }).catch(error => {
            const {code, message} = error;
            Alert.alert('An error occurred or has been redeemed before ')
        })

    }

    render() {
        const {navigation} = this.props;
        const company = navigation.getParam('companyName');
        const offer = navigation.getParam('offerName');
        const expiry = navigation.getParam('expiryDate');
        const logo = navigation.getParam('logo');


        const redemptionDate = navigation.getParam('redemptionDate');
        const isVoucherRedeemed = this.state.showCode;
        let code;


        if (redemptionDate != ""){
            code = <QRCode value={'https://www.bbc.co.uk/'} size={250} bgColor='black' fgColor='white'/>;

        }else if (!isVoucherRedeemed) {
            // This is an image to a greyed out QR code
            code = <Image style={{width: 250, height: 250}} source={{uri: 'http://1.bp.blogspot.com/-0qeFglJKO38/UBt-0F5POKI/AAAAAAAAALA/4QT5V8J8wLs/s290/qrcode_grey_hotel_en_gris.png'}}/>;
        } else {
            code = <QRCode value={'https://www.bbc.co.uk/'} size={250} bgColor='black' fgColor='white'/>;

        }

        return (
            <View style = {styles.container}>
                <View style={styles.qrContainer}>
                    {code}
                </View>

                <View>
                    <Text style={styles.constHeadings}>
                        {company}
                    </Text>
                    <Text style={styles.constHeadings}>
                        {'Offer: ' + offer}
                    </Text>
                    <Text style={styles.constHeadings}>
                        {'Expires: ' + expiry}
                    </Text>
                    <Button
                        style={styles.bookingButton}
                        containerStyle={styles.bookingButtonContainer}
                        buttonStyle={styles.bookingModalButton}
                        icon={<Ionicons name='md-checkmark' size={25} color={'white'} style={styles.icon}/>}
                        title='Redeem'
                        onPress={() => {
                            this.redeemOffer();
                        }}
                    />
                </View>

            </View>
        );
    }
}


// style = {this.getColour(company).container}

const styles = StyleSheet.create({
    account: {
        color: 'tomato',
        fontSize: 20,
        letterSpacing: 1.2,
        marginTop: 10,
        marginRight: 25
    },
    constHeadings: {
        color: 'tomato',
        fontSize: 20,
        padding: 12,

    },
    imageLogo:{
        // padding:'20px',
        width: 250,
        height:250
    },
    bookingButton : {
        padding: 10,
    },
    bookingButtonContainer : {
        position: 'absolute',
        bottom: 1,
        alignItems: 'center',
    },
    bookingModalButton : {
        width: '120%',
        backgroundColor: 'tomato',
        padding: 20,
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        textAlign: 'center',
    },
    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default OfferDetailsScreen;