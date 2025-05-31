import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  type DetailInfoJemaahHaji as DetailInfoJemaahHajiType,
  type DetailEstimasiKeberangkatan as DetailEstimasiKeberangkatanType,
  useGetInfoJemaahHajiMutation,
  type DetailInfoPelunasanHaji as DetailInfoPelunasanHajiType,
  useGetInfoPelunasanHajiMutation,
} from '@/services';
import {
  DetailEstimasiKeberangkatan,
  DetailInfoJemaahHaji,
  DetailInfoSkeleton,
} from '@/components';
import {AppColors, AppDimens} from '@/constants';

export type RootStackParamList = {
  Home: undefined;
  DetailInfo: {detail: DetailEstimasiKeberangkatanType};
};

type DetailInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailInfo'
>;

const DetailInfoScreen: React.FC<DetailInfoScreenProps> = ({route}) => {
  const {detail} = route.params;
  const [infoJemaahHaji, setInfoJemaahHaji] =
    useState<DetailInfoJemaahHajiType | null>(null);

  const [infoPelunasanHaji, setInfoPelunasanHaji] =
    useState<DetailInfoPelunasanHajiType | null>(null);

  const [getInfoJemaahHaji, {isLoading: isLoadingInfoJemaahHaji}] =
    useGetInfoJemaahHajiMutation();

  useEffect(() => {
    getInfoJemaahHaji({a: detail.kd_porsi})
      .unwrap()
      .then(response => {
        if (response?.data?.data?.length > 0) {
          setInfoJemaahHaji(response.data.data[0]);
        } else {
          setInfoJemaahHaji(null);
        }
      })
      .catch(() => {
        setInfoJemaahHaji(null);
      });
  }, [detail.kd_porsi, getInfoJemaahHaji]);

  const [getInfoPelunasanHaji, {isLoading: isLoadingInfoPelunasanHaji}] =
    useGetInfoPelunasanHajiMutation();

  useEffect(() => {
    getInfoPelunasanHaji({a: detail.kd_porsi})
      .unwrap()
      .then(response => {
        if (response?.data?.Data?.length > 0) {
          setInfoPelunasanHaji(response.data.Data[0]);
        } else {
          setInfoPelunasanHaji(null);
        }
      })
      .catch(() => {
        setInfoPelunasanHaji(null);
      });
  }, [detail.kd_porsi, getInfoPelunasanHaji]);

  const contentDetail = () => {
    if (isLoadingInfoJemaahHaji || isLoadingInfoPelunasanHaji) {
      return <DetailInfoSkeleton />;
    }
    if (
      !isLoadingInfoJemaahHaji &&
      !isLoadingInfoPelunasanHaji &&
      infoJemaahHaji &&
      infoPelunasanHaji
    ) {
      return (
        <DetailInfoJemaahHaji
          infoJemaahHaji={infoJemaahHaji}
          infoPelunasanHaji={infoPelunasanHaji}
          detail={detail}
        />
      );
    }
    if (
      infoJemaahHaji === null &&
      !isLoadingInfoJemaahHaji &&
      !isLoadingInfoPelunasanHaji &&
      infoPelunasanHaji
    ) {
      return (
        <DetailEstimasiKeberangkatan
          detail={detail}
          infoPelunasanHaji={infoPelunasanHaji}
        />
      );
    }
    return <DetailInfoSkeleton />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.spacer} />
      {contentDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  backButton: {
    paddingVertical: AppDimens.paddingMD,
    marginHorizontal: AppDimens.marginLG,
  },
  spacer: {
    backgroundColor: 'rgba(236, 240, 241,0.8)',
    height: AppDimens.marginMD,
  },
});

export default DetailInfoScreen;
