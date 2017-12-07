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
    AsyncStorage,
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
import CheckBox from 'app/common/CheckBox';

import Modal from 'react-native-modal';

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
            data : [],
            dataArray: [],
            rows: [],
            isModalVisible: false,
            isLoading: true
        }
    }

    componentDidMount(){
        this.fetchData();
        this.fetchAllShop();
        this.loadData();
    }
    modal = () => this.setState({ 
        isModalVisible: !this.state.isModalVisible 
    })


    blur() {
        const {dataSource } = this.state;
        dataSource && dataSource.blur();
    }

    focus() {
        const {dataSource } = this.state;
        dataSource && dataSource.focus();
    }
    loadData (){
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
        fetch(Utils.gurl('listOfAllShop'), config) 
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataArray: responseData.data,
            });
        })
        .done();
    }

    onClick(data) {
        // console.warn(JSON.stringify(this.state.dataArray))
        // console.warn(JSON.stringify(data.u_id))
        var newStateArray = this.state.rows.slice(); 
        newStateArray.push(data.u_id); 
        this.setState({
            rows: newStateArray
        });

        data.checked = !data.checked;
        let msg=data.checked? 'you checked ':'you unchecked '

        // this.toast.show(msg+data.name);
    }
    cancelFilter(){
        this.setState({
            rows:''
        })
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
        return views;

    }

    renderCheckBox(data) {
        var leftText = data.ShopName;
        var icon_name = data.icon_name;
        return (
            <CheckBox
                style={{flex: 1, padding: 5, borderTopWidth : 1, borderColor : '#ccc'}}
                onClick={()=>this.onClick(data)}
                isChecked={data.checked}
                leftText={leftText}
                icon_name={icon_name}
            />);
    }

    sharing(product_id){
        console.warn(product_id);
        // let formData = new FormData();
        // formData.append('u_id', String(4));
        // formData.append('country', String(1)); 
        // formData.append('product_id', String(product_id)); 
        // const config = { 
                // method: 'POST', 
                // headers: { 
                    // 'Accept': 'application/json', 
                    // 'Content-Type': 'multipart/form-data;',
                // },
                // body: formData,
            // }
        // fetch(Utils.gurl('addToWishlist'), config) 
        // .then((response) => response.json())
        // .then((responseData) => {
            // alert(responseData.data.message);
            // this.setState({
            // data: responseData.data
        // });
        // }).done();
    }

    addtoWishlist(product_id){
        console.warn(product_id);
        let formData = new FormData();
        formData.append('u_id', String(4));
        formData.append('country', String(1)); 
        formData.append('product_id', String(product_id)); 
        const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
        fetch(Utils.gurl('addToWishlist'), config) 
        .then((response) => response.json())
        .then((responseData) => {
            alert(responseData.data.message);
        //     this.setState({
        //     data: responseData.data
        // });
        }).done();
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

            fetch(Utils.gurl('listOfAllShop'), config) 

        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
            data: responseData.data
        });
        }).done();
    }


    fetchData(){ 
        let formData = new FormData();
        formData.append('u_id', String(4));
        formData.append('country', String(1));  

        const config = { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'multipart/form-data;',
            },
            body: formData,
        } 

        fetch(Utils.gurl('productListView'), config) 
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

    // if (this.state.isLoading) {
      // return <View><Text>Loading...</Text></View>;
    // }                    // {this.state.myKey}

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
                        
                        <TouchableOpacity onPress={this.modal} style={styles.allshop}> 
                            <Text>All Shop</Text>
                            <Ionicons 
                            name="md-arrow-dropdown" 
                            size={20} 
                            color="#87cefa" 
                            />
                        </TouchableOpacity>
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
                <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
                 <View style={{ flexDirection : 'row', justifyContent : 'space-around'}}>
                <TouchableOpacity 
                underlayColor ={"#fff"} 
                style={[styles.footer]} 
                onPress={()=>this.modal()}>
                <Text>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                underlayColor ={"#fff"} 
                style={[styles.footer]} 
                onPress={()=> this.modal()}>
                <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
                </View>
            </Modal>
            </ScrollView>
        );
    }

    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        let color = data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = data.special_price ? 'line-through' : 'none';
        
        // let heartType = data.is_feature ? 'ios-heart-outline' : 'ios-heart';

        let heartType

        if (data.is_feature == 0) {
            heartType = 'ios-heart-outline'; 
        } else {
            heartType = 'ios-heart' ;
        }
        
        return (
            <View style={styles.row} > 
                <View style={{flexDirection: 'row', justifyContent: "center"}}>
                    <IconBadge
                        MainElement={ 
                            <Image style={styles.thumb} 
                                source={{ uri : data.productImage}}/>                        }
                        BadgeElement={
                            <Text style={{color:'#FFFFFF', fontSize: 10, position: 'absolute'}}>{data.discount} %off</Text>
                        }
                        IconBadgeStyle={{
                            width:50,
                            height:16,
                            top : height/5-10,
                            left: 0,
                            position : 'absolute',
                            backgroundColor: '#87cefa'}}/>
                            <EvilIcons style={ { position : 'absolute', left : 0}} 
                                name="share-google" 
                                size={20} 
                                color="#ccc" 
                                onPress={()=> this.sharing(data.product_id)}/>
                            <Ionicons style={ {left : width/3-35, position : 'absolute'}} 
                                name={heartType} 
                                size={20} 
                                color="#87cefa" 
                                onPress={()=> this.addtoWishlist(data.product_id)}/>
                             
                </View>
                <View style={{}}>
                <TouchableOpacity  style={styles.name} onPress={()=>Actions.deascriptionPage({product_id : data.product_id})}>

                <Text style={{fontSize : 13, color :'#000'}}>{data.product_name}</Text>
                </TouchableOpacity>
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
                </View>
            </View>
        );
    }
}

var styles =StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    list: {
        // borderWidth: 1, 
        // borderColor: '#CCC',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    name : {
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
    footer : {
        width : width/2-20,
        alignItems : 'center',
        padding : 10
    },
    allshop :{ 
        flex:1, 
        justifyContent : "space-around", 
        flexDirection: 'row', 
        borderWidth : 0.5, 
        borderColor: "#ccc", 
        alignItems: 'center'
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
        width: width/3-10,
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