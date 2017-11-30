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
import CustomNavBar from "./components/navbar/CustomNavBar";
import CustomGenNavBar from "./components/navbar/CustomGenNavBar";

import TabIcon from './components/TabIcon';
import WelcomeScreen from './components/WelcomeScreen';
import MainView from './components/MainView';
import ProductDescription from './components/ProductDescription';
import Timeline from "./components/timeline";

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
    		getSceneStyle={getSceneStyle}
    		>
    			<Drawer 
                    hideNavBar 
                    key="home" 
                    contentComponent={Menu}
                    renderRightButton={() => <Ionicons name="filter" size={20} onPress={()=> Actions.filterBar()}/>}>
    	                
    	                <Stack key="root">
       	                	<Scene key='landingpage' component={WelcomeScreen} initial={needSignIn}/>
    	                	<Scene key='loginPage' component={LoginPage} title='login' hideNavBar={true}  type={ActionConst.REPLACE} />
    	                </Stack>
             					<Scene 
             						key="homePage" 
             						titleStyle={{alignSelf: 'center'}} 
             						navigationBarStyle={{ backgroundColor: '#87cefa' }} 
             						initial={!needSignIn} 
             						component={MainView} 
             						title="Home" 
             						type="replace"/>

             					<Scene 
             						key="profilePage" 
             						component={ProfilePage} 
             						title="Profile"/>
             					<Scene 
             						key="registerPage" 
             						component={Register} 
             						title="Registaration" 
			          				navBar={CustomGenNavBar} />
			          			<Scene 
             						key="deascriptionPage" 
             						component={ProductDescription} 
             						title="product description" 
			          				navBar={CustomGenNavBar} /> 

                                <Scene 
                                	key="profile" 
                                	component={ProfilePage} 
                                	title="Profile"/> 


             					
                                <Stack
	               				back
					            backTitle="Back"
					            duration={0}
                                key="timeLine"
                                titleStyle={{ color: 'black', alignSelf: 'center' }}
                                navigationBarStyle={{ backgroundColor: '#87cefa' }}>
               					 	<Scene key="timelineStatus" component={Timeline} /> 
                                </Stack>

                                <Stack key="filterBar" hideTabBar titleStyle={{alignSelf: 'center'}}>
  		          				<Scene
                				key="filter"
                				title="filter"
                				navBar={CustomNavBar}
                				component={Filter}
                				back/>
        	        			</Stack>
        	        			
        	        			<Tabs 
        	        			key="tabbar"
                				swipeEnabled
                				showLabel={false}
                				tabBarStyle={styles.tabBarStyle}
                				tabBarPosition={'bottom'}
                				activeBackgroundColor="white"
                				inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"> 

                					<Stack
                    				key="tab_1"
                    				title="Tab #1"
                    					tabBarLabel="TAB #1"
                    					inactiveBackgroundColor="#FFF"
                    					activeBackgroundColor="#DDD"
                    					icon={TabIcon}
                    					navigationBarStyle={{ backgroundColor: 'green' }}
                    					titleStyle={{ color: 'white', alignSelf: 'center' }}>
                    						
                    						<Scene
                    						
                    						  key="tab1_1"
                    						
                    						  component={wishList}
                    						
                    						  title="Tab #1_1"
                    						
                    						  onRight={() => alert('Right button')}
                    						
                    						  rightTitle="Right"/>

                    						<Scene
                    						  key="tab1_2"
                    						  component={wishList}
                    						  title="Tab #1_2"
                    						  back
                    						  titleStyle={{ color: 'black', alignSelf: 'center' }}
                    						/>
						                  </Stack>
						
						                  <Stack
						                    key="tab_2"
						                    title="Tab #2"
						                    icon={TabIcon}
						                    initial
						                  >
						                    <Scene
						                      key="tab_2_1"
						                      component={wishList}
						                      title="Tab #2_1"
						                      renderRightButton={() => <Text>Right</Text>}
						                    />
						                    <Scene
						                      key="tab_2_2"
						                      component={wishList}
						                      title="Tab #2_2"
						                      onBack={() => alert('onBack button!')}
						                      hideDrawerButton
						                      backTitle="Back!"
						                      panHandlers={null}
						                    />
						                  </Stack>
						
						                  <Stack key="tab_3">
						                    <Scene
						                      key="tab_3_1"
						                      component={wishList}
						                      title="Tab #3"
						                      icon={TabIcon}
						                      rightTitle="Right3"
						                      onRight={() => { }}
						                    />
						                  </Stack>
						                  <Stack key="tab_4">
						                    <Scene key="tab_4_1" component={wishList} title="Tab #4" hideNavBar icon={TabIcon} />
						                  </Stack>
						                  <Stack key="tab_5">
						                    <Scene key="tab_5_1" component={wishList} title="Tab #5" icon={TabIcon} />
						                  </Stack>
						                </Tabs>



                				</Drawer>
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