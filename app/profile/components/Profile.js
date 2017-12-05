import React, {Component, PropTypes} from "react";
import {View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Actions} from "react-native-router-flux";

import Entypo from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utils from 'app/common/Utils';

const u_id = '2';
const country = '1';
const address_type = '1';

class Profile extends Component {
	constructor(props) {
        super(props);        
        this.state={
        	data: ''
        };
    }

    componentDidMount(){
    	this.getAddress();
    }

    getAddress(){
    	let formData = new FormData();
    	formData.append('u_id', String(u_id));
    	formData.append('country', String(country)); 
    		const config = { 
               	method: 'POST', 
               	headers: { 
               		'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;' 
                },
            	body: formData,
            }
        fetch(Utils.murl('getmyaddress'), config)  
        .then((response) => response.json())
        .then((responseData) => { 
            this.setState({ 
            	data: responseData.data,
            });
        })
        .done();
    }

	render() {
		const {identity, logout} = this.props;
		const {data} = this.state;
		return (
			<View style={{flex: 1, flexDirection: 'column'}} testID="Profile">
				<View style={[styles.content, {flexDirection : 'row', justifyContent: 'space-between' ,padding : 0}]}>
					<View style={{ flexDirection : 'row', }}>
						<View style={{ width :60, height:60, justifyContent: 'center', alignItems : 'center'}}>
							<Entypo 
							name="user" 
							size={25} 
							style={{ 
								padding :5, 
								// borderColor: '#000',
								width: 30,
								height :30,
								backgroundColor : '#ccc',
								alignItems : 'center', 
								borderRadius : 30 ,
								// borderWidth:1
							}}/>
						</View>

						<View style={{flexDirection : 'column'}}>
							<Text style={[styles.label, { color : '#ccc'}]}>{identity.username}</Text>
							<Text style={[styles.label, { color : '#ccc'}]}>abhishek.ebiztrait@gmail.com</Text>
							<Text style={[styles.label, { color : '#ff6347'}]}>Contact: {identity.username}</Text>
						</View>
					</View>

					<TouchableOpacity style={{width :60, height:60, justifyContent: 'center', alignItems : 'center' }} onPress={()=> Actions.newaddress()} >
						<Entypo name="edit" size={25} color="#87cefa"/>
					</TouchableOpacity >
				</View>
				
				<View style={[styles.content, {flexDirection : 'row', justifyContent: 'space-between' ,padding : 0}]}>

					<View style={{ padding : 20}}>
					<View style={{ flexDirection : 'row', justifyContent: 'space-between', paddingRight:10, paddingLeft:10, backgroundColor:'#ccc' }}>
						<Text style={{ fontSize : 10}}>My Address Book</Text>
							<TouchableOpacity style={{ justifyContent: 'center', alignItems : 'center' }} onPress={()=>Actions.addressbook()} >
								<Ionicons name="ios-arrow-forward" size={25} color="#87cefa"/>
							</TouchableOpacity >
					</View>
					
					<Text style={{ fontSize: 15}}>
					{data.full_name}
					</Text>
					<Text style={{ fontSize : 10}}>
					M:{data.mobile_number}
					</Text>
					<Text style={{fontSize:12}}>
					{[data.address_line1, ' ', data.address_line2, ' ', data.landmark ,' ', data.town,' ',data.city, ' ', data.state, '(', data.pincode, ')']}
					</Text>
				</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
        flexDirection: 'row',
        flexWrap: 'wrap'
	},
	content: {
		borderWidth : 1,
		borderColor :'#ccc',
	},
	label: {
		color: '#ccc',
		fontSize: 12,
		fontStyle: 'italic'
	}
});
export default Profile;