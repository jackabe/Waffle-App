import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import headerStyling from "../styles/ui/Header";
import ProfileHeaderButton from "../components/ProfileHeaderButton";
import firebase from "react-native-firebase";
import {Input, ListItem} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

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
            offerId:null,
            offerList: [
                {
                    company:'McDonalds',
                    offer:'Free Cheeseburger',
                    expiry:'15 March 2019'
                },

                {
                    company:'Subway',
                    offer:'Free Drink',
                    expiry:'15 April 2019'
                },

                {
                    company:'Burger King',
                    offer:'Free Side',
                    expiry:'28 March 2019'
                },
            ]

        }
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


    goToOfferDetailsScreen(company, offer, expiry){
        this.props.navigation.navigate("OfferDetails", {
            userId: this.state.userId,
            companyName: company,
            offerName: offer,
            expiryDate: expiry,
        })
    }

    render() {
        return (
            <View style={styles.content}>
                {
                    this.state.offerList.map((l, i) => (
                        <ListItem
                            containerStyle={this.getColour(l.company).listContainer}
                            contentContainerStyle={this.getColour(l.company).listContentContainer}
                            titleStyle={this.getColour(l.company).carParkTitle}
                            subtitleStyle={this.getColour(l.company).subtitleStyle}
                            key={i}
                            onPress={() => {
                                this.goToOfferDetailsScreen(l.company, l.offer, l.expiry)
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
}

export default OffersScreen;


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
});
