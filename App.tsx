import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  Home: undefined;
  Details: {detail: import('./src/services/hajiApi').HajiDetail};
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
          options={{title: 'Detail Haji'}}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  </Provider>
);

export default App;
