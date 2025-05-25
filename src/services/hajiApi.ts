import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export interface HajiDetail {
  kd_porsi: string;
  nama: string;
  kd_kab: string;
  kabupaten: string;
  kd_prop: string;
  propinsi: string;
  posisiporsi: number;
  kuotapropinsi: number;
  berangkatmasehi: number;
  berangkathijriah: number;
  status_bayar: string;
}

export interface HajiResponse {
  data: {
    ResponseCode: string;
    ResposeMessage: string;
    Data: HajiDetail[];
  };
}

export const hajiApi = createApi({
  reducerPath: 'hajiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.HAJI_API_URL,
    prepareHeaders: headers => {
      headers.set('host', Config.HAJI_HOST);
      headers.set('User-Agent', Config.HAJI_USER_AGENT);
      headers.set('x-key', Config.HAJI_API_KEY);
      return headers;
    },
  }),
  endpoints: builder => ({
    getHajiInfo: builder.mutation<HajiResponse, {no_porsi: string}>({
      query: body => ({
        url: Config.HAJI_ENDPOINT_INFO,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useGetHajiInfoMutation} = hajiApi;
