/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {withOnBootNetworkActivityRecording} from '@rozenite/network-activity-plugin';
import App from './src/App';
import {name as appName} from './app.json';

withOnBootNetworkActivityRecording();

AppRegistry.registerComponent(appName, () => App);
