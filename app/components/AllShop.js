import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
// import CheckBox from 'app/common/CheckBox';

import CheckBox from 'react-native-check-box';
import Utils from 'app/common/Utils';
import Modal from 'react-native-modal';

export default class AllShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            isModalVisible: false
        }
    }
    modal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
    // _hideModal = () => this.setState({ isModalVisible: false })
    
    componentDidMount() {
        this.loadData();
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
        // console.warn(JSON.stringify(data.name))
        data.checked = !data.checked;
        let msg=data.checked? 'you checked ':'you unchecked '

        // this.toast.show(msg+data.name);
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

    render() {
        return (
            <View style={styles.container}>

            <TouchableOpacity onPress={this.modal}>
                <Text>Show Modal</Text>
            </TouchableOpacity>

            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.container}>
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
                <TouchableOpacity onPress={this.modal}>
                <Text>close Modal</Text>
            </TouchableOpacity>
                </View>
            </Modal>
        </View>
        )
    }

}

const styles = StyleSheet.create({
container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },   
  item: {
        flexDirection: 'column',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'darkgray',
    },
})

                