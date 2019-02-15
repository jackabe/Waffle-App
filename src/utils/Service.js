import { Platform } from "react-native";
import firebase from 'react-native-firebase';
import Tools from '../utils/Tools';

class Service {

    /*******************************
     *********** Flask Server *****
     ********************************/

    // makeGetRequest(url,callback){
    //     Tools.getToken((token) => {
    //         fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': token
    //             }
    //         })
    //             .then((response) => {
    //                 callback(response)
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 callback(null);
    //             });
    //     });
    // }
    //
    // makePostRequest(url,data,callback){
    //     Tools.getToken((token) => {
    //         fetch(url, {
    //             method: 'POST',
    //             timeout: 5,
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': token
    //             },
    //             body: JSON.stringify(data)
    //         })
    //             .then((response) => {
    //                 callback(response)
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 callback(null);
    //             });
    //     })
    // }

    /*******************************
     *********** Firebase API *****
     ********************************/

    loginFacebook(data,callback){
        let user = firebase.auth().currentUser;
        if(user && user.isAnonymous){
            this.FBDeleteUser();
        }
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((data) => {callback()})
            .catch((error) => {callback(error)})
    }

    FBDeleteUser(){
        let user = firebase.auth().currentUser;
        if(user){
            user.delete();
        }
    }
}

export default new Service;