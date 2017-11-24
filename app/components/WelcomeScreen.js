import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Utils from 'app/common/Utils';

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
            console.warn(JSON.stringify(responseData.response));

            this.setState({
                userTypes: responseData.response.data,
                 loaded: true
        });
        }).done();
    }

    renderLoadingView() {
        return (
            <ActivityIndicator  
            style={[styles.centering]} //styles.gray]}
            color="#1e90ff" 
            size="large"/>
            );
    }

    loadUserTypes() {
        return this.state.userTypes.map(user => ( 
            <Picker.Item label={user.country_name} value={user.country_id} /> 
        ))
    }

  render() {
    if (!this.state.loaded) {
            return this.renderLoadingView();
        }
    return (
      <View style={styles.container}>
        <Picker
      selectedValue={this.state.selectedUserType}
      onValueChange={(itemValue, itemIndex) => 
          this.setState({selectedUserType: itemValue})}>

      {this.loadUserTypes()}
    </Picker>
    <Picker
      selectedValue={this.state.selectedUserType}
      onValueChange={(itemValue, itemIndex) => 
          this.setState({selectedUserType: itemValue})}>

    </Picker>
     <Text>{this.state.selectedUserType}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
        padding: 30

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
