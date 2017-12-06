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
import Timeline from "./components/timeline";
import Settings from "./components/settings";

import Filter from './components/Filter';

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
                          <Scene key="root" 
                          drawer ={true}
                          contentComponent={Menu} 
                          initial={true} 
                          hideNavBar={true} 
       				// initial={!needSignIn} 
		            // key="zerototwo" 
		            // contentComponent={Menu}
		            renderRightButton={() => <Ionicons name="filter" size={20} onPress={()=> Actions.filterBar()}/>}>

    	                <Stack key="root" drawer={false} >
       	                	<Scene key='landingpage' component={WelcomeScreen} hideNavBar={true} initial={needSignIn}/>
    	                	<Scene key='loginPage' component={LoginPage} title='login' hideNavBar={true}  type={ActionConst.REPLACE} />
    	                </Stack>

		                    <Tabs 
        	        			key="tabbar"
                				swipeEnabled
                				initial={!needSignIn}
                				showLabel={false}
                				tabBarStyle={styles.tabBarStyle}
                				tabBarPosition={'bottom'}
                				activeBackgroundColor='#fff' 
                				inactiveBackgroundColor='#fff'
                				// inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                				>

                				<Stack
                    				key="Home"
                    				title="Home"
                    				icon={TabIcon}
                    				 iconName="home"
                    				navigationBarStyle={{ backgroundColor: '#87cefa' }}
                    				titleStyle={{ color: 'white', alignSelf: 'center' }}>
             						
             						<Scene 
             							key="homePage" 
             							titleStyle={{alignSelf: 'center'}} 
             							component={MainView} 
             							title="Home" 
             							type="replace"/>
             					</Stack>
                   				<Stack
                    				key="wish"
                    				title="wish"
                    				icon={TabIcon}
                    				iconName="heart"
                    				navigationBarStyle={{ backgroundColor: '#87cefa' }}>

             						<Scene 
             							key="wish"
             							titleStyle={{alignSelf: 'center'}} 
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
             							titleStyle={{alignSelf: 'center'}} 
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
             						key="profilePage" 
             						component={ProfilePage} 
             						title="Profile"/>
             					</Stack>
             				</Tabs>


             					<Scene 
             						key="registerPage" 
             						component={Register} 
             						title="Registaration" 
			          				navBar={CustomGenNavBar} />
             					<Scene 
             						key="addressbook" 
             						component={AddressBook} 
             						title="Addressbook" 
             						hideNavBar={true}/> 

			          			<Scene 
             						key="deascriptionPage" 
             						component={ProductDescription} 
             						title="product description" 
			          				navBar={CustomGenNavBar} /> 

                                <Scene 
                                	key="profile" 
                                	component={ProfilePage} 
                                	title="Profile"/> 

                                <Scene 
                                	key="newaddress" 
                                	component={Newaddress} 
                                	title="Newaddress"
                                	hideNavBar={true}/>
                                <Scene 
                                    key="settings" 
                                    component={Settings} 
                                    title="setting"
                                    navBar={CustomGenNavBar} /> 


             					
                                <Stack
	               				back
					            backTitle="Back"
					            hideNavBar={true}
					            duration={0}
                                key="timeLine"
                                titleStyle={{ color: 'black', alignSelf: 'center' }}
                                navigationBarStyle={{ backgroundColor: '#87cefa' }}>
               					 	<Scene key="timelineStatus" component={Timeline} /> 
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



                				</Scene>
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

