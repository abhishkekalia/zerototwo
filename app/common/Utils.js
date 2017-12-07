import { AsyncStorage } from 'react-native';

let Utils = {
    gurl: (usersPath)=> {
        return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
        // return 'http://192.168.0.23/zerototwo/index.php/Webservice';
    },
    murl: (usersPath)=> {
        return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
    },
    persist : ()=> { 
    	AsyncStorage.getItem('data', (err, result) => { 
            const response = JSON.parse(result); 
             // var res = String(data)
            console.warn(response.userdetail); 
    		// return response; 
    	}); 
    },
    persistremove : () => {
        // let UID123_object = {
            // name: 'Chris', 
            // age: 30, 
            // traits: {hair: 'brown', eyes: 'brown'},
        // };
        // let UID123_delta = {
            // age: 31,
            // traits: {eyes: 'blue', shoe_size: 10}
        // };
// 
        // AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => { 
            // AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => { 
                // AsyncStorage.getItem('UID123', (err, result) => { 
                    // const trt = JSON.parse(result); 
                    // console.warn(trt);
                // });
            // });
        // });
    	AsyncStorage.removeItem('data', (err, result) => {
    	    return result; 
    		console.warn(result); 
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