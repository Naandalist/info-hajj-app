import React, {useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Pressable,
  Keyboard,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../App';
import {NewsCard, NewsCardSkeleton} from '@/components';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {formatDate} from '@/utils';
import {checkServer} from '@/utils/checkServer';
import {useGetArticlesQuery, useGetHajiInfoMutation} from '@/services';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface PorsiFormInputs {
  porsiNumber: string;
}

interface NewsDataItem {
  id: string;
  category: string;
  mainTitle: string;
  description: string;
  date: string;
  imageUrl?: string;
  categoryColor?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  internasional: '#007bff',
  nasional: '#28a745',
  syariah: '#6f42c1',
  khutbah: '#fd7e14',
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [getHajiInfo, {isLoading: getHajiLoading}] = useGetHajiInfoMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<PorsiFormInputs>({
    defaultValues: {porsiNumber: '0600124009'},
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<PorsiFormInputs> = async ({porsiNumber}) => {
    const serverAvailability = await checkServer();

    if (!serverAvailability) {
      Toast.show({
        type: 'error',
        text1: 'SERVER SEDANG PEMELIHARAAN',
        text2: 'Silahkan coba beberapa saat lagi nanti.',
      });
      return;
    }

    getHajiInfo({no_porsi: porsiNumber})
      .unwrap()
      .then(response => {
        const {ResponseCode, ResposeMessage, Data} = response.data;
        console.log('✅ Response:', response.data);
        if (ResponseCode === '00' && Data.length > 0) {
          navigation.navigate('Details', {detail: Data[0]});
        } else {
          Toast.show({type: 'error', text1: ResposeMessage});
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'NOMOR PORSI TIDAK DITEMUKAN',
          text2: 'Silahkan coba beberapa saat lagi nanti.',
        });
      });
  };

  const handleScreenTap = useCallback(() => {
    Keyboard.dismiss();
    clearErrors('porsiNumber');
  }, [clearErrors]);

  const {
    data: fetchedNews,
    isLoading: newsLoading,
    // isError: newsError,
    // refetch: refetchNews,
  } = useGetArticlesQuery({q: 'haji', page: 1});

  const newsData: NewsDataItem[] = useMemo(
    () =>
      fetchedNews
        ? fetchedNews.map(item => {
            const key = item.category.name.toLowerCase();
            return {
              id: String(item.id),
              category: item.category.name,
              mainTitle: item.prefix ?? '',
              description: item.title,
              date: formatDate(item.published_at),
              imageUrl: item.image?.thumbnail,
              categoryColor: CATEGORY_COLORS[key] ?? '#6c757d',
            };
          })
        : [],
    [fetchedNews],
  );

  return (
    <Pressable style={styles.page} onPress={handleScreenTap}>
      <StatusBar barStyle="dark-content" backgroundColor="#badc58" />
      <SafeAreaView style={styles.page}>
        <View style={styles.headerInfoContainer}>
          <Text style={styles.title}>INFO HAJI</Text>
          <Text style={styles.subtitle}>
            Cek status keberangkatan, biaya pelunasan, dan info detail haji
            Anda!
          </Text>
          <View style={styles.inputRow}>
            <View
              style={[
                styles.inputContainer,
                errors.porsiNumber && styles.inputError,
              ]}>
              <FeatherIcon
                name="search"
                size={20}
                color="#777"
                style={styles.icon}
              />
              <Controller
                control={control}
                name="porsiNumber"
                rules={{
                  required: 'Nomor porsi wajib diisi.',
                  minLength: {
                    value: 10,
                    message: 'Nomor porsi harus 10 digit.',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Nomor porsi harus 10 digit.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Nomor porsi hanya boleh berisi angka.',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Masukkan nomor porsi haji"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    maxLength={10}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, getHajiLoading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={getHajiLoading || !!errors.porsiNumber}>
              {getHajiLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Cek</Text>
                  <Ionicons name="send-sharp" size={20} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          {errors.porsiNumber && (
            <Text style={styles.errorMessage}>
              {errors.porsiNumber.message}
            </Text>
          )}
        </View>

        {newsLoading && (
          <>
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </>
        )}

        <FlatList
          data={newsData}
          renderItem={({item}) => (
            <NewsCard
              category={item.category}
              description={item.description}
              date={item.date}
              imageUrl={item.imageUrl}
              categoryColor={item.categoryColor}
              onPress={() => console.log('News tapped:', item.id)}
            />
          )}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#FFF'},
  headerInfoContainer: {
    backgroundColor: '#badc58',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {fontSize: 36, color: '#000'},
  subtitle: {fontSize: 18, color: '#333', marginBottom: 24},
  inputRow: {flexDirection: 'row', alignItems: 'center'},
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    height: 48,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  inputError: {borderColor: 'red'},
  icon: {marginRight: 8},
  input: {flex: 1, fontSize: 14, color: '#000'},
  button: {
    backgroundColor: '#6ab04c',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 16,
    height: 48,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a8d08d',
    borderColor: '#777',
  },
  buttonContent: {flexDirection: 'row', alignItems: 'center'},
  buttonText: {color: '#FFF', fontSize: 14, marginRight: 8, fontWeight: 'bold'},
  errorMessage: {color: 'red', marginTop: 4, fontSize: 12},
  errorBanner: {
    textAlign: 'center',
    color: 'red',
    marginVertical: 8,
  },
});

export default HomeScreen;
