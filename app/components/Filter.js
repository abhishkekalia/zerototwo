import React, { Component } from 'react'
import { 
    Modal, 
    Text, 
    Dimensions,
    TouchableHighlight,
    StyleSheet, 
    View,
    Button ,
    TextInput
} from 'react-native';
import SelectMultiple from './src/SelectMultiple';
import { Actions } from 'react-native-router-flux'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Utils from 'app/common/Utils';

const { width } = Dimensions.get('window')

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: true, 
            selected: [],
            button : false,
            search : '',
            category : []
        }
    } 
    setModalVisible(visible) { 
        this.setState({modalVisible: visible}); 
    }
    onSelectionsChange = (selected) => {
    this.setState({ selected })
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){ 
        let formData = new FormData();
        formData.append('u_id', String(1));
        formData.append('country', String(1)); 

    const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
    fetch(Utils.gurl('getFilterMenu'), config) 
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                category:responseData.data.category,
        });
        }).done();
    }


    render() {
        let border = this.state.button ? 1 : undefined;
        let borderleft = this.state.button ? 2 : 5;
        let bcolor = this.state.button ? "#ccc" : "orange";
        let bgColor = this.state.button ? "#ccc" : "#87cefa"
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{ 
                        width: width/3, 
                        borderColor : "#ccc", 
                        borderWidth : 0.5}} >
                        <TouchableHighlight 
                        underlayColor ={"#fff"} 
                        style={[ 
                            styles.category, { 
                                borderWidth: border, 
                                borderLeftWidth : borderleft ,
                                borderColor : bcolor, 
                            }]} onPress={() => this.setState({
                            button : !this.state.button
                        })} >
                        <Text style={{color : bgColor}}>Category</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex : 1, padding : 10}}>
                        <TextInput
                        style={{height: 40, borderWidth : 0.5, borderColor : '#ccc',borderRadius : 10}}
                        placeholder="Search by Category"
                        underlineColorAndroid = 'transparent'
                        onChangeText={(search) => this.setState({search})}/>
                        <SelectMultiple
                        items={this.state.category}
                        selectedItems={this.state.selected}
                        onSelectionsChange={this.onSelectionsChange} />
                    </View>
                </View>
                <View style={{padding : 10}}>
                    <TouchableHighlight 
                    underlayColor ={"#fff"} 
                    style={[styles.apply]} 
                    onPress={()=>Actions.filterdBy({ filterdBy : this.state.selected})}>
                        <MaterialIcons name="done" size={20} color="#fff"/>
                    </TouchableHighlight>
                </View>       
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    category: {
        padding : 10,
     },
     apply : {
        backgroundColor : "orange",
        alignItems : 'center',
        padding : 10
     }
})