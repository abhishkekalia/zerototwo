import React, {Component, PropTypes} from "react";
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	Button, 
	Switch,
	ScrollView,
	Platform
} from "react-native";
import {Loader} from "app/common/components";
import commonStyles from "app/common/styles";
import {Actions as routes} from "react-native-router-flux";

import Ionicons from 'react-native-vector-icons/Ionicons';
import PasswordInputText from 'react-native-hide-show-password-input';
import { Picker } from 'react-native-picker-dropdown';
import { SegmentedControls } from 'react-native-radio-buttons';

const INITIAL_STATE = { 
	fullname: '', 
	email: '', 
	password: '',
	gender : '',
	contact: '', 
	country: '',
	address: ''
};
const options = [
	{ label:'Male', value: 'male' },
    { label:'Female', value: 'female'}];

class Register extends Component {

	constructor(props) {
		super(props); 
		this.toggleSwitch = this.toggleSwitch.bind(this);
    	this.state = {
			fullname: '', 
			email: '', 
			password: '',
			gender : '',
			contact: '', 
			country: '',
			address: '',
			gender : '',
			os : (Platform.OS === 'ios') ? 2 : 1,
		};
	}

	toggleSwitch() { 
	 	this.setState({ showPassword: !this.state.showPassword }); 
	 }
	 setSelectedOption(option){
     	this.setState({
        	gender: option,
      	});
    }

	render() {
		const {errorStatus, loading} = this.props;
		return (
			<ScrollView style={[ commonStyles.content]} testID="Login">
				<View style ={[commonStyles.registerContent, {marginBottom : 10}]}>
					<View style ={commonStyles.iconusername}>
		
						<TextInput
							style={commonStyles.inputusername}
							value={this.state.fullname}
							underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Username"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(fullname) => this.setState({fullname})}
						/>
					</View>

					<View style ={commonStyles.iconusername}>
						
						<TextInput
							style={commonStyles.inputpassword}
							value={this.state.email}
							 underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Email Address"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(email) => this.setState({email})}
						/>
					</View>
					
					<PasswordInputText
                    value={this.state.password}
                    onChangeText={ (password) => this.setState({ password }) }
                	/>
 				<View style={{borderBottomWidth: 0.5, borderColor: 'red'}}>
        			<SegmentedControls
        			  tint= {'#87cefa'}
        			  selectedTint= {'white'}
        			  backTint= {'#fff'}
        			  optionStyle= {{
        			    fontSize: 12,
        			    fontWeight: 'bold',
        			    fontFamily: 'Snell Roundhand'
        			  }}
        			  containerStyle= {{
        			    marginLeft: 10,
        			    marginRight: 10,
        			  }}
        			  options={ options }
        			  onSelection={ this.setSelectedOption.bind(this) }
        			  selectedOption={ this.state.gender }
        			  extractText={ (option) => option.label }
        			  testOptionEqual={ (a, b) => {
        			    if (!a || !b) {
        			      return false;
        			    }
        			    return a.label === b.label
        			  }}
        			/>
        			<Text></Text>
     			</View>
				
				<View style ={commonStyles.iconusername}>
						
						<TextInput
							style={commonStyles.inputusername}
							value={this.state.contact}
							underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Contact"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(contact) => this.setState({contact})}
						/>
					</View>

					<View style={{
        					backgroundColor: 'white',
        					alignSelf: 'stretch',
        					margin: 20,
        					}}>						
						<Picker
            				selectedValue={this.state.country}
            				onValueChange={(country) => this.setState({country})}
            				mode="modal"
            				style={{
            				  alignSelf: 'stretch',
            				  color: 'black',
            				}}>
				            <Picker.Item label="Select Country" value="" />
				            <Picker.Item label="India" value="1" />
				            <Picker.Item label="United States" value="2" />
				            <Picker.Item label="United Kingdom" value="3" />
         				</Picker>
					</View>
					<View style ={commonStyles.iconusername}>
		
						<TextInput
							style={[commonStyles.inputusername, { borderTopWidth:0.5, borderColor : "red"}]}
							value={this.state.address}
							underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Address"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(address) => this.setState({address})}
						/>
					</View>

				</View>
				<Button
					onPress = {this.onSubmit.bind(this)}
  					title="Create Acount"
  					color="orange"
  					/>
			</ScrollView>
		);
	}

	onSubmit() {
		const {fullname, email, password, gender, contact, country, os, address } = this.state;
		this.setState({...INITIAL_STATE, loading: true});

	let formData = new FormData();
	formData.append('fullname', String(Ebiztrait));
	formData.append('email', String(email));
	formData.append('password', String(password));
	formData.append('gender', String(gender.value));
	formData.append('country', String(country));
	formData.append('device_type', String(os));
	formData.append('device_token', Math.random().toString());
	formData.append('phone_no', String(contact)); 
	formData.append('address', String(address)); 
	formData.append('representative_name', String(os)); 
	formData.append('device_type', String(os)); 
	formData.append('facebook_id', String(os)); 
	formData.append('twitter_id', String(os)); 
	formData.append('instagram_id', String(os)); 
	formData.append('snapchat_id', String(os)); 
	formData.append('card_number', String(os)); 
	formData.append('expiry_month', String(os)); 
	formData.append('expiry_year', String(os)); 
	formData.append('cvv', String(os)); 


	console.warn(JSON.stringify(formData));
		// console.warn(this.state.os);
	
	const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
	
	fetch("http://solutiontrackers.com/dev-a/zerototwo/index.php/Webservice/register", config) 
    .then((response) => response.json()) 
    .then((responseData) => {
    		console.warn(JSON.stringify(responseData.response));

    	 // if (responseData.response.status) { 
    	 	// routes.homePage();
         // } else {
            // MessageBarManager.showAlert({
            // message: "invalid username and password",
            // alertType: 'error',
            // })
    	// }
    }) 
    .catch(err => { 
    	console.log(err); 
    }) 
    .done();

	}
}

export default Register;