import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.configure({name: 'Info Haji App'}) // controls connection & app name
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // add redux plugin
  .connect(); // let's connect!

// Clear Reactotron on every app load
Reactotron.clear();

export default Reactotron;
