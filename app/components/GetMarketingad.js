import React, { Component ,PropTypes } from 'react';
import {
    ListView,
    TouchableOpacity, 
    StyleSheet, 
    Text, 
    View,
    Image 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import IconBadge from 'react-native-icon-badge';

// import Image from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Circle';
import Utils from 'app/common/Utils';

export default class GetMarketing extends Component {
    constructor(props) {
        super(props);        
        this.state={ 
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }), 
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){ 
        let formData = new FormData();
        formData.append('u_id', String(7));
        formData.append('country', String(1)); 

    const config = { 
                method: 'POST', 
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data;',
                },
                body: formData,
            }
    // fetch(`http://solutiontrackers.com/dev-a/zerototwo/index.php/Webservice/getMarketingAd`, config) 

    fetch(Utils.gurl('getMarketingAd'), config) 
        .then((response) => response.json())
        .then((responseData) => {
                    // console.warn(JSON.stringify(responseData))
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                refreshing : false
        });
        }).done();
    }

    render() {
        let listView = (<View></View>);
                listView = (
                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderData.bind(this)}
                    contentContainerStyle={styles.list}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    removeClippedSubviews={true}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator = {false}
                    alwaysBounceHorizontal= {true}
                    bouncesZoom={false}                
                    />
                );
        return (
        <View style={{ borderBottomWidth: 0.5, borderColor: '#CCC' , height: 50}}>{listView}</View>
        );
    }
    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        return (
            <TouchableOpacity style={styles.row} onPress={()=> Actions.timeLine({ 
                    uri : data.path })}> 
                        <Image style={styles.thumb} 
                            source={{ uri : data.path}}/>
            </TouchableOpacity>
        );
    }
}

var styles =StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        },
    row: {
        // flex: 1,
        // borderRadius : 40,
        // padding: 5,
        // borderWidth: 1,
        // borderColor: '#CCC'
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 3,
    },

    thumb: {
        width: 40,
        height: 40,
        borderRadius : 40
    },

    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
});