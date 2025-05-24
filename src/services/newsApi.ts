import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export interface NewsArticle {
  id: number;
  code: string;
  title: string;
  slug: string;
  prefix: string | null;
  category: {id: number; name: string};
  image: {
    thumbnail: string;
    medium: string;
    full: string;
    caption: string;
  } | null;
  youtube_id: string | null;
  published_at: string;
}

// Helper to delay for ms milliseconds
const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), ms));

const rawBaseQuery = fetchBaseQuery({
  baseUrl: Config.NEWS_API_URL,
  prepareHeaders: headers => {
    headers.set('Authorization', `Bearer ${Config.NEWS_API_TOKEN}`);
    headers.set('host', 'nuonline.cms.nu.or.id');
    headers.set('User-Agent', 'Dart/3.6 (dart:io)');
    return headers;
  },
});

const delayedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  await delay(2000);
  return result;
};

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: delayedBaseQuery,
  endpoints: builder => ({
    getArticles: builder.query<NewsArticle[], {q?: string; page?: number}>({
      query: ({q = 'haji', page = 1}) => `articles?q=${q}&page=${page}`,
      transformResponse: (response: NewsArticle[]) => response,
    }),
  }),
});

export const {useGetArticlesQuery} = newsApi;
