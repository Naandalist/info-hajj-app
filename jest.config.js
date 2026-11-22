module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/website/'],
  // react-native-toast-message 2.5+ and @native-html ship untranspiled ESM.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-masked-view|@react-navigation|@native-html|react-native-toast-message|toastify-react-native|react-native-.*|react-redux|@reduxjs|immer|redux|reselect|redux-thunk)/)',
  ],
};
