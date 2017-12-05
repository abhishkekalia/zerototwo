import React, { Component ,PropTypes } from 'react';
import {
    ListView,
    TouchableOpacity,
    ScrollView, 
    StyleSheet,
    Dimensions, 
    Text, 
    View,
    TextInput,
    Image 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconBadge from 'react-native-icon-badge';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Utils from 'app/common/Utils';
import GetMarketing from './GetMarketingad';
import ModalPicker from './modalpicker';
import AllItem from './AllItem';


const { width, height } = Dimensions.get('window')
let index = 0;

export default class MainView extends Component {
    constructor(props) {
        super(props); 
        this.fetchAllShop = this.fetchAllShop.bind(this); 
        this.fetchData = this.fetchData.bind(this);       
      
        this.state={ 
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }), 
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }), 
            textInputValue: '',
            shoperId : '',
            data : []

        }
    }

    componentDidMount(){
        this.fetchData();
        this.fetchAllShop();
    }

    blur() {
        const {dataSource } = this.state;
        dataSource && dataSource.blur();
    }

    focus() {
        const {dataSource } = this.state;
        dataSource && dataSource.focus();
    }

    fetchAllShop(){
        let formData = new FormData();
        formData.append('u_id', String(2));
        formData.append('country', String(1)); 

    const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }

            fetch(Utils.murl('listOfAllShop'), config) 

        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            data: responseData.data
        });
        }).done();
    }


    fetchData(){ 
        let formData = new FormData();
        formData.append('u_id', String(2));
        formData.append('country', String(1));  

        const config = { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'multipart/form-data;',
            },
            body: formData,
        } 

        fetch(Utils.murl('productListView'), config) 
        .then((response) => response.json())
        .then((responseData) => {
                    // console.warn(JSON.stringify(responseData))

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                refreshing : false
        });
        }).done();
    }
    picker (){
        
    }

    render() {
        let listView = (<View></View>);
            listView = (
                <ListView
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                />
            );
        return (
            <ScrollView 
            contentContainerStyle={styles.contentContainer} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
                <View style={{ flexDirection : 'row'}}> 
                    <View style={ styles.button,[{ 
                        width : width/2, 
                        justifyContent : "space-around", 
                        backgroundColor : '#fff',
                        padding : 2}]}> 
                        <ModalPicker
                            data={this.state.data}
                            initValue="Select something yummy!"
                            onChange={(option)=>{ this.setState({ 
                                textInputValue:option.ShopName,
                                shoperId : option.u_id
                            })}}>

                            <View style={{ 
                                flex:1, 
                                justifyContent : "space-around", 
                                flexDirection: 'row', 
                                borderWidth : 0.5, 
                                borderColor: "#ccc", 
                                alignItems: 'center'}}>
                                
                                <TextInput style={{ width : 150,height: 40 }}
                                    editable={false}
                                    placeholder="All Shop"
                                    underlineColorAndroid = 'transparent'
                                    value={this.state.textInputValue} />
                                <Ionicons 
                                name="md-arrow-dropdown" 
                                size={20} 
                                color="#87cefa" 
                                />
                            </View>
                        </ModalPicker>
                    </View>
                    <View style={ styles.button,[{ 
                        width : width/2, 
                        justifyContent : "space-around", 
                        backgroundColor : '#fff', 
                        padding : 2}]}> 
                        <ModalPicker
                            data={this.state.data}
                            initValue="Select something yummy!"
                            onChange={(option)=>{ this.setState({ 
                                textInputValue:option.ShopName,
                                shoperId : option.u_id
                            })}}>

                            <View style={{ 
                                flex:1, 
                                justifyContent : "space-around", 
                                flexDirection: 'row', 
                                borderWidth : 0.5, 
                                borderColor: "#ccc", 
                                alignItems: 'center'}}>
                                
                                <TextInput style={{ width : 150,height: 40 }}
                                    editable={false}
                                    placeholder="All Service"
                                    underlineColorAndroid = 'transparent'
                                    value={this.state.textInputValue} />
                                <Ionicons 
                                name="md-arrow-dropdown" 
                                size={20} 
                                color="#87cefa" 
                                />
                            </View>
                        </ModalPicker>
                    </View>
                </View>
                <GetMarketing/>
                <Text>Featured Item</Text>
                {listView}
                <Text style={{}}>All Item</Text>
                <AllItem/>
            </ScrollView>
        );
    }

    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        let color = data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = data.special_price ? 'line-through' : 'none';
        
        return (
            <TouchableOpacity style={styles.row} onPress={Actions.deascriptionPage}> 
                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    <IconBadge
                        MainElement={ 
                            <Image style={styles.thumb} 
                                source={{ uri : data.productImage}}/>                        }
                        BadgeElement={
                          <Text style={{color:'#FFFFFF', fontSize: 10}}>{data.discount} %off</Text>
                        }
                        IconBadgeStyle={{
                            width:50,
                            height:16,
                            top : height/5-10,
                            left: 0,
                            backgroundColor: '#87cefa'}}/>
                            <EvilIcons style={ {left : width/3-40, position : 'absolute'}} name="heart" size={25} color="#87cefa"/>
                </View>

                <Text style={styles.name}>{data.product_name}</Text>
                <Text style={styles.description}>{data.short_description}</Text>
                <View style={{
                    flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    top : 5
                }}> 
                    <Text style={styles.special_price}>{data.special_price}Aed</Text>
                    <Text style={{fontSize:10, color: color, textDecorationLine: textDecorationLine}}>{data.price}Aed</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles =StyleSheet.create({
    list: {
        // borderWidth: 1, 
        // borderColor: '#CCC',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    name : {
        fontSize : 10,
        top : 5
    },
    description : {
        fontSize : 7,
        top : 5
    },
    special_price : {
        fontSize : 10,
        fontWeight : 'bold'
    },

    row: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width : width/3 -7,
        padding: 5,
        margin: 3,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius : 5
    },
    button: {
        width: width/2,
        marginBottom: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth : 0.5,
        borderColor : '#CCC'
    },

    thumb: {
        width: width/3-20,
        height: height/5,
        // position : "absolute"
    },

    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
     contentContainer: {  }
});