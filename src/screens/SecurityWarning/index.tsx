import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNExitApp from 'react-native-exit-app';
import {useCountdown} from './hooks';

export default function SecurityWarning() {
  const countdown = useCountdown(8, () => {
    RNExitApp.exitApp();
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <Text style={styles.text}>
        We dont allow jailbroken or debugged devices to use this app.
      </Text>
      <Text style={styles.countdown}>{countdown}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 40,
    textAlign: 'center',
  },
  countdown: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff0000',
    marginTop: 20,
  },
});
