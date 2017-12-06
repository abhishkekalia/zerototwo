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
    		return result; 
    		// console.warn(JSON.parse(result)); 
    	}); 
    },
    persistremove : () => {
    	AsyncStorage.removeItem('data', (err, result) => {
    	    return result; 
    		// console.warn(result); 
    	}); 
    }
};

module.exports = Utils;