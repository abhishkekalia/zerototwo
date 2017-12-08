import { AsyncStorage } from 'react-native';

let Utils = {
    gurl: (usersPath)=> {
        return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
    },

    // murl: (usersPath)=> {
    //     return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
    // },

    country: () => {
        return AsyncStorage.getItem('data')
        .then((result) => {
            var response = JSON.parse(result); 
            return response.userdetail.country;
        });
    },

    userid: () => {

        return AsyncStorage.getItem('data')
        .then((result) => {
            var response = JSON.parse(result); 
            var data =response.userdetail.u_id
            return data;
        });
    },

    logout(){
        AsyncStorage.removeItem('data', (err, result) => {
            return result; 
            console.warn(result); 
        }); 
    }
};

module.exports = Utils;