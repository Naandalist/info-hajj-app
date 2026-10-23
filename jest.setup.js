/* eslint-env jest */

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    ADMOB_ANDROID_APP_ID: '',
    ADMOB_IOS_APP_ID: '',
    ADMOB_NATIVE_UNIT_ID: '',
  },
}));

jest.mock('react-native-google-mobile-ads', () => {
  return {
    __esModule: true,
    default: () => ({
      initialize: jest.fn(() => Promise.resolve([])),
    }),
    AdsConsent: {
      gatherConsent: jest.fn(() => Promise.resolve({canRequestAds: true})),
      getConsentInfo: jest.fn(() => Promise.resolve({canRequestAds: true})),
    },
    NativeAd: {
      createForAdRequest: jest.fn(() => Promise.reject(new Error('ads mock'))),
    },
    NativeAdView: ({children}) => children,
    NativeAsset: ({children}) => children,
    NativeAssetType: {
      ADVERTISER: 'advertiser',
      BODY: 'body',
      CALL_TO_ACTION: 'callToAction',
      HEADLINE: 'headline',
      ICON: 'icon',
      IMAGE: 'image',
    },
    TestIds: {
      NATIVE: 'test-native',
    },
  };
});
