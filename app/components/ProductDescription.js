import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-swiper';
import { BubblesLoader } from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import {Button} from "app/common/components";
import Utils from 'app/common/Utils';

const { width } = Dimensions.get('window')
const loading = require('../images/loading.gif')

const Slide = props => { 
    return ( 
        <View style={styles.slide}>
            <Image onLoad={props.loadHandle.bind(null, props.i)}  
            style={styles.image} 
            source={{uri: props.uri}} />
            {
              !props.loaded && <View style={styles.loadingView}> 
              <BubblesLoader 
                color= {'#6a5acd'} 
                size={40} 
                dotRadius={10} />
            </View>
        }
        </View>
    )
}

export default class ProductDescription extends Component {
    constructor (props) { 
        super(props); 
        this.state = { 
            imgList : [] ,
            data : [],
            loadQueue: [0, 0, 0, 0],
            count : 0 
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
        
        fetch(Utils.gurl()+"/productDetailView", config) 
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
        let color = this.state.data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = this.state.data.special_price ? 'line-through' : 'none';
        let colorOffer = this.state.data.special_price ? 'orange' : '#fff'; 

        return ( 
            <ScrollView contentContainerStyle={[{flex: 1}]}>
                <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={false}>
                  {
                    this.state.imgList.map((item, i) => <Slide
                      loadHandle={this.loadHandle}
                      loaded={!!this.state.loadQueue[i]}
                      uri={item}
                      i={i}
                      key={i} />)
                  }
                </Swiper>
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
                        <TouchableOpacity  style={styles.qtybutton}> 
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtybutton}>{this.state.count}</Text>
                        <TouchableOpacity  style={styles.qtybutton}> 
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = {
    contentContainer: { 
    },
    wrapper: {

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
