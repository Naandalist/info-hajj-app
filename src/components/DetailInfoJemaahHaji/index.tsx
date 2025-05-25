import {DetailEstimasiKeberangkatan, DetailInfoPelunasanHaji} from '@/services';
import {formatCurrency, isStatusLunas} from '@/utils';
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
  no_rombongan_pulang_x?: number | string;
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
  infoJemaahHaji: JemaahHajiDetail;
  infoPelunasanHaji?: DetailInfoPelunasanHaji | null;
  detail: DetailEstimasiKeberangkatan;
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
      <View style={!flex && styles.verticalSpace10} />
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
  infoJemaahHaji,
  infoPelunasanHaji,
  detail,
}) => {
  const profileImageUrl = infoJemaahHaji.url_foto
    ? infoJemaahHaji.url_foto
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        infoJemaahHaji.nama_paspor,
      )}&size=256&background=random&font-size=0.33&color=fff`;

  const status = isStatusLunas('LUNAS 1446H');
  const statusColor = status ? '#38A169' : '#E53E3E';
  const statusBackgroundColor = status ? '#C6F6D5' : '#FED7D7';

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
    infoJemaahHaji.tgl_berangkat,
    infoJemaahHaji.kloter_berangkat,
    infoJemaahHaji.no_rombongan_berangkat,
    infoJemaahHaji.ketua_kloter_berangkat,
    infoJemaahHaji.no_hp_ketua_berangkat,
    infoJemaahHaji.ketua_rombongan_berangkat,
  );

  const showAkomodasiMakkah = hasValidData(
    infoJemaahHaji.hotel_makkah,
    infoJemaahHaji.no_hotel_makkah,
    infoJemaahHaji.wilayah_makkah,
    infoJemaahHaji.sektor_makkah,
    infoJemaahHaji.maktab,
  );

  const showAkomodasiMadinah = hasValidData(
    infoJemaahHaji.hotel_madinah,
    infoJemaahHaji.no_hotel_madinah,
    infoJemaahHaji.wilayah_madinah,
    infoJemaahHaji.sektor_madinah,
  );

  const showInformasiKepulangan = hasValidData(
    infoJemaahHaji.tgl_pulang,
    infoJemaahHaji.kloter_pulang,
    infoJemaahHaji.ketua_kloter_pulang,
    infoJemaahHaji.no_hp_ketua_pulang,
    infoJemaahHaji.ketua_rombongan_pulang,
    infoJemaahHaji.no_rombongan_pulang_x,
  );

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContentContainer}>
      {/* Bagian Profil */}
      <View style={styles.profileSection}>
        <Image source={{uri: profileImageUrl}} style={styles.profileImage} />

        <Text style={styles.profileName}>
          {infoJemaahHaji.nama_paspor || 'Nama Tidak Tersedia'}
        </Text>
        <Text style={styles.profileGroup}>
          {detail.kabupaten}, {detail.propinsi}
        </Text>
        <Text style={styles.profilePorsi}>
          Nomor Porsi: {infoJemaahHaji.kd_porsi || '-'}
        </Text>
        {infoJemaahHaji.no_paspor && (
          <Text style={styles.profileInfo}>
            No. Paspor: {infoJemaahHaji.no_paspor}
          </Text>
        )}
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

      {/* Informasi Keberangkatan */}
      {showInformasiKeberangkatan && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Informasi Keberangkatan" />
            <InfoItem
              label="Tanggal & Waktu Berangkat"
              value={infoJemaahHaji.tgl_berangkat}
            />
            <InfoItem
              label="Kloter Keberangkatan"
              value={infoJemaahHaji.kloter_berangkat}
              isMultiLine
            />
            <InfoItem
              label="No. Rombongan Berangkat"
              value={infoJemaahHaji.no_rombongan_berangkat}
            />
            <InfoItem
              label="Ketua Kloter Berangkat"
              value={infoJemaahHaji.ketua_kloter_berangkat}
            />
            <InfoItem
              label="No. HP Ketua Kloter"
              value={infoJemaahHaji.no_hp_ketua_berangkat}
            />
            <InfoItem
              label="Ketua Rombongan Berangkat"
              value={infoJemaahHaji.ketua_rombongan_berangkat}
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
            <InfoItem
              label="Hotel"
              value={infoJemaahHaji.hotel_makkah}
              isMultiLine
            />
            <InfoItem
              label="Nomor Hotel/Kamar"
              value={infoJemaahHaji.no_hotel_makkah}
            />
            <InfoItem label="Wilayah" value={infoJemaahHaji.wilayah_makkah} />
            <InfoItem label="Sektor" value={infoJemaahHaji.sektor_makkah} />
            <InfoItem label="Maktab" value={infoJemaahHaji.maktab} />
          </View>
        </>
      )}

      {/* Akomodasi Madinah */}
      {showAkomodasiMadinah && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <SectionTitle title="Akomodasi Madinah" />
            <InfoItem
              label="Hotel"
              value={infoJemaahHaji.hotel_madinah}
              isMultiLine
            />
            <InfoItem
              label="Nomor Hotel/Kamar"
              value={infoJemaahHaji.no_hotel_madinah}
            />
            <InfoItem label="Wilayah" value={infoJemaahHaji.wilayah_madinah} />
            <InfoItem label="Sektor" value={infoJemaahHaji.sektor_madinah} />
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
              value={infoJemaahHaji.tgl_pulang}
            />
            <InfoItem
              label="Kloter Kepulangan"
              value={infoJemaahHaji.kloter_pulang}
              isMultiLine
            />
            <InfoItem
              label="No. Rombongan Pulang"
              value={infoJemaahHaji.no_rombongan_pulang_x}
              isMultiLine
            />
            <InfoItem
              label="Ketua Kloter Pulang"
              value={infoJemaahHaji.ketua_kloter_pulang}
            />
            <InfoItem
              label="No. HP Ketua Kloter"
              value={infoJemaahHaji.no_hp_ketua_pulang}
            />
            <InfoItem
              label="Ketua Rombongan Pulang"
              value={infoJemaahHaji.ketua_rombongan_pulang}
            />
          </View>
        </>
      )}

      {infoPelunasanHaji && (
        <React.Fragment>
          {/* Informasi Pelunasan Section */}
          <View style={styles.divider} />

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
              label="Jumlah Pelunasan"
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 3,
    borderColor: '#000',
    borderStyle: 'dashed',
  },
  profileName: {
    fontSize: 22,
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
    marginBottom: 4,
    textAlign: 'center',
  },
  profileInfo: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
  },
  profileStatusBayarBase: {
    marginTop: 8,
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  verticalSpace10: {
    height: 10,
  },
});

export default DetailInfoJemaahHaji;
