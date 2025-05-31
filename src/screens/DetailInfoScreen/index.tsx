import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  type DetailInfoJemaahHaji as DetailInfoJemaahHajiType,
  type DetailEstimasiKeberangkatan as DetailEstimasiKeberangkatanType,
  useGetInfoJemaahHajiMutation,
  type DetailInfoPelunasanHaji as DetailInfoPelunasanHajiType,
  useGetInfoPelunasanHajiMutation,
} from '@/services';
import {DetailEstimasiKeberangkatan, DetailInfoJemaahHaji} from '@/components';

export type RootStackParamList = {
  Home: undefined;
  DetailInfo: {detail: DetailEstimasiKeberangkatanType};
};

type DetailInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailInfo'
>;

const DetailInfoScreen: React.FC<DetailInfoScreenProps> = ({
  route,
  navigation,
}) => {
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const contentDetail = () => {
    if (isLoadingInfoJemaahHaji || isLoadingInfoPelunasanHaji) {
      return <ActivityIndicator size="large" color="#badc58" />;
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <FeatherIcon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.spacer} />
      {contentDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  spacer: {backgroundColor: 'rgba(236, 240, 241,0.8)', height: 10},
});

export default DetailInfoScreen;
