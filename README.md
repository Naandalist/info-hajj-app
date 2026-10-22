# Info Haji

[![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)](https://github.com/Naandalist/info-hajj-app)
[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB.svg)](https://reactnative.dev)
[![Astro](https://img.shields.io/github/package-json/dependency-version/Naandalist/info-hajj-app/astro?filename=website%2Fpackage.json&logo=astro&logoColor=white&color=FF5D01)](https://astro.build)
[![Website](https://img.shields.io/github/actions/workflow/status/Naandalist/info-hajj-app/pages.yml?branch=main&label=website)](https://github.com/Naandalist/info-hajj-app/actions/workflows/pages.yml)
[![Google Play](https://img.shields.io/badge/Google_Play-Info_Haji-3DDC84?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.naandalist.info_haji)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

A React Native mobile application that provides information for Indonesian Hajj pilgrims, including departure schedules, pilgrim details, payment status, and official news from Media Nasional.

This repository holds the Android app and its landing page.

| Path | What it is | Stack |
| --- | --- | --- |
| Repo root | App (`com.naandalist.info_haji`) | React Native, TypeScript |
| [`website/`](./website) | Landing at [infohaji.naandalist.com](https://infohaji.naandalist.com) | Astro, React, Tailwind |

Play: [Info Haji on Google Play](https://play.google.com/store/apps/details?id=com.naandalist.info_haji). Contact: [dev@naandalist.com](mailto:dev@naandalist.com).

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

The app lockfile is `yarn.lock`. `website/` is a separate npm project with its own `package-lock.json`. Metro ignores it.

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
- `yarn android:release` - Install the Android release build
- `yarn build:apk` - Build a signed release APK
- `yarn build:aab` - Build a signed release AAB (Play Store)
- `yarn test` - Run Jest tests
- `yarn lint` - Run ESLint

## Building for Production

### Android

1. Ensure you have the signing keystore configured
2. Build:
```bash
yarn build:apk   # android/app/build/outputs/apk/release/app-release.apk
yarn build:aab   # android/app/build/outputs/bundle/release/app-release.aab
```

### iOS

1. Open `ios/info_haji.xcworkspace` in Xcode
2. Configure signing certificates
3. Archive and upload to App Store

## Website

Astro 5 + React + Tailwind 3. Pages: home, [privacy](https://infohaji.naandalist.com/privacy/), [terms](https://infohaji.naandalist.com/terms/). `app-ads.txt` is served from `website/public/`.

```bash
cd website
npm install --legacy-peer-deps
npm run dev
npm run build
```

Output is `website/dist`. GitHub Actions (`.github/workflows/pages.yml`) deploys that folder to GitHub Pages on push to `main` when `website/**` or the workflow file changes.

Privacy policy URL for Play: `https://infohaji.naandalist.com/privacy/`.

Do not run `npm install` or `yarn` from the repo root when installing landing dependencies. The default cwd is the app.

## Layout

```
src/               App screens, components, services
android/           Native Android project
ios/               Native iOS project
website/           Public landing, privacy, terms
```

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

**Version**: 2.0.1  
**Maintained by**: Naandalist
