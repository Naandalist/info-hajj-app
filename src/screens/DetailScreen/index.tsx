import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  type DetailInfoJemaahHaji as DetailInfoJemaahHajiType,
  type DetailEstimasiKeberangkatan as DetailEstimasiKeberangkatanType,
  useGetInfoJemaahHajiMutation,
} from '@/services';
import {DetailInfoJemaahHaji} from '@/components';

export type RootStackParamList = {
  Home: undefined;
  Details: {detail: DetailEstimasiKeberangkatanType};
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const {detail} = route.params;
  const [infoJemaahHaji, setInfoJemaahHaji] =
    useState<DetailInfoJemaahHajiType | null>(null);

  const [getInfoJemaahHaji, {isLoading: isLoadingInfoJemaahHaji}] =
    useGetInfoJemaahHajiMutation();

  useEffect(() => {
    getInfoJemaahHaji({a: detail.kd_porsi})
      .unwrap()
      .then(response => {
        if (response?.data?.data?.length > 0) {
          setInfoJemaahHaji(response.data.data[0]);
        }
      })
      .catch(() => {
        setInfoJemaahHaji(null);
      });
  }, [detail.kd_porsi, getInfoJemaahHaji]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <FeatherIcon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.spacer} />
      {infoJemaahHaji && <DetailInfoJemaahHaji detail={infoJemaahHaji} />}
      {/* <DetailEstimasiKeberangkatan detail={detail} /> */}
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

export default DetailScreen;
