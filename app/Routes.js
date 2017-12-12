import React from "react";
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from "react-native-router-flux";
import { Text, View, StyleSheet } from 'react-native';
import MessageBar from './common/MessageBar';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {connect} from "react-redux";
import Register from "./Signup/register"
import HomePage from "./dashboard/DashboardPage";
import LoginPage from "./auth/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import {Loader} from "./common/components";
import Menu from './components/menu/MenuContainer';
import Ionicons from 'react-native-vector-icons/Feather';
import wishList from './components/wish/wishList'
import Shopingcart from './components/wish/Shopingcart'

import CustomNavBar from "./components/navbar/CustomNavBar";
import CustomGenNavBar from "./components/navbar/CustomGenNavBar";

import TabIcon from './components/TabIcon';
import WelcomeScreen from './components/WelcomeScreen';
import AddressBook from './components/Addressbook';
import MainView from './components/MainView';
import ProductDescription from './components/ProductDescription';
import Newaddress from './components/Newaddress';
import Searchproduct from './components/Searchproduct';
import Timeline from "./components/timeline";
import Settings from "./components/settings";
import Contact from "./components/Contact";

import Filter from './components/Filter';

import MenuIcon from './images/imgpsh.png';
// const reducerCreate = params => (state, action) => Reducer(params)(state, action);

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const Routes = ({loading, needSignIn}) => (
  loading ?
    <Loader/> :
    <Router 
    createReducer={reducerCreate}
    getSceneStyle={getSceneStyle}>
<Overlay>
        <Modal hideNavBar={true} key="root">
            <Stack key="auth" initial>
                <Scene key='landingpage' component={WelcomeScreen} hideNavBar={true} initial={needSignIn}/>
                <Scene key='loginPage' component={LoginPage} title='login' hideNavBar={true}  type={ActionConst.REPLACE} />
            </Stack>
            
            <Scene 
            drawer ={true} 
            drawerImage={MenuIcon} 
            contentComponent={Menu} 
            // initial={true} 
            // hideNavBar={true} 
            initial={!needSignIn} 
            renderRightButton={() => <Ionicons name="filter" size={20} onPress={()=> Actions.filterBar()} color="#fff" style={{ padding : 10}}/>}>

                <Tabs 
                key="tabbar"
                swipeEnabled
                initial={!needSignIn}
                showLabel={false}
                tabBarStyle={styles.tabBarStyle}
                tabBarPosition={'bottom'}
                activeBackgroundColor='#6c6e70' 
                inactiveBackgroundColor='#fff'
                // inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                >

                    <Stack
                    key="Home"
                    title="Home"
                    icon={TabIcon}
                    iconName="home"
                    // navigationBarStyle={{backgroundColor: '#1e2226'}}  titleStyle={{color : "#FFF"}}
                    navigationBarStyle={{ backgroundColor: '#87cefa' }}
                    titleStyle={{ color: 'white', alignSelf: 'center' }}>
                        
                        <Scene 
                        key="homePage" 
                        titleStyle={{alignSelf: 'center'}} 
                        component={MainView} 
                        title="Home"
                        // navigationBarStyle={{backgroundColor: '#1e2226'}}  
                        titleStyle={{color : "#FFF", alignSelf: 'center'}}
                        type="replace"/>

                        <Scene 
                        key="filterdBy" 
                        titleStyle={{alignSelf: 'center'}} 
                        component={Searchproduct} 
                        // title="Home" 
                        />
                    </Stack>
                    
                    <Stack
                    key="wish"
                    title="wish"
                    icon={TabIcon}
                    iconName="heart"
                    navigationBarStyle={{ backgroundColor: '#87cefa' }}>
                        <Scene 
                        key="wish"
                        titleStyle={{color : "#FFF", alignSelf: 'center'}}
                        navigationBarStyle={{ backgroundColor: '#87cefa' }} 
                        component={wishList} 
                        title="WishList"/>
                    </Stack>

                    <Stack
                    key="Cart"
                    title="Cart"
                    icon={TabIcon}
                    iconName="opencart"
                    navigationBarStyle={{ backgroundColor: '#87cefa' }}>

                        <Scene 
                        key="shopingCart"
                        titleStyle={{color : "#FFF", alignSelf: 'center'}}
                        navigationBarStyle={{ backgroundColor: '#87cefa' }} 
                        component={Shopingcart} 
                        title="Cart"/>
                    </Stack>
                    
                    <Stack
                    key="profile"
                    title="Profile"
                    icon={TabIcon}
                    iconName="users"
                    navigationBarStyle={{ backgroundColor: '#87cefa' }}>
                        <Scene 
                        titleStyle={{color : "#FFF", alignSelf: 'center'}}
                        key="profilePage" 
                        component={ProfilePage} 
                        title="Profile"/>
                    </Stack>
                    
                </Tabs>
            </Scene>
            <Stack key="registerPage" navBar={CustomGenNavBar} >
                <Scene 
                key="register" 
                component={Register} 
                title="Registaration" 
                navBar={CustomGenNavBar} />
            </Stack>

            <Stack key="addressbook" >
                <Scene 
                key="address" 
                component={AddressBook} 
                title="Addressbook" 
                hideNavBar={true}/> 
            </Stack>

            <Stack key="deascriptionPage" >
                <Scene 
                key="deascription" 
                component={ProductDescription} 
                title="product description" 
                navBar={CustomGenNavBar} />
            </Stack>

            <Stack key="contact">    
                <Scene 
                key="contact" 
                component={Contact} 
                title="Contact Us" 
                navBar={CustomGenNavBar} />
            </Stack>

            <Stack key="profile" >
                <Scene 
                key="profile" 
                component={ProfilePage} 
                title="Profile"/>
            </Stack> 

            <Stack key="newaddress">
                <Scene 
                key="newaddress" 
                component={Newaddress} 
                title="Newaddress"
                hideNavBar={true}/>
            </Stack>

            <Stack key="settings">                                
                <Scene 
                key="settings" 
                component={Settings} 
                title="setting"
                navBar={CustomGenNavBar} /> 
            </Stack>

            <Stack
            back
            backTitle="Back"
            hideNavBar={true}
            duration={0}
            key="timeLine"
            titleStyle={{ color: 'black', alignSelf: 'center' }}
            navigationBarStyle={{ backgroundColor: '#87cefa' }}>
                <Scene 
                key="timelineStatus" 
                component={Timeline} />                                 
            </Stack>
                
            <Stack 
            key="filterBar" 
            hideTabBar={true} 
            titleStyle={{alignSelf: 'center'}}>
                <Scene
                key="filter"
                title="filter"
                navBar={CustomNavBar}
                component={Filter}
                back/>
            </Stack>

        </Modal>
        <Scene component={MessageBar} key="msgbar"/>
        </Overlay>

    </Router>
);

function mapStateToProps(state) {
  return {
    loading: !state.storage.storageLoaded,
    needSignIn: !state.auth.token
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});
export default connect(mapStateToProps)(Routes);

