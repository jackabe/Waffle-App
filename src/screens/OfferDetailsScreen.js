import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import headerStyling from "../styles/ui/Header";
import firebase from "react-native-firebase";
import QRCode from 'react-native-qrcode';

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

        }
    }


    // componentDidMount() {
    //     this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
    //         // if (user) {
    //         //     this.setState({
    //         //         userId: user.uid
    //         //     })
    //         // }
    //
    //     });
    // }

    //
    getColour(company){
        const s_styles = StyleSheet.create({
            container: {
                width: '100%',
                height: '100%',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#009743',
            },

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
                backgroundColor: '#009743'
            },
            listContainer: {
                width: '100%',
            },
            listContentContainer: {
                backgroundColor: '#009743',
                padding: 20,
                paddingBottom: 35
            },
        });
        const b_styles = StyleSheet.create({
            available: {
                paddingTop: 10,
                fontWeight: 'bold',
                color: 'white'
            },
            container: {
                width: '100%',
                height: '100%',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#ffc300',
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
                backgroundColor: '#ffc300'
            },
            listContainer: {
                width: '100%',
            },
            listContentContainer: {
                backgroundColor: '#ffc300',
                padding: 20,
                paddingBottom: 35
            },
        });
        const m_styles = StyleSheet.create({
            available: {
                paddingTop: 10,
                fontWeight: 'bold',
                color: 'white'
            },
            container: {
                width: '100%',
                height: '100%',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#dd1021',
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
                backgroundColor: '#dd1021'
            },
            listContainer: {
                width: '100%',
            },
            listContentContainer: {
                backgroundColor: '#dd1021',
                padding: 20,
                paddingBottom: 35
            },
        });

        var colours = {
            'McDonalds': m_styles,
            'Subway': s_styles,
            'Burger King': b_styles
        };

        try {
            return colours[company]
        } catch (e) {
            return "Company Doesn\'t Exist"
        }
    }

    render() {
        const {navigation} = this.props;
        const company = navigation.getParam('companyName');
        const offer = navigation.getParam('offerName');
        const expiry = navigation.getParam('expiryDate');
        const logo = navigation.getParam('logo');
        return (
            <View style = {this.getColour(company).container}>
                <Image style={styles.imageLogo}
                       source={{uri: logo}} />


                <QRCode
                    value={'https://www.bbc.co.uk/'}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>


                <Text style={styles.constHeadings}>
                    {'Offer: ' + offer}
                </Text>
                <Text style={styles.constHeadings}>
                    {'Expires: ' + expiry}
                </Text>
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
        color: 'white',
        fontSize: 24,
        padding: 20,

    },
    imageLogo:{
        // padding:'20px',
        width: '100%',
        height:'45%'
    }
});

export default OfferDetailsScreen;