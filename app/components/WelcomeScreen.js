import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  ActivityIndicator,
  Dimensions,
  Image
} from 'react-native';
import {Actions} from "react-native-router-flux";

import { Dropdown } from 'react-native-material-dropdown';
import Utils from 'app/common/Utils';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window')

export default class WelcomeScreen extends Component {
    constructor(props) { 
        super(props); 
        this.fetchData=this.fetchData.bind(this);
        this.state = { 
            userTypes: '', 
            selectedUserType: '',
            animating: true, 
            refreshing: false,
            loaded: false,
            deliveryarea : ''
        }
    }

    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        const { container_id, type} = this.state; 
        fetch(Utils.gurl()+'/countryList',{
             method: "GET", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
        })
        .then((response) => response.json())
        .then((responseData) => { 
            this.setState({
                userTypes: responseData.response.data,
                 loaded: true
        });
        }).done();
    }

    renderLoadingView() {
        return (
            <ActivityIndicator  
            style={[styles.centering]} 
            color="#1e90ff" 
            size="large"/>
            );
    }

    loadUserTypes() {
        return this.state.userTypes.map(user => ( 
            <Picker.Item label={user.country_name} value={user.country_id} /> 
        ))
    } 

    render(){ 
        const { deliveryarea, selectedUserType } = this.state
        if (deliveryarea.length && deliveryarea.length) { 
            Actions.loginPage();
        }
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return ( 
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={styles.countryIcon} source={require('../images/_Select_Country-128.png')} />
        
                            <Picker style={{width: width/1.3, height: 40}}
                            mode="dropdown"
                            selectedValue={this.state.selectedUserType}
                            onValueChange={(itemValue, itemIndex) => 
                              this.setState({selectedUserType: itemValue})}>
                              <Picker.Item label="Select country" value="" /> 
 
                              {this.loadUserTypes()}
                            </Picker>
                        </View>
                        <View style={styles.row}>
                        <Ionicons 
                        name="truck-delivery" 
                        size={21} 
                        color="#ff8c00" 
                        style={styles.countryIcon}/>
        
                        <Picker 
                        mode="dropdown"
                        style={{width: width/1.3, height: 40}} 
                            selectedValue={this.state.deliveryarea} 
                            onValueChange={(deliveryarea) => this.setState({deliveryarea})}> 
                                <Picker.Item label="Select Delivery Area" value="" /> 
                                <Picker.Item label="Ahmedabad" value="1" /> 
                                <Picker.Item label="Gandhinagar" value="2" /> 
                    </Picker>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20
    }, 

    row: {
        flexDirection: 'row',
        borderWidth: 1, 
        borderColor: '#CCC',
        backgroundColor: '#F6F6F6',
        marginBottom : 10
    }, 

    countryIcon: {
        borderRightWidth: 1, 
        borderColor: '#CCC',
        width : 40,
        height:40,
        padding :10
    },
});
