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
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }), 
        }
    }

    componentDidMount(){
        this.fetchData()
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
    fetch(Utils.gurl()+"/productListView", config) 
        .then((response) => response.json())
        .then((responseData) => {
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
                showsVerticalScrollIndicator      = {false}
                alwaysBounceHorizontal            = {true}
                bouncesZoom                       = {false}                
                />
            );
        return (
        <View style={{ borderWidth: 1, borderColor: '#CCC'}}>{listView}</View>
        );
    }

    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        return (
            <TouchableOpacity style={styles.row} onPress={()=> Actions.timeLine({ 
                    uri : data.productImage })}> 
                        <Image style={styles.thumb} 
                            source={{ uri : data.productImage}}/>
              
            </TouchableOpacity>
        );
    }
}

var styles =StyleSheet.create({
    list: {
         flex: 1,
  justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        },
    row: {
        flex: 1,
        // borderRadius : 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // padding: 5,
        margin: 3,
        // borderWidth: 1,
        // borderColor: '#CCC'
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