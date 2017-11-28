import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, TextInput } from 'react-native';
import ModalPicker from './modalpicker';
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
            "created_on": "2017-11-17 07:10:38"
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
class PickerExample extends Component {
     constructor() {
        super();
 
        this.state = {
            textInputValue: ''
        }
    }

   render() {
      return (
           <View style={{ padding:50}}> 
                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ this.setState({textInputValue:option.ShopName})}}>
                    
                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:40}}
                        underlineColorAndroid = 'transparent'
                        editable={false}
                        placeholder="Select something yummy!"
                        value={this.state.textInputValue} />
                        
                </ModalPicker>
            </View>
      )
   }
}
export default PickerExample

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})