import React, { Component ,PropTypes } from 'react';
import {
    ListView, 
    StyleSheet, 
    Text, 
    View,
    Image 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Image from 'react-native-image-progress';
// import ProgressBar from 'react-native-progress/Circle';
import Utils from 'app/common/Utils'

export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.fetchData= this.fetchData.bind(this);
        
        this.state={ 
            dataSource: new ListView.DataSource({   rowHasChanged: (row1, row2) => row1 !== row2 }), 
            dataSource2: new ListView.DataSource({  rowHasChanged: (row1, row2) => row1 !== row2 }), 
        }
    }

    // static propTypes = { 
    //     container_id:   React.PropTypes.string.isRequired,
    //     type: React.PropTypes.string.isRequired,
    //     fetchData:   React.PropTypes.func.isRequired 
    // };

    componentDidMount(){
        this.fetchData()
    }

    blur() {
        const {dataSource } = this.state;
        dataSource && dataSource.blur();
    }

    focus() {
        const {dataSource } = this.state;
        dataSource && dataSource.focus();
    }

    componentWillUpdate() {
        this.fetchData();
      // nextState.dataSource = nextProps.propOpacity;
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
    fetch(Utils.gurl()+"/productList", config) 
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
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                />
            );
        return (
        <View>{listView}</View>
        );
    }

    renderData(data, rowData: string, sectionID: number, rowID: number, index) {
        return (
            <View style={styles.row}>
            <Text>{data.product_id}</Text>
            <Text style={{fontSize: 8}}>{JSON.stringify(data.productImages[0])}</Text>
            <Image style={styles.thumb} 
            source={ require('../images/15107415881.jpg')}/>
            </View>
        );
    }
}

var styles =StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 85,
        height: 85,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },

    thumb: {
        width: 50,
        height: 50
    },

    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
});