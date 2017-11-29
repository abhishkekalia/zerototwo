import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window')

export default class Timeline extends Component{
    constructor(props) {
        super(props); 
        this.state = {

        };
    }  
    
    render() {
        console.warn(this.props.uri)
            setTimeout(()=>{
                Actions.pop()
                // console.warn('done');
                // this.setState({timePassed: true})
            }, 10000);
        return (
      <View style={styles.container}>
            <Image
          style={{width: width, height: 250}}
          source={{uri: this.props.uri}}
        />
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
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
