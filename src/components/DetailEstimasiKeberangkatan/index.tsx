import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import type {DetailEstimasiKeberangkatan as DetailEstimasiKeberangkatanType} from '@/services'; // Assuming this path is correct relative to this new file's location

interface InfoItemProps {
  label: string;
  value: string | number;
  flex?: number;
}

const InfoItem: React.FC<InfoItemProps> = ({label, value, flex}) => (
  <View style={[styles.infoItemContainer, {flex: flex || 0}]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{String(value)}</Text>
  </View>
);

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({title}) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

interface DetailEstimasiKeberangkatanProps {
  detail: DetailEstimasiKeberangkatanType;
}

const DetailEstimasiKeberangkatan: React.FC<
  DetailEstimasiKeberangkatanProps
> = ({detail}) => {
  const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    detail.nama,
  )}&size=256&background=E53E3E&font-size=0.33&color=fff`;

  const statusColor = detail.status_bayar === 'Lunas' ? '#38A169' : '#E53E3E';
  const statusBackgroundColor =
    detail.status_bayar === 'Lunas' ? '#C6F6D5' : '#FED7D7';

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContentContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        <Text style={styles.profileName}>{detail.nama}</Text>
        <Text style={styles.profileGroup}>
          {detail.kabupaten}, {detail.propinsi}
        </Text>
        <Text style={styles.profilePorsi}>Nomor Porsi: {detail.kd_porsi}</Text>
        <Text
          style={[
            styles.profileStatusBayarBase,
            {color: statusColor, backgroundColor: statusBackgroundColor},
          ]}>
          Status Pembayaran: {detail.status_bayar}
        </Text>
      </View>
      <View style={styles.divider} />
      {/* Flight Details Section - Only shows available data */}
      <View style={styles.section}>
        <SectionTitle title="Detail Perkiraan Keberangkatan" />
        <View style={styles.infoRow}>
          <InfoItem
            label="Tahun Berangkat (Masehi)"
            value={detail.berangkatmasehi}
            flex={1}
          />
          <InfoItem
            label="Tahun Berangkat (Hijriah)"
            value={detail.berangkathijriah}
            flex={1}
          />
        </View>
      </View>
      <View style={styles.divider} />
      {/* Quota Information Section */}
      <View style={styles.section}>
        <SectionTitle title="Informasi Porsi & Kuota" />
        <View style={styles.infoRow}>
          <InfoItem
            label="Posisi Porsi Saat Ini"
            value={detail.posisiporsi}
            flex={1}
          />
          <InfoItem
            label="Kuota Provinsi"
            value={detail.kuotapropinsi}
            flex={1}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'grey',
    overflow: 'hidden',
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 6,
  },
  profileGroup: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 4,
  },
  profilePorsi: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 6,
  },
  profileStatusBayarBase: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 0,
    overflow: 'hidden',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  infoItemContainer: {
    flex: 1,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  divider: {
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 16,
  },
});

export default DetailEstimasiKeberangkatan;
