import {Actions as routes} from "react-native-router-flux";
import { MessageBarManager } from 'react-native-message-bar';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const login = (username, password) => {
	return dispatch => {
		dispatch(loginStart());

		setTimeout(() => {
			if (username.length && password.length) {
				return dispatch(loginSuccess(username, password));
			}
			return dispatch(loginFail(new Error('username and password fields are required')));
		}, Math.random() * 1000 + 500)
	};
};

const loginStart = () => {
	return {
		type: AUTH_LOGIN_START
	}
};

const loginSuccess = (username, password) => {
	let formData = new FormData();
	formData.append('email', String(username));
	formData.append('password', String(password)); 

	const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
    fetch("http://solutiontrackers.com/dev-a/zerototwo/index.php/Webservice/login", config) 
    .then((response) => response.json()) 
    .then((responseData) => {
    	 if (responseData.response.status) { 
    	 	routes.homePage();
         } else {
            MessageBarManager.showAlert({
            message: "invalid username and password",
            alertType: 'error',
            })
    	}
    }) 
    .catch(err => { 
    	console.log(err); 
    }) 
    .done();
	
	return {
		type: AUTH_LOGIN_SUCCESS,
		payload: {
			token: Math.random().toString(),
			username,
			password
		}
	}
};

const loginFail = error => {
	return {
		type: AUTH_LOGIN_FAIL,
		payload: error,
		error: true
	}
};

export const logout = () => {
	return dispatch => {
		routes.loginPage();
		dispatch({
			type: AUTH_LOGOUT
		});
	};
};