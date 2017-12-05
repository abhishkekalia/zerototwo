import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableHighlight, 
    StyleSheet, 
    ListView,
    TouchableOpacity,
    ScrollView, 
    Dimensions, 
    TextInput,
    Image 
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Utils from 'app/common/Utils';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default class WishList extends Component {
    constructor(props) { 
        super(props); 
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        this.state = { 
            dataSource: ds.cloneWithRows(['row 1', 'row 2']), 
            Quentity : 0,
        }; 
    } 
    componentDidMount(){
        this.fetchData();
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

        fetch(Utils.murl('wishlistDetail'), config) 
        .then((response) => response.json())
        .then((responseData) => {

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                refreshing : false
        });
        }).done();
    }

    viewNote(rowData) {
        // this.props.navigator.push({
        //   title: 'The Note',
        //   component: ViewNote,
        //   passProps: {
        //     noteText: rowData,
        //     noteId: this.noteId(rowData),
        //   }
        // });
    } 

    render() {
        let listView = (<View></View>);
            listView = (
                <ListView
                contentContainerStyle={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                />
            );
        return (
        <View>
        {listView}
        </View>
        );
    }
    renderData( data, rowData: string, sectionID: number, rowID: number, index) {
    // console.warn(data); 
        let color = data.special_price ? '#C5C8C9' : '#000';
        let textDecorationLine = data.special_price ? 'line-through' : 'none';

        let swipeBtns = [{
            text: 'Edit',
            backgroundColor: '#ccc',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {}
         },{
            text: 'Delete',
            backgroundColor: '#deb887',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {  }
         }];
        return (
            <View style={{ 
                flexDirection: 'column' ,
                marginTop : 2, 
                borderWidth : 0.5, 
                borderColor : "#ccc", 
                borderRadius : 5, 
            }}>
                <Swipeout right={swipeBtns}
                    autoClose={true}
                    backgroundColor= 'transparent'> 
                    
                        <View style={{ 
                            flexDirection: 'row', 
                            // justifyContent : 'space-around', 
                            backgroundColor : "#fff"}}>
                            
                            <Image style={[styles.thumb, {margin: 10}]} 
                            source={{ uri : data.image}}/>
    
                                <View style={{flexDirection: 'column', justifyContent : 'space-between'}}>  
                                    <TouchableHighlight
                                        underlayColor='transparent'
                                        onPress={this.viewNote.bind(this, data)} 
                                        style={styles.row} >
                                        
                                        <Text > {data.product_name} </Text>
                                    
                                    </TouchableHighlight>
                                        <View style={{ flexDirection : "row"}}>
                                        
                                            <Text> Quentity : {sectionID} </Text>
                                            <TouchableOpacity 
                                                style={styles.qtybutton} 
                                                onPress={(Quentity)=> this.setState({Quentity : this.state.Quentity -1})}>

                                                <Text> - </Text>
                                            
                                            </TouchableOpacity>
                                            
                                            <Text style={[styles.qtybutton, {color : "#87cefa"}]}> { this.state.Quentity } </Text>
                                            
                                            <TouchableOpacity 
                                                style={styles.qtybutton} 
                                                onPress={(Quentity)=> this.setState({Quentity: this.state.Quentity +1 })}>
                                                
                                                <Text> +</Text>
                                            
                                            </TouchableOpacity>
                                        
                                        </View>
                                        <Text >US $ : {data.special_price} </Text>
                                        <View style={{ flexDirection : "row"}}>
                                        <Text style={{fontSize:15, color: color, textDecorationLine: textDecorationLine}}> US $ {data.price}  </Text>
                                        <Text>| {data.special_price}</Text>
                                        </View>
                                        <Text > Total :{data.price} </Text>
                                    </View>
                                </View>
                                
                </Swipeout>
                
                <View style={styles.bottom}>
                        <TouchableOpacity style={[styles.wishbutton, {flexDirection : 'row', justifyContent: "center"}]}>
                        <SimpleLineIcons name="share-alt" size={20} color="#a52a2a"/>
                            <Text style={{ left : 5}}>Share WishList</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.wishbutton, {flexDirection : 'row', justifyContent: "center"}]}>
                            <FontAwesome name="opencart" size={20} color="#a52a2a"/> 
                            <Text style={{ left :5}}>Move to Cart</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create ({
    container: {
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#ccc',
        padding : 10 

    },

    row: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // padding: 10,
        // backgroundColor: '#F6F6F6',
        marginTop : 1
    },
    qtybutton: {
        paddingLeft: 10,
        paddingRight: 10,

        alignItems: 'center',
        borderWidth : 1,
        borderColor : "#ccc",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // shadowOffset:{width:2,height:4}
    },

    wishbutton :{
        alignItems : 'center', 
        width : width/2-10,
        // borderBottomLeftRadius : 10, 
        // borderBottomRightRadius : 10, 
        borderWidth : 0.5, 
        borderColor : "#ccc",
        padding : 5

    },

    thumb: {
        width   : width/5,
        height  :width/4 ,
    },

    textQue :{
        flex: 1,
        fontSize: 18,
        fontWeight: '400',
        left : 5
    },

    centering: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    bottom : {
        borderBottomLeftRadius : 10, 
        borderBottomRightRadius : 10, 
        flexDirection : 'row',
        justifyContent : 'space-around',
        backgroundColor : "#fff"
    },

    headline: {
        paddingTop : 10,
        paddingBottom : 10,
        marginLeft : 15,
        fontSize    : 15,
        color       : "#000",
        fontWeight  : 'bold'
    },
    detail: {
        padding : 10,
        backgroundColor : '#fff',
        minHeight : 500,
        fontWeight : 'bold'
    }
})
