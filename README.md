# Info Haji

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Naandalist/info-hajj-app)
[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB.svg)](https://reactnative.dev)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A React Native mobile application that provides information for Indonesian Hajj pilgrims, including departure schedules, pilgrim details, payment status, and official news from Media Nasional.

## Features

- **Departure Estimation**: Check estimated departure dates based on porsi number
- **Pilgrim Information**: Access detailed information about flight schedules, kloter assignments, and hotel accommodations
- **Payment Status**: Track Hajj payment status and settlement information
- **News & Updates**: Stay informed with official news from Media Nasional
- **Security Protection**: Built-in jailbreak/root detection and screen capture protection
- **Offline Support**: Skeleton loading states and optimized caching

## Tech Stack

- **Framework**: React Native 0.79.2
- **Language**: TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Navigation**: React Navigation 7
- **UI Components**: Custom components with React Native Vector Icons
- **Security**: Jail Monkey, React Native Capture Protection
- **Testing**: Jest

## Prerequisites

- Node.js >= 18
- Yarn 4.9.1
- React Native development environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and JDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Naandalist/info-hajj-app.git
cd info-hajj-app
```

2. Install dependencies:
```bash
yarn install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

## Running the App

### Development Mode

**Android**:
```bash
yarn android
```

**iOS**:
```bash
yarn ios
```

### Release Mode

**Android**:
```bash
yarn android:release
```

## Available Scripts

- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn test` - Run Jest tests
- `yarn lint` - Run ESLint


## Building for Production

### Android

1. Ensure you have the signing keystore configured
2. Run:
```bash
cd android && ./gradlew bundleRelease
```

### iOS

1. Open `ios/info_haji.xcworkspace` in Xcode
2. Configure signing certificates
3. Archive and upload to App Store

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).

## Contact

For questions or support, please contact the development team.

---

**Version**: 2.0.0  
**Maintained by**: Naandalist