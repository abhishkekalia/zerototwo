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
import Utils from 'app/common/Utils';
import GetMarketing from './GetMarketingad';
import ModalPicker from './modalpicker';
import AllItem from './AllItem';


const { width } = Dimensions.get('window')
let index = 0;

const data =   [
        {
            "u_id": "2",
            "email": "ankitagol.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-10-24 04:40:40"
        },
        {
            "u_id": "4",
            "email": "chirag.ebiztrait@gmail.com",
            "ShopName": "Chirag",
            "representative_name": "",
            "ur_id": "3",
            "gender": "male",
            "mobile": "7485963214",
            "country_id": "1",
            "address": "Ahmedabad",
            "created_on": "2017-10-24 17:09:31"
        },
        {
            "u_id": "6",
            "email": "copper@gmail.com",
            "ShopName": "Copper Store",
            "representative_name": "John Mash",
            "ur_id": "3",
            "gender": "male",
            "mobile": "7485963214",
            "country_id": "1",
            "address": "Ahmedabad",
            "created_on": "2017-10-24 11:40:28"
        },
        {
            "u_id": "8",
            "email": "divya.ebiztrait@gmail.com",
            "ShopName": "qa",
            "representative_name": "ebizqa103",
            "ur_id": "3",
            "gender": "male",
            "mobile": "4561278932",
            "country_id": "4",
            "address": "sxhsjhbjgkfcbk",
            "created_on": "2017-10-31 00:58:28"
        },
        {
            "u_id": "13",
            "email": "deval.ebiztrait@gmail.com",
            "ShopName": "Mark Bond",
            "representative_name": "Joe Smith",
            "ur_id": "3",
            "gender": "male",
            "mobile": "12345678",
            "country_id": "5",
            "address": "Shuwaikh",
            "created_on": "2017-11-17 07:08:59"
        },
        {
            "u_id": "14",
            "email": "deval.ebiztrait+1@gmail.com",
            "ShopName": "Mark Bond",
            "representative_name": "Joe Smith",
            "ur_id": "3",
            "gender": "male",
            "mobile": "12345678",
            "country_id": "5",
            "address": "Shuwaikh",
            "created_on": "2017-fetchData11-17 07:10:38"
        },
        {
            "u_id": "15",
            "email": "deval.ebiztrait+2@gmail.com",
            "ShopName": "Mark Smith",
            "representative_name": "Joe Smith",
            "ur_id": "3",
            "gender": "male",
            "mobile": "12345678",
            "country_id": "5",
            "address": "Shuwaikh",
            "created_on": "2017-11-17 07:13:17"
        },
        {
            "u_id": "18",
            "email": "aiyub.ebiztrait@gmail.com",
            "ShopName": "Laurel Lynch",
            "representative_name": "Max Lynch",
            "ur_id": "3",
            "gender": "male",
            "mobile": "21364578",
            "country_id": "5",
            "address": "B52 Kuwait Shopping Centre, Opp. Al Kaiyub Sports Academy",
            "created_on": "2017-11-23 02:20:31"
        },
        {
            "u_id": "19",
            "email": "ankitago.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-11-23 06:56:49"
        },
        {
            "u_id": "20",
            "email": "ankitago2.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-11-23 06:59:12"
        },
        {
            "u_id": "21",
            "email": "ankitago9.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-11-23 07:00:07"
        },
        {
            "u_id": "22",
            "email": "ankitago6.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-11-23 07:00:47"
        },
        {
            "u_id": "23",
            "email": "ankitago62.ebiztrait@gmail.com",
            "ShopName": "Ebiztrait",
            "representative_name": "Ankita Gol",
            "ur_id": "3",
            "gender": "female",
            "mobile": "1234567891",
            "country_id": "1",
            "address": "ahmedabad",
            "created_on": "2017-11-23 07:01:06"
        }
    ];


export default class MainView extends Component {
    constructor(props) {
        super(props); 
        this.fetchAllShop = this.fetchAllShop.bind(this);       
        this.state={ 
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }), 
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }), 
            textInputValue: '',
            data : []

        }
    }

    componentDidMount(){
        this.fetchData()
        this.fetchAllShop()
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

            fetch(Utils.gurl()+"/listOfAllShop", config) 

        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            data: responseData.data
        });
        }).done();
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

        fetch(Utils.gurl()+"/productListView", config) 
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                refreshing : false
        });
        }).done();
    }
    picker (){
        
    }

    render() {
        console.warn(JSON.stringify(this.state.data))

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
            showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection : 'row', backgroundColor : '#ccc'}}>
           <View style={styles.button,[{ width : width/2,justifyContent : "space-between", backgroundColor : '#fff'}]}> 
                <ModalPicker
                    data={this.state.data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ this.setState({textInputValue:option.ShopName})}}>
                    <TextInput
                        editable={false}
                        placeholder="All Shop"
                        underlineColorAndroid = 'transparent'
                        value={this.state.textInputValue} />
                        
                </ModalPicker>
            </View>

                    <TouchableOpacity style={styles.button}>
                    <Text>All Service</Text>
                    </TouchableOpacity>
                </View>
                <GetMarketing/>
                <Text>Featured Item</Text>
                {listView}
                <Text>All Item</Text>
                <AllItem/>
            </ScrollView>
        );
    }

    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        let color = data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = data.special_price ? 'line-through' : 'none';
        
        return (
            <TouchableOpacity style={styles.row} onPress={Actions.deascriptionPage}> 
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
                        top : 45,
                        left: 0,
                        backgroundColor: '#87cefa'}}/>
                <Text style={styles.name}>{data.product_name}</Text>
                <Text style={styles.description}>{data.short_description}</Text>
                <View style={{
                    flex: 0, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',}}> 
                    <Text style={styles.special_price}>{data.special_price}Aed</Text>
                    <Text style={{fontSize:10, color: color, textDecorationLine: textDecorationLine}}>{data.price}Aed</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles =StyleSheet.create({
    list: {
        borderWidth: 1, 
        borderColor: '#CCC',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    name : {
        fontSize : 10
    },
    description : {
        fontSize : 7
    },
    special_price : {
        fontSize : 10,
        fontWeight : 'bold'
    },

    row: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

        padding: 5,
        margin: 3,
        borderWidth: 1,
        borderColor: '#CCC'
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
        width: 60,
        height: 60
    },

    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
     contentContainer: {  }
});