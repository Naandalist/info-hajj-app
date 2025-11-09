import React, {useCallback, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  DetailInfoScreen,
  DetailNewsScreen,
  SecurityWarning,
} from '@/screens';
import Toast from 'react-native-toast-message';
import RNBootSplash from 'react-native-bootsplash';
import {DetailEstimasiKeberangkatan} from './services';
import JailMonkey from 'jail-monkey';

export type RootStackParamList = {
  Home: undefined;
  DetailInfo: {
    detail: DetailEstimasiKeberangkatan;
  };
  DetailNews: {
    id: string;
  };
  SecurityWarning: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isSecurityThreat, setIsSecurityThreat] = React.useState<
    boolean | null
  >(null);
  const onReady = useCallback(() => RNBootSplash.hide({fade: true}), []);

  useEffect(() => {
    const checkSecurity = async () => {
      if (!__DEV__) {
        const isJailBroken = JailMonkey.isJailBroken();
        const isDebuggedMode = await JailMonkey.isDebuggedMode();

        setIsSecurityThreat(isJailBroken || isDebuggedMode);
      } else {
        setIsSecurityThreat(false);
      }
    };
    checkSecurity();
  }, []);

  // Wait for security check to complete
  if (isSecurityThreat === null) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onReady={onReady}>
        <Stack.Navigator
          initialRouteName={isSecurityThreat ? 'SecurityWarning' : 'Home'}>
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
          <Stack.Screen
            name="SecurityWarning"
            component={SecurityWarning}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
