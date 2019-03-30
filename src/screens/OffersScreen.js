import React from 'react';
import {AsyncStorage, DeviceEventEmitter, ScrollView, StyleSheet, Text, View} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import firebase from "react-native-firebase";
import {Button, ListItem} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

class OffersScreen extends React.Component {
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
            userId:null,

            offerList: [
            ]

        }
    }


    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.redeemOfferListener = DeviceEventEmitter.addListener('RedeemOffer', (e) => {
                if (user) {
                    this.setState({
                        userId: user.uid
                    });
                    this.shouldUpdateOffers(user.uid);
                    if (this.state.shouldUpdate == 'true'){
                        this.updateOffers(user.uid);
                    }
                    this.getOffers(user.uid);
                }
            });

            if (user) {
                this.setState({
                    userId: user.uid
                });
                this.shouldUpdateOffers(user.uid);
                if (this.state.shouldUpdate == 'true'){
                    this.updateOffers(user.uid);
                }
                this.getOffers(user.uid);
            }
        });
    }



    componentWillUnmount() {
        this.redeemOfferListener.remove();
    }


    goToOfferDetailsScreen(company, offer, expiry, logo, offerId, redemptionDate, scans){

        this.props.navigation.navigate("OfferDetails", {
            userId: this.state.userId,
            companyName: company,
            offerName: offer,
            expiryDate: expiry,
            logo: logo,
            offerId: offerId,
            redemptionDate: redemptionDate,
            scans: scans,
        })
    }

    shouldUpdateOffers = (userId) => {
        let formData = new FormData();
        formData.append('user_id', userId);
        fetch('http://18.188.105.214/should/updateoffers', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log(response)
            let data = JSON.parse(response['_bodyText']);
            this.setState({shouldUpdate : data});
        }).catch(error => {
            const { code, message } = error;
        })
    };

    updateOffers = (userId) => {
        let formData = new FormData();
        formData.append('user_id', userId);
        fetch('http://18.188.105.214/postoffers/user', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log("====================UPDATED====================")
        }).catch(error => {
            const { code, message } = error;
        })
    };

    getOffers(userId){
        let formData = new FormData();
        formData.append('user_id', userId);
        console.log(userId)
        // GET request
        fetch('http://18.188.105.214/getOffers', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            console.log(response)
            let offersList = [];
            let data = JSON.parse(response['_bodyText']);
            let i = 0;

            // Get each booking and form JSON
            for (i; i < data.length; i++) {
                let offer = {
                    logo: data[i]['logo'],
                    company: data[i]['store'],
                    offer: data[i]['offer'],
                    expiry: data[i]['expiry_date'],
                    offerId: data[i]['offer_id'],
                    redemptionDate: data[i]['redemption_date'],
                    scans: data[i]['scans']
                };
                offersList.push(offer); // Add to list

                // As not async, check all done before updating state
                if (i === data.length-1) {
                    this.setState({offerList : offersList});
                }
            }

        }).catch(error => {
            const { code, message } = error;
        })
    }

    render() {

        return (
            <View style={styles.content}>

                <ScrollView style={{ width: '100%', height: '100%'}}>
                {
                    this.state.offerList.map((l, i) => (
                        <ListItem
                            containerStyle={this.getColour(l.company).listContainer}
                            contentContainerStyle={this.getColour(l.company).listContentContainer}
                            titleStyle={this.getColour(l.company).carParkTitle}
                            subtitleStyle={this.getColour(l.company).subtitleStyle}
                            leftAvatar={{ source: { uri: l.logo } }}
                            key={i}
                            onPress={() => {
                                this.goToOfferDetailsScreen(l.company, l.offer, l.expiry, l.logo, l.offerId, l.redemptionDate, l.scans)
                            }}
                            title={l.company}
                            subtitle={
                                <View style={this.getColour(l.company).subtitleView}>
                                    {l.favourite ?
                                        <Icon
                                            style={styles.icon}
                                            name="star"
                                            size={25}
                                            color="white"
                                        /> : null }
                                    <Text style={this.getColour(l.company).available}>{'Offer: ' + l.offer }</Text>
                                    <Text style={this.getColour(l.company).price}>{'This offer will expire on: ' + l.expiry}</Text>
                                </View>
                            }
                            // leftAvatar={{ source: require('../images/avatar1.jpg') }}
                        />
                    ))
                }
                </ScrollView>
                <Button
                    style={styles.bookingButton}
                    containerStyle={styles.bookingButtonContainer}
                    buttonStyle={styles.bookingModalButton}
                    icon={<Ionicons name='md-refresh' size={25} color={'white'}/>}
                    title=''
                    onPress={() => {
                        this.getOffers();
                    }}
                />
            </View>
        );
    }

    getColour(company){
        const s_styles = StyleSheet.create({
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
                backgroundColor: 'green'
            },
            listContainer: {
                width: '100%',
            },
            listContentContainer: {
                backgroundColor: 'green',
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
                backgroundColor: 'red'
            },
            listContainer: {
                width: '100%',
            },
            listContentContainer: {
                backgroundColor: 'red',
                padding: 20,
                paddingBottom: 35
            },
        });
        const other = StyleSheet.create({
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
        });

        var colours = {
            'McDonalds': m_styles,
            'Subway': s_styles,
            'Burger King': b_styles,
            'Other': other
        };
        try {
            if (company === "McDonalds" || company === "Burger King" || company === "Subway") {
                return colours[company];
            } else {
                return colours['Other'];
            }
        }catch (e) {
            return "Company Doesn\'t Exist"
        }
        // try {
        //     return colours[company]
        // } catch (e) {
        //     return "Company Doesn\'t Exist"
        // }
    }
}

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
    listContentContainerMcDonalds: {
        backgroundColor: 'red',
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

export default OffersScreen;


