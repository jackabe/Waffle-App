import {Alert} from "react-native";

function getLatestPrices(lotId) {
    return new Promise(function(resolve, reject) {
        let formData = new FormData();
        formData.append('id', lotId);
        fetch('http://18.188.105.214/getCarParkById', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then(response => {
            let data = JSON.parse(response['_bodyText']);
            resolve(data);
        }).catch(error => {
            const { code, message } = error;
            reject(error);
        });
    });
}

module.exports = {
    getLatestPrices
};