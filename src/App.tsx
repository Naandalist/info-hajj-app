import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, DetailInfoScreen, DetailNewsScreen} from '@/screens';
import Toast from 'react-native-toast-message';
import RNBootSplash from 'react-native-bootsplash';

import Reactotron from './reactotronConfig';
import {DetailEstimasiKeberangkatan} from './services';

// override console.log to also log to Reactotron
if (__DEV__) {
  const consoleLog = console.log;
  console.log = (...args) => {
    Reactotron.log(...args);
    consoleLog(...args);
  };
}

export type RootStackParamList = {
  Home: undefined;
  DetailInfo: {
    detail: DetailEstimasiKeberangkatan;
  };
  DetailNews: {
    id: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const onReady = React.useCallback(() => RNBootSplash.hide({fade: true}), []);
  return (
    <Provider store={store}>
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailInfo"
            component={DetailInfoScreen}
            options={{
              headerShown: true,
              headerShadowVisible: false,
              title: '',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="DetailNews"
            component={DetailNewsScreen}
            options={{headerShown: true, title: '', animation: 'fade'}}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
