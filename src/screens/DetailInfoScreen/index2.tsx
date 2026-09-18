import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CaptureProtection} from 'react-native-capture-protection';
import type {RootStackParamList} from '../../App';
import {AppColors, AppDimens} from '@/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailInfo'>;

interface InfoRowProps {
  label: string;
  value: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{String(value || '-')}</Text>
  </View>
);

const DetailInfoScreen: React.FC<Props> = ({route}) => {
  const {detail} = route.params;
  const isLunas = detail.status_bayar.toLowerCase() === 'lunas';
  const avatarColor = isLunas ? '276749' : 'C53030';
  const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    detail.nama,
  )}&size=256&background=${avatarColor}&font-size=0.33&color=fff`;

  useEffect(() => {
    CaptureProtection.prevent();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'bottom', 'right']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
          <Text style={styles.name}>{detail.nama}</Text>
          <Text style={styles.porsi}>Nomor Porsi: {detail.kd_porsi}</Text>
          <Text
            style={[styles.status, isLunas ? styles.lunas : styles.belumLunas]}>
            {detail.status_bayar || '-'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perkiraan Keberangkatan</Text>
          <InfoRow label="Tahun Masehi" value={detail.berangkatmasehi} />
          <InfoRow label="Tahun Hijriah" value={detail.berangkathijriah} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wilayah</Text>
          <InfoRow label="Kabupaten" value={detail.kabupaten} />
          <InfoRow label="Provinsi" value={detail.propinsi} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Porsi</Text>
          <InfoRow
            label="Posisi Porsi Saat Ini"
            value={detail.posisiporsi.toLocaleString('id-ID')}
          />
          <InfoRow
            label="Kuota Provinsi"
            value={detail.kuotapropinsi.toLocaleString('id-ID')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: AppColors.white},
  content: {padding: AppDimens.paddingXL, paddingBottom: AppDimens.paddingXXXL},
  profile: {alignItems: 'center', paddingVertical: AppDimens.paddingXXL},
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    marginBottom: AppDimens.marginXL,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: AppColors.textDark,
    textAlign: 'center',
  },
  porsi: {
    fontSize: AppDimens.fontMD,
    color: AppColors.textMedium,
    marginTop: AppDimens.marginMD,
  },
  status: {
    marginTop: AppDimens.marginLG,
    paddingHorizontal: AppDimens.paddingLG,
    paddingVertical: AppDimens.paddingSM,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  lunas: {backgroundColor: '#C6F6D5', color: '#276749'},
  belumLunas: {backgroundColor: '#FED7D7', color: '#C53030'},
  section: {
    borderTopWidth: AppDimens.borderThin,
    borderTopColor: '#E2E8F0',
    paddingVertical: AppDimens.paddingXL,
  },
  sectionTitle: {
    fontSize: AppDimens.fontLG,
    fontWeight: '600',
    color: AppColors.textDark,
    marginBottom: AppDimens.marginLG,
  },
  infoRow: {marginBottom: AppDimens.marginLG},
  infoLabel: {
    fontSize: AppDimens.fontSM,
    color: AppColors.textLight,
    marginBottom: AppDimens.marginSM,
  },
  infoValue: {
    fontSize: AppDimens.fontMD,
    color: AppColors.textMedium,
    fontWeight: '500',
  },
});

export default DetailInfoScreen;
