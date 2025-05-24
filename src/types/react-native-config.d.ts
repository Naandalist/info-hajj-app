declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    HOST: string;
    API_KEY: string;
    ENDPOINT_HAJI_INFO: string;
    // add any other keys that expect in dot env here
  }

  export const Config: NativeConfig;
  export default Config;
}
