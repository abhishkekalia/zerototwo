import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Dimensions, 
  Button ,
  Platform,
  StyleSheet
} from "react-native";
const { width, height } = Dimensions.get('window')

export default class Contact extends Component<{}> {
    constructor(props) {
        super(props);        
        this.state={ 
            name: '', 
            email: '', 
            issue: '', 
            message: '', 
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
              style={styles.input}
              value={this.state.name}
              underlineColorAndroid = 'transparent'
              autoCorrect={false}
              placeholder="Name"
              maxLength={140}
              onSubmitEditing={() => this.onSubmit()}
              onChangeText={(name) => this.setState({name})}
            />
            <TextInput
              style={styles.input}
              value={this.state.email}
              underlineColorAndroid = 'transparent'
              autoCorrect={false}
              placeholder="Email Address"
              maxLength={140}
              onSubmitEditing={() => this.onSubmit()}
              onChangeText={(email) => this.setState({email})}
            />
            <TextInput
              style={styles.input}
              value={this.state.issue}
              underlineColorAndroid = 'transparent'
              autoCorrect={false}
              placeholder="issue"
              maxLength={140}
              onSubmitEditing={() => this.onSubmit()}
              onChangeText={(issue) => this.setState({issue})}
            />
            <TextInput
              style={styles.input}
              value={this.state.message}
              underlineColorAndroid = 'transparent'
              autoCorrect={false}
              placeholder="Message"
              maxLength={140}
              onSubmitEditing={() => this.onSubmit()}
              onChangeText={(message) => this.setState({message})}
            />
            <Button title="Send Request" onPress={()=> console.warn('hello')}/>
            <Text>Customer Service</Text>
            <Text>Contact Us</Text>
            <Text>Contact Us</Text>
            <Text>Contact Us</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    borderWidth : 1,
    borderColor : "#ccc",
    width : width,
    height : 40,
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
