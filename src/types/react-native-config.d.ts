declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    HOST: string;
    API_KEY: string;
    ENDPOINT_HAJI_INFO: string;
    NEWS_API_URL: string;
    NEWS_API_TOKEN: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
