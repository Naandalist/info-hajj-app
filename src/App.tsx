import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, DetailScreen} from '@/screens';
import Toast from 'react-native-toast-message';

import Reactotron from './reactotronConfig';

// Optional: override console.log to also log to Reactotron
if (__DEV__) {
  const consoleLog = console.log;
  console.log = (...args) => {
    Reactotron.log(...args);
    consoleLog(...args);
  };
}

export type RootStackParamList = {
  Home: undefined;
  Details: {detail: import('./services/hajiApi').DetailEstimasiKeberangkatan};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  </Provider>
);

export default App;
