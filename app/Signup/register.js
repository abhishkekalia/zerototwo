import React, {Component, PropTypes} from "react";
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	Button, 
	Switch,
	ScrollView,
	Platform,
	Picker,
	Dimensions
} from "react-native";
import {Loader} from "app/common/components";
import commonStyles from "app/common/styles";
import {Actions as routes} from "react-native-router-flux";

import Icon from 'react-native-vector-icons/Ionicons';
import PasswordInputText from 'react-native-hide-show-password-input';
import { SegmentedControls } from 'react-native-radio-buttons';
import Utils from 'app/common/Utils'
const { width, height } = Dimensions.get('window')

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
            userTypes: [], 
            selectCountry: '',
			fullname: '', 
			email: '', 
			password: '',
			gender : '',
			contact: '', 
			country: '',
			address: '',
			gender : '',
			hidden : true,
			os : (Platform.OS === 'ios') ? 2 : 1,
		};
	}
	componentDidMount(){
        this.fetchData();
    }
    eye() {
    	this.setState({
    		hidden : !this.state.hidden
    	})

    }
    fetchData(){
        fetch(Utils.gurl('countryList'),{
             method: "GET", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
        })
        .then((response) => response.json())
        .then((responseData) => { 
                    // console.warn(JSON.stringify(responseData))
            this.setState({
                userTypes: responseData.response.data,
                 loaded: true
        });
        }).done();
    }

	toggleSwitch() { 
	 	this.setState({ showPassword: !this.state.showPassword }); 
	 }
	 setSelectedOption(option){
     	this.setState({
        	gender: option,
      	});
    }
    loadUserTypes() {
        return this.state.userTypes.map(user => ( 
            <Picker.Item key={user.country_id} label={user.country_name} value={user.country_id} /> 
        ))
    } 

	render() {
		        let icon = this.state.hidden ? 'md-eye-off' :'md-eye';
		        // let icon = this.state.hidden ? 'ios-eye' : 'ios-eye-off';

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
					<View style ={[commonStyles.iconusername, { alignItems: 'center'}]}>
						
						<TextInput
							style={commonStyles.inputpassword}
                           	secureTextEntry={this.state.hidden}
                           	value={this.state.password}
							underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Password"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
                    		onChangeText={ (password) => this.setState({ password }) }
						/>
						<Icon name={icon} size={25} color="#000" onPress={()=> this.eye() }/>

					</View>

 				<View style={{borderBottomWidth: 0.5, borderColor: 'red'}}>
 				        			<Text/>

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
        			<Text/>
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
        					// margin: 20,
        					}}>						
						<Picker style={{width: width/1.5, height: 40, backgroundColor: '#fff'}}
                            mode="dropdown"
                            selectedValue={this.state.selectCountry}
                            onValueChange={(itemValue, itemIndex) => 
                                this.setState({selectCountry: itemValue})}>
                                
                                <Picker.Item label="Select country" value="" /> 
                               {this.loadUserTypes()}
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
		formData.append('fullname', String(fullname));
		formData.append('email', String(email));
		formData.append('password', String(password));
		formData.append('gender', String(gender.value));
		formData.append('country', String(country));
		formData.append('user_type', String(3));
		formData.append('device_type', String(os));
		formData.append('device_token', String(Math.random().toString()));
		formData.append('phone_no', String(contact)); 
		formData.append('address', String(address)); 
		formData.append('representative_name', String('Ankita')); 
		formData.append('facebook_id', String('sdfs')); 
		formData.append('twitter_id', String('fsdfsd')); 
		formData.append('instagram_id', String('sdfsdf')); 
		formData.append('snapchat_id', String('dfdsf')); 
		formData.append('card_number', String('343454645664')); 
		formData.append('expiry_month', String('3')); 
		formData.append('expiry_year', String('20')); 
		formData.append('cvv', String('456')); 


	// console.warn(JSON.stringify(formData));
		// console.warn(this.state.os);
	
	const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
	
	fetch(Utils.gurl('register'), config) 
    .then((response) => response.json()) 
    .then((responseData) => {

    	routes.loginPage()
    		// console.warn(JSON.stringify(responseData.response));

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
