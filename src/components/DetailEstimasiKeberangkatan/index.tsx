import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import type {
  DetailEstimasiKeberangkatan as DetailEstimasiKeberangkatanType,
  DetailInfoPelunasanHaji as DetailInfoPelunasanHajiType,
} from '@/services';
import {formatCurrency, isStatusLunas} from '@/utils';
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
  infoPelunasanHaji?: DetailInfoPelunasanHajiType | null;
}

const DetailEstimasiKeberangkatan: React.FC<
  DetailEstimasiKeberangkatanProps
> = ({detail, infoPelunasanHaji}) => {
  const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    detail.nama,
  )}&size=256&background=badc58&font-size=0.33&color=fff`;

  const status = isStatusLunas(infoPelunasanHaji?.status_pelunasan || '');
  const statusColor = status ? '#38A169' : '#E53E3E';
  const statusBackgroundColor = status ? '#C6F6D5' : '#FED7D7';

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
        {infoPelunasanHaji?.status_pelunasan && (
          <Text
            style={[
              styles.profileStatusBayarBase,
              {color: statusColor, backgroundColor: statusBackgroundColor},
            ]}>
            {isStatusLunas(infoPelunasanHaji.status_pelunasan)
              ? 'SUDAH LUNAS'
              : 'BELUM LUNAS'}
          </Text>
        )}
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
      <View style={styles.divider} />

      {infoPelunasanHaji && (
        <React.Fragment>
          {/* Informasi Pelunasan Section */}
          <View style={styles.section}>
            <SectionTitle title="Informasi Pelunasan" />
            <View style={styles.infoRow}>
              <InfoItem
                label="Tahun Pelunasan"
                value={infoPelunasanHaji.tahun_pelunasan}
                flex={1}
              />
              <InfoItem
                label="Tahap Pelunasan"
                value={infoPelunasanHaji.tahap_pelunasan}
                flex={1}
              />
            </View>
            <View style={styles.infoRow}>
              <InfoItem
                label="Status Cadangan"
                value={infoPelunasanHaji.status_cadangan}
                flex={1}
              />
              <InfoItem
                label="Status Istitha'ah"
                value={infoPelunasanHaji.status_istithaah}
                flex={1}
              />
            </View>
            <InfoItem
              label="Biaya Perjalanan Ibadah Haji (BIPIH)"
              value={formatCurrency(infoPelunasanHaji.biaya_bipih)}
            />
            <InfoItem
              label="Setoran Awal"
              value={formatCurrency(infoPelunasanHaji.setoran_awal)}
            />
            <InfoItem
              label="Nilai Manfaat"
              value={formatCurrency(infoPelunasanHaji.nilai_manfaat)}
            />
            <InfoItem
              label="Jumlah Sisa Pelunasan"
              value={formatCurrency(infoPelunasanHaji.jumlah_pelunasan)}
            />
          </View>
          <View style={styles.divider} />

          {/* Informasi Bank & Embarkasi Section */}
          <View style={styles.section}>
            <SectionTitle title="Informasi Bank & Embarkasi" />
            <InfoItem
              label="Bank Penerima Setoran"
              value={infoPelunasanHaji.bank}
            />
            <InfoItem
              label="Nomor Rekening"
              value={infoPelunasanHaji.nomor_rekening || '-'} // Show '-' if empty
            />
            <InfoItem label="Embarkasi" value={infoPelunasanHaji.embarkasi} />
          </View>
        </React.Fragment>
      )}
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

    backgroundColor: '#E0E0E0',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#6ab04c',
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
