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
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {connect} from "react-redux";
import RegisterPage from "./Signup/register"
import HomePage from "./dashboard/DashboardPage";
import LoginPage from "./auth/LoginPage";
import ProfilePage from "./profile/ProfilePage";
import {Loader} from "./common/components";
import Menu from './components/menu/Menu';

import CustomNavBar from "./components/CustomNavBar";
import TabIcon from './components/TabIcon';

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
    	    	<Overlay key="overlay">
    	          	<Modal 
    	          	key="modal" 
            		hideNavBar 
            		transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })} > 
    	                
    	                <Lightbox key="lightbox">
		                    <Stack 
		                    hideNavBar 
		                    key="loginPage"> 
          					 	<Scene key="loginPage" component={LoginPage} title="loginPage" initial type={ActionConst.REPLACE} /> 

          					 	<Drawer 
                        		hideNavBar 
                        		key="home" 
                        		contentComponent={Menu} >


          					 	<Stack 
          					 	key ="home"  
          					 	navigationBarStyle={{ backgroundColor: '#87cefa' }}
          					 	 titleStyle={{alignSelf: 'center'}}>
                					<Scene key="homePage" initial={!needSignIn} component={HomePage} title="Home" type="replace"/> 

                				</Stack>

                				</Drawer>
	               				<Stack
	               				back
					            backTitle="Back"
					            duration={0}
                                key="profilePage"
                                navigationBarStyle={{ backgroundColor: '#87cefa' }}>
               					 	<Scene key="registerPage" component={RegisterPage} title="Registaration" /> 
                                	<Scene key="profile" component={ProfilePage} title="Profile"/> 
                                </Stack>

          					</Stack>
          				</Lightbox>
          			</Modal>
          		</Overlay> 
          	</Router>
        );

function mapStateToProps(state) {
	return {
		loading: !state.storage.storageLoaded,
		needSignIn: !state.auth.token
	}
}

export default connect(mapStateToProps)(Routes);