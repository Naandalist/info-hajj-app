import React, {useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {useGetHajiInfoMutation} from '@/services/hajiApi';
import {RootStackParamList} from '../../../App';
import Icon from 'react-native-vector-icons/Feather';
import {NewsCard} from '@/components';
import newsList from '@/mock/newsList.json';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {formatDate} from '@/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface PorsiFormInputs {
  porsiNumber: string;
}

// Interface for the structure of each item from the API response
interface ApiNewsItem {
  id: number;
  code: string;
  title: string;
  slug: string;
  prefix: string | null;
  category: {
    id: number;
    name: string;
  };
  image: {
    thumbnail: string;
    medium: string;
    full: string;
    caption: string;
  } | null;
  youtube_id: string | null;
  published_at: string;
}

// Interface for the structure of each news item to be used by NewsCard
interface NewsDataItem {
  id: string;
  category: string;
  mainTitle: string;
  description: string;
  date: string;
  imageUrl?: string;
  categoryColor?: string;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [trigger, {data: hajiData, isLoading, isError}] =
    useGetHajiInfoMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<PorsiFormInputs>({
    // clearErrors
    defaultValues: {
      porsiNumber: '0600124009',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const apiResponseData: ApiNewsItem[] = newsList;

  const newsData: NewsDataItem[] = apiResponseData.map(apiItem => {
    let categoryColor = '#28a745';
    if (apiItem.category.name.toLowerCase() === 'internasional') {
      categoryColor = '#007bff';
    } else if (apiItem.category.name.toLowerCase() === 'nasional') {
      categoryColor = '#28a745';
    } else if (apiItem.category.name.toLowerCase() === 'syariah') {
      categoryColor = '#6f42c1';
    } else if (apiItem.category.name.toLowerCase() === 'khutbah') {
      categoryColor = '#fd7e14';
    }
    return {
      id: String(apiItem.id),
      category: apiItem.category.name,
      mainTitle: apiItem.prefix || '',
      description: apiItem.title,
      date: formatDate(apiItem.published_at),
      imageUrl: apiItem.image?.thumbnail,
      categoryColor: categoryColor,
    };
  });

  const handlePressNewsItem = (item: NewsDataItem) => {
    console.log('Card pressed:', item.description);
    // navigation.navigate('NewsDetail', { newsId: item.id });
  };

  useEffect(() => {
    if (hajiData) {
      const rc = hajiData.data.ResponseCode;
      const msg = hajiData.data.ResposeMessage;
      if (rc === '00' && hajiData.data.Data.length > 0) {
        navigation.navigate('Details', {detail: hajiData.data.Data[0]});
      } else {
        Toast.show({type: 'error', text1: msg});
      }
    }
    if (isError) {
      Toast.show({
        type: 'error',
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 60,
        text1: 'Nomor porsi tidak ditemukan',
        text2: 'Mohon periksa kembali dan gunakan nomor porsi yang valid.',
      });
    }
  }, [hajiData, isError, navigation, trigger, handleSubmit]);

  const onSubmitPorsi: SubmitHandler<PorsiFormInputs> = formData => {
    trigger({no_porsi: formData.porsiNumber});
  };

  const renderNewsCard = ({item}: {item: NewsDataItem}) => (
    <NewsCard
      category={item.category}
      description={item.description}
      date={item.date}
      imageUrl={item.imageUrl}
      onPress={() => handlePressNewsItem(item)}
      categoryColor={item.categoryColor}
    />
  );

  const handleScreenTap = () => {
    Keyboard.dismiss();
    clearErrors('porsiNumber');
  };

  return (
    <SafeAreaView style={styles.page}>
      <TouchableWithoutFeedback onPress={handleScreenTap}>
        <View style={styles.outerContainer}>
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
                  errors.porsiNumber && styles.inputContainerError,
                ]}>
                <Icon
                  name="search"
                  size={20}
                  color="#777"
                  style={styles.icon}
                />
                <Controller
                  control={control}
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
                      value: /^[0-9]*$/,
                      message: 'Nomor porsi hanya boleh berisi angka.',
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Masukkan nomor porsi haji (10 digit)"
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      maxLength={10}
                    />
                  )}
                  name="porsiNumber"
                />
              </View>
              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSubmit(onSubmitPorsi)}
                disabled={isLoading || !!errors.porsiNumber}>
                {isLoading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Cek</Text>
                    <Icon name="arrow-right" size={20} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View />
            <Text style={styles.errorMessage}>
              {errors.porsiNumber ? errors.porsiNumber.message : ''}
            </Text>
          </View>

          <FlatList
            data={newsData}
            renderItem={renderNewsCard}
            keyExtractor={item => item.id}
            style={styles.listComponent}
            contentContainerStyle={styles.listContentContainer}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  outerContainer: {
    flex: 1,
  },
  headerInfoContainer: {
    backgroundColor: '#badc58',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
    paddingBottom: 24,
  },
  title: {
    fontSize: 36,
    color: '#000',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    height: 48,
    marginRight: 8,
    borderColor: '#000',
    borderWidth: 1,
  },
  inputContainerError: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    padding: 0,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  button: {
    backgroundColor: '#6ab04c',
    borderColor: '#000',
    borderWidth: 1,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#FFF',
    marginHorizontal: 8,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  listComponent: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default HomeScreen;
