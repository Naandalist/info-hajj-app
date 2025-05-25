import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailScreen: React.FC<Props> = ({route}) => {
  const {detail} = route.params;
  return (
    <View style={styles.container}>
      {Object.entries(detail).map(([key, value]) => (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{String(value)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  row: {flexDirection: 'row', marginBottom: 8},
  label: {fontWeight: 'bold', width: 120},
  value: {flex: 1},
});

export default DetailScreen;
