import Config from 'react-native-config';
import {TestIds} from 'react-native-google-mobile-ads';

export const nativeAdUnitId = __DEV__
  ? TestIds.NATIVE
  : Config.ADMOB_NATIVE_UNIT_ID || '';
