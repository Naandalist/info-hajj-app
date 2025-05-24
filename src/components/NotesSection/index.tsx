import {View, Text, StyleSheet} from 'react-native';

export default function NotesSection() {
  return (
    <View>
      <View style={styles.notesSection}>
        <Text style={styles.notesTitle}>Catatan</Text>
        <View style={styles.noteItem}>
          <Text style={styles.noteIndex}>1.</Text>
          <Text style={styles.noteText}>
            Estimasi keberangkatan dapat berubah sesuai kuota dan regulasi
            terbaru.
          </Text>
        </View>
        <View style={styles.noteItem}>
          <Text style={styles.noteIndex}>2.</Text>
          <Text style={styles.noteText}>
            Berlaku untuk Jemaah yang belum batal atau belum berangkat.
          </Text>
        </View>
        <View style={styles.noteItem}>
          <Text style={styles.noteIndex}>3.</Text>
          <Text style={styles.noteText}>
            Tahun keberangkatan bisa berubah selama masa operasional haji.
          </Text>
        </View>
        <View style={styles.noteItem}>
          <Text style={styles.noteIndex}>4.</Text>
          <Text style={styles.noteText}>
            Jika nomor porsi Anda mundur, cek kembali setelah masa operasional.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesSection: {
    paddingHorizontal: 4,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  noteIndex: {
    fontSize: 14,
    fontWeight: '600',
    width: 20,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
});
