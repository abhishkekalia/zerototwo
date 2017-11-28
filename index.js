import { AppRegistry } from 'react-native';
import App from './App';
import Root from './app/Root';
import Filter from './app/components/Filter';
import MainView from "./app/components/MainView";

// import Login from "./app/auth/components/Login";

AppRegistry.registerComponent('AwesomeApp', () => MainView);
