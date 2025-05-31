declare module 'react-native-config' {
  export interface NativeConfig {
    HAJI_API_URL: string;
    HAJI_HOST: string;
    HAJI_API_KEY: string;
    HAJI_ENDPOINT_INFO: string;
    NEWS_API_ARTICLES: string;
    NEWS_API_ARTICLE: string;
    NEWS_API_TOKEN: string;
    NEWS_HOST: string;
    NEWS_USER_AGENT: string;
    HAJI_USER_AGENT: string;
    PORSI_NUMBER_TEST: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
