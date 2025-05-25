import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

interface JemaahHajiDetail {
  kd_porsi: string;
  nama_paspor: string;
  no_paspor: string;
  tgl_berangkat: string;
  kloter_berangkat: string;
  ketua_kloter_berangkat?: string;
  no_hp_ketua_berangkat?: string;
  ketua_rombongan_berangkat?: string;
  no_rombongan_berangkat?: number | string;
  tgl_pulang?: string;
  kloter_pulang?: string;
  ketua_kloter_pulang?: string;
  no_hp_ketua_pulang?: string;
  ketua_rombongan_pulang?: string;
  hotel_makkah?: string;
  wilayah_makkah?: string;
  no_hotel_makkah?: string;
  maktab?: string;
  sektor_makkah?: string;
  url_foto?: string;
  hotel_madinah?: string;
  wilayah_madinah?: string;
  sektor_madinah?: string;
  no_hotel_madinah?: string;
}

interface DetailInfoJemaahHajiProps {
  detail: JemaahHajiDetail;
}

interface InfoItemProps {
  label: string;
  value: string | number | undefined | null;
  flex?: number;
  isMultiLine?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  flex,
  isMultiLine,
}) => {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === '' ||
    String(value).trim() === '-'
  ) {
    return null;
  }
  return (
    <View style={[styles.infoItemContainer, {flex: flex || 0}]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, isMultiLine && styles.multiLineValue]}>
        {String(value)}
      </Text>
    </View>
  );
};

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({title}) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const DetailInfoJemaahHaji: React.FC<DetailInfoJemaahHajiProps> = ({
  detail,
}) => {
  const profileImageUrl = detail.url_foto
    ? detail.url_foto
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        detail.nama_paspor,
      )}&size=256&background=random&font-size=0.33&color=fff`;

  // Helper untuk mengecek apakah sebuah section punya data valid untuk ditampilkan
  const hasValidData = (
    ...values: Array<string | number | undefined | null>
  ): boolean => {
    return values.some(
      val =>
        val !== null &&
        val !== undefined &&
        String(val).trim() !== '' &&
        String(val).trim() !== '-',
    );
  };

  const showInformasiKeberangkatan = hasValidData(
    detail.tgl_berangkat,
    detail.kloter_berangkat,
    detail.no_rombongan_berangkat,
    detail.ketua_kloter_berangkat,
    detail.no_hp_ketua_berangkat,
    detail.ketua_rombongan_berangkat,
  );

  const showAkomodasiMakkah = hasValidData(
    detail.hotel_makkah,
    detail.no_hotel_makkah,
    detail.wilayah_makkah,
    detail.sektor_makkah,
    detail.maktab,
  );

  const showAkomodasiMadinah = hasValidData(
    detail.hotel_madinah,
    detail.no_hotel_madinah,
    detail.wilayah_madinah,
    detail.sektor_madinah,
  );

  const showInformasiKepulangan = hasValidData(
    detail.tgl_pulang,
    detail.kloter_pulang,
    detail.ketua_kloter_pulang,
    detail.no_hp_ketua_pulang,
    detail.ketua_rombongan_pulang,
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContentContainer}>
      {/* Bagian Profil */}
      <View style={styles.profileSection}>
        <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        <Text style={styles.profileName}>
          {detail.nama_paspor || 'Nama Tidak Tersedia'}
        </Text>
        <Text style={styles.profilePorsi}>
          Nomor Porsi: {detail.kd_porsi || '-'}
        </Text>
        {detail.no_paspor && (
          <Text style={styles.profileInfo}>No. Paspor: {detail.no_paspor}</Text>
        )}
      </View>

      {/* Informasi Keberangkatan */}
      {showInformasiKeberangkatan && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Informasi Keberangkatan" />
            <InfoItem
              label="Tanggal & Waktu Berangkat"
              value={detail.tgl_berangkat}
            />
            <InfoItem
              label="Kloter Keberangkatan"
              value={detail.kloter_berangkat}
              isMultiLine
            />
            <InfoItem
              label="No. Rombongan Berangkat"
              value={detail.no_rombongan_berangkat}
            />
            <InfoItem
              label="Ketua Kloter Berangkat"
              value={detail.ketua_kloter_berangkat}
            />
            <InfoItem
              label="No. HP Ketua Kloter"
              value={detail.no_hp_ketua_berangkat}
            />
            <InfoItem
              label="Ketua Rombongan Berangkat"
              value={detail.ketua_rombongan_berangkat}
            />
          </View>
        </>
      )}

      {/* Akomodasi Makkah */}
      {showAkomodasiMakkah && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Akomodasi Makkah" />
            <InfoItem label="Hotel" value={detail.hotel_makkah} isMultiLine />
            <InfoItem
              label="Nomor Hotel/Kamar"
              value={detail.no_hotel_makkah}
            />
            <InfoItem label="Wilayah" value={detail.wilayah_makkah} />
            <InfoItem label="Sektor" value={detail.sektor_makkah} />
            <InfoItem label="Maktab" value={detail.maktab} />
          </View>
        </>
      )}

      {/* Akomodasi Madinah */}
      {showAkomodasiMadinah && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Akomodasi Madinah" />
            <InfoItem label="Hotel" value={detail.hotel_madinah} isMultiLine />
            <InfoItem
              label="Nomor Hotel/Kamar"
              value={detail.no_hotel_madinah}
            />
            <InfoItem label="Wilayah" value={detail.wilayah_madinah} />
            <InfoItem label="Sektor" value={detail.sektor_madinah} />
          </View>
        </>
      )}

      {/* Informasi Kepulangan */}
      {showInformasiKepulangan && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Informasi Kepulangan" />
            <InfoItem
              label="Tanggal & Waktu Pulang"
              value={detail.tgl_pulang}
            />
            <InfoItem
              label="Kloter Kepulangan"
              value={detail.kloter_pulang}
              isMultiLine
            />
            <InfoItem
              label="Ketua Kloter Pulang"
              value={detail.ketua_kloter_pulang}
            />
            <InfoItem
              label="No. HP Ketua Kloter"
              value={detail.no_hp_ketua_pulang}
            />
            <InfoItem
              label="Ketua Rombongan Pulang"
              value={detail.ketua_rombongan_pulang}
            />
          </View>
        </>
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 6,
  },
  profilePorsi: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileInfo: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  infoItemContainer: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#2D3748',
  },
  multiLineValue: {
    lineHeight: 20,
  },
  divider: {
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 16,
  },
});

export default DetailInfoJemaahHaji;
