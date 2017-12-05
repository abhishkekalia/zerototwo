import { AppRegistry } from 'react-native';
import App from './App';
import Root from './app/Root';
import Filter from './app/components/Filter';
import ProductDescription from "./app/components/ProductDescription";
import wishList from './app/components/wish/wishList'
import Settings from "./app/components/settings";

// import Login from "./app/auth/components/Login";

AppRegistry.registerComponent('AwesomeApp', () => Root);
