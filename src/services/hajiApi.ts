import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export interface DetailEstimasiKeberangkatan {
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

export interface ResponseEstimasiKeberangkatan {
  data: {
    ResponseCode: string;
    ResposeMessage: string;
    Data: DetailEstimasiKeberangkatan[];
  };
}

export interface DetailInfoJemaahHaji {
  kd_porsi: string;
  nama_paspor: string;
  no_paspor: string;
  tgl_berangkat: string;
  kloter_berangkat: string;
  ketua_kloter_berangkat: string;
  no_hp_ketua_berangkat: string;
  ketua_rombongan_berangkat: string;
  ketua_kloter_pulang: string;
  no_hp_ketua_pulang: string;
  ketua_rombongan_pulang: string;
  no_rombongan_berangkat: number;
  tgl_pulang: string;
  kloter_pulang: string;
  no_rombongan_pulang_x: number;
  hotel_makkah: string;
  wilayah_makkah: string;
  no_hotel_makkah: string;
  maktab: string;
  sektor_makkah: string;
  no_rumah: string | null;
  url_foto: string;
  hotel_madinah: string;
  wilayah_madinah: string;
  sektor_madinah: string;
  no_hotel_madinah: string;
}
export interface ResponseInfoJemaahHaji {
  data: {
    ResponseCode: string;
    ResposeMessage: string;
    data: DetailInfoJemaahHaji[];
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
    getEstimasiKeberangkatan: builder.mutation<
      ResponseEstimasiKeberangkatan,
      {no_porsi: string}
    >({
      query: body => ({
        url: Config.HAJI_ENDPOINT_INFO,
        method: 'POST',
        body,
      }),
    }),
    getInfoJemaahHaji: builder.mutation<ResponseInfoJemaahHaji, {a: string}>({
      query: body => ({
        url: '/64/ee07a892-f1c1-11ec-9d27-005056a1fd66',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetEstimasiKeberangkatanMutation,
  useGetInfoJemaahHajiMutation,
} = hajiApi;
