import React, {Component, PropTypes} from "react";
import {View, Text, TextInput, TouchableOpacity, Button} from "react-native";
import {Loader} from "app/common/components";
import commonStyles from "app/common/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';




const INITIAL_STATE = {username: '', password: ''};

class Login extends Component {
	// static propTypes = {
	// 	errorStatus: PropTypes.string.isRequired,
	// 	login: PropTypes.func.isRequired
	// };

	constructor() {
		super();
		this.state = {...INITIAL_STATE};
	}

	render() {
		const {errorStatus, loading} = this.props;
		return (
			<View style={[commonStyles.container, commonStyles.content]} testID="Login">
				<View style ={commonStyles.inputcontent}>
					<View style ={commonStyles.iconusername}>
						<Ionicons name="ios-mail-outline" 
						size={30} 
						color="#900"
						style= {{ padding: 10}}
						/>
						<TextInput
							style={commonStyles.inputusername}
							value={this.state.username}
							underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Email Address"
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(username) => this.setState({username})}
						/>
					</View>
					<View style ={commonStyles.iconpassword}>
						<Ionicons name="ios-lock-outline" 
						size={30} 
						color="#900"
						style= {{ padding: 10}}
						/>
						
						<TextInput
							style={commonStyles.inputpassword}
							value={this.state.password}
							 underlineColorAndroid = 'transparent'
							autoCorrect={false}
							placeholder="Password"
							secureTextEntry
							maxLength={140}
							onSubmitEditing={() => this.onSubmit()}
							onChangeText={(password) => this.setState({password})}
						/>
					</View>
				</View>
				<Button
  					onPress={() => this.onSubmit()}
  					title="Login"
  					color="#87cefa"
  					/>


				{errorStatus ? <Text style={commonStyles.errorText}>{errorStatus}</Text> : undefined}
				{loading ? <Loader/> : undefined}

				<TouchableOpacity style={{ backgroundColor: '#fff', alignItems: 'center', padding : 20 }}>
				<Text>Forgot password</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ backgroundColor: '#fff', alignItems: 'center', padding : 20 }}>
				<Text style={{color : '#87cefa'}}>New Customer ?</Text>
				</TouchableOpacity>


				<Button
					onPress = {this.createAcount()}
  					title="Create An Acount"
  					color="orange"
  					/>
			</View>
		);
	}
	createAcount () {

	}

	onSubmit() {
		const {username, password} = this.state;
		this.setState({...INITIAL_STATE, loading: true});
		this.props.login(username, password);
	}
}

export default Login;