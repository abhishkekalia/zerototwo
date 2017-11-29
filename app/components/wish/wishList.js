import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TouchableHighlight, 
  StyleSheet, 
  ListView
} from 'react-native';

import Swipeout from 'react-native-swipeout';

export default class WishList extends Component {
    constructor(props) { 
        super(props); 

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        this.state = { 
            dataSource: ds.cloneWithRows(['row 1', 'row 2']), 
        }; 
    } 

    viewNote(rowData) {
        this.props.navigator.push({
          title: 'The Note',
          component: ViewNote,
          passProps: {
            noteText: rowData,
            noteId: this.noteId(rowData),
          }
        });
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
        <View>
        {listView}
        </View>
        );
}



renderData(rowData: string, sectionID: number, rowID: number, index) { 
let swipeBtns = [
  {
    text: 'Edit',
    backgroundColor: '#ccc',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {}
 },
  {
    text: 'Delete',
    backgroundColor: '#ccc',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {  }
 }
];
    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.viewNote.bind(this, rowData)} style={styles.row} >
          <View>
            <View style={styles.rowContainer}>
              <Text style={styles.note}> {rowData} </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
)
  }
}


const styles = StyleSheet.create ({
    container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6'
    },

    thumb: {
        width   :50,
        height  :50,
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

    heading: {
        paddingTop : 5,
        paddingBottom : 5,
        backgroundColor : '#fff',
        borderBottomWidth : 3,
        borderBottomColor : '#a9a9a9'
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
