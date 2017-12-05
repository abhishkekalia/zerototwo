import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Swiper from 'react-native-swiper';
import { BubblesLoader } from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import {Button} from "app/common/components";
import Utils from 'app/common/Utils';
import Slider from './slider'
import DatePicker from 'react-native-datepicker';
import AllItem from './AllItem';

const {width,height} = Dimensions.get('window');

export default class ProductDescription extends Component {
    constructor (props) { 
        super(props); 
        this.state = { 
            imgList : [] ,
            data : [],
            count : 1,
            date_in: new Date(), 
            date_out:new Date(),
            address : '' 
        }
        this.loadHandle = this.loadHandle.bind(this)
    }

    loadHandle (i) { 
        let loadQueue = this.state.loadQueue 
        loadQueue[i] = 1
        this.setState({ 
            loadQueue 
        })
    }
    componentDidMount(){
        this.fetchData()
    }
    async openAndroidDatePicker() { 
        try { 
            const {action, year, month, day} = await DatePickerAndroid.open({ 
                date: new Date() 
            }); 
        } catch ({code, message}) { 
            console.warn('Cannot open date picker', message); 
        }
    }

    fetchData(){ 
        let formData = new FormData();
        formData.append('u_id', String(4));
        formData.append('country', String(1)); 
        formData.append('product_id', String(9)); 

        const config = { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'multipart/form-data;',
            },
            body: formData,
        }
        
        fetch(Utils.murl('productDetailView'), config) 
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({ 
                imgList: responseData.data.productImages,
                data : responseData.data
        });
        })
        .done();
    }

    sizechart(){
        console.warn("size chart");
    }
    onSubmit () {

    }
    
    render () { 
        const { date_in, count } = this.state;
        let color = this.state.data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = this.state.data.special_price ? 'line-through' : 'none';
        let colorOffer = this.state.data.special_price ? 'orange' : '#fff'; 
        if(count <= 0) { console.warn(count); }
        return ( 
            <ScrollView 
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View style={{ height : height/1.5}}>
                <Slider imgList={this.state.imgList}/>
                </View>

                <View style={{ 
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between'}}>

                    <View>
                        <Text style={{ padding : 10}}>{this.state.data.product_name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color : 'skyblue', paddingLeft : 10}}>AED {this.state.data.special_price}</Text>
                            <Text style={{color: color, textDecorationLine: textDecorationLine, left : 20}}>AED {this.state.data.price}</Text>
                            <Text style={{color: colorOffer, left : 30}}>({this.state.data.discount} %OFF )</Text>
                        </View>
                        <View style={{ flexDirection : 'row'}}>
                            <TouchableOpacity style={styles.button}>
                            <Text>Buy It Now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCart}>
                            <Text>Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={{flexDirection : 'row'}}>
                            <Ionicons name="select-all" size={25} color="orange"/><Text style={{color: 'skyblue'}}>Select Size</Text></TouchableOpacity>
                            <Text style={{color: 'red'}} onPress={this.sizechart}>Size Chart</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
    
                            <Button onPress={() => this.onSubmit()} testID="LoginButton">
                            7-8 Y
                            </Button>
                            <Button onPress={() => this.onSubmit()} testID="LoginButton">
                            8-9 Y
                            </Button>
                            <Button onPress={() => this.onSubmit()} testID="LoginButton">
                            9-10 Y
                            </Button>
                            <Button onPress={() => this.onSubmit()} testID="LoginButton">
                            10-11 Y
                            </Button>
                            <Button onPress={() => this.onSubmit()} testID="LoginButton">
                            11-12 Y
                            </Button>
                        </View>

                        <View style={{
                            flexDirection: 'row', 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }}>
                        <TouchableOpacity  style={styles.qtybutton} onPress={()=> this.setState({count: count-1})}> 
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtybutton}>{count}</Text>
                        <TouchableOpacity  style={styles.qtybutton} onPress={()=> this.setState({count: count+1})}> 
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                        </View>
                    <View style= {{ flexDirection :"row", justifyContent: "space-between", padding : 5}}>
                        <Ionicons name ="date-range" size={25} style={{ padding :5}} color="#87cefa"/>
                        <DatePicker
                            style ={{ width : width-50}}
                            date={this.state.date_in}
                            mode="date"
                            placeholder="hello"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate={date_in}
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    width : width, 
                                    borderWidth : 0.5, 
                                    borderColor: "#ccc", 
                                    alignItems : 'flex-start',
                                },
                            }}
                        onDateChange={(date_in) => {this.setState({date_in: date_in});}}/>
                        </View>
                        
                        <View style= {{ flexDirection :"row", justifyContent: "space-between", padding : 5}}>
                            <Ionicons name ="place" size={25} style={{ padding :5}} color="#87cefa"/>
                            <TextInput style={{ height: 40 ,  width : width-50 ,borderWidth : 0.5, borderColor: "#ccc"}}
                                placeholder="Delivery Address"
                                underlineColorAndroid = 'transparent'
                                value={this.state.address} />
                        </View>
                        <View style={{ borderColor :"#ccc", borderWidth:0.5, paddingLeft : 20, paddingRight:20}}>
                            <Text style={{ height : 40 }}> Product info & care</Text>
                            <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                            </Text>
                            <View style={{ flexDirection: 'column', paddingTop : 10}}>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Fabric</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Length</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Sleeves</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Neck</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Fit</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Wash</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Color</Text><Text>Cotton</Text>
                                </View>
                                <View style={{ flexDirection: 'row'}}>
                                <Text style={ styles.description}>Sku</Text><Text>Cotton</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{padding:10}}>more Product by ZeroToTwo</Text>
                        <AllItem/>
                    </View>
                    
                </View>
            </ScrollView>
        )
    }
}
const styles = {
    contentContainer: { 
    },
    description: {
width : width/3
    },
    qtybutton: {
        width : 40,
        height : 40,
        padding: 10,
        alignItems: 'center',
        borderWidth : 1,
        borderColor : "#87cefa",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // shadowOffset:{width:2,height:4}
    },
    text: {
        color: '#000',
        fontSize: 12
    },

    
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    image: {
      width,
      flex: 1,
      backgroundColor: 'transparent'
    },
    
    loadingView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.5)'
    },
    
    loadingImage: {
        width: 60,
        height: 60
    },
    button: {
        width: width/2,
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'orange',
        alignItems: 'center',
    },

    buttonCart: {
        width: width/2,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#87cefa',
        alignItems: 'center',
    }
}
