/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// YellowBox.ignoreWarnings([
//   'Remote debugger is in a background tab which may cause apps to perform slowly',
//   'Require cycle: node_modules/rn-fetch-blob/index.js',
//   'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
// ]);
AppRegistry.registerComponent(appName, () => App);
