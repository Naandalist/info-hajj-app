import React, {useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Pressable,
  Keyboard,
  StatusBar,
} from 'react-native';
import {CircleFade} from 'react-native-animated-spinkit';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {NewsCard, NewsCardSkeleton} from '@/components';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {formatDate} from '@/utils';
import {checkServer} from '@/utils/checkServer';
import {AppColors, AppDimens, AppStrings} from '@/constants';
import {
  useGetArticlesQuery,
  useGetEstimasiKeberangkatanMutation,
} from '@/services';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToastManager, {Toast} from 'toastify-react-native';

import styles from './styles';

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
  internasional: AppColors.categoryInternational,
  nasional: AppColors.categoryNational,
  syariah: AppColors.categorySyariah,
  khutbah: AppColors.categoryKhutbah,
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [appLoading, setAppLoading] = React.useState(false);
  const [getHajiInfo] = useGetEstimasiKeberangkatanMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
    reset,
  } = useForm<PorsiFormInputs>({
    defaultValues: {porsiNumber: ''},
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<PorsiFormInputs> = async ({porsiNumber}) => {
    setAppLoading(true);
    const serverAvailability = await checkServer();

    if (!serverAvailability) {
      Toast.show({
        text1: AppStrings.SERVER_MAINTENANCE,
        text2: AppStrings.SERVER_MAINTENANCE_DETAIL,
        position: 'top',
        type: 'error',
        icon: <></>,
      });
      setAppLoading(false);
      return;
    }

    getHajiInfo({no_porsi: porsiNumber})
      .unwrap()
      .then(response => {
        const {ResponseCode, Data} = response.data;
        if (ResponseCode === '00' && Data.length > 0) {
          reset({porsiNumber: ''});
          navigation.navigate('DetailInfo', {detail: Data[0]});
        } else {
          // Toast.show({type: 'error', text1: ResposeMessage});
          Toast.show({
            text1: AppStrings.NO_PORTION_NOT_FOUND,
            position: 'top',
            type: 'error',
            icon: <></>,
          });
        }
      })
      .catch(() => {
        Toast.show({
          text1: AppStrings.NO_PORTION_NOT_FOUND,
          text2: AppStrings.NO_PORTION_DETAIL,
          position: 'top',
          type: 'success',
          icon: <></>,
        });
      })
      .finally(() => {
        Keyboard.dismiss();
        clearErrors('porsiNumber');
        setAppLoading(false);
      });
  };

  const handleScreenTap = useCallback(() => {
    Keyboard.dismiss();
    clearErrors('porsiNumber');
  }, [clearErrors]);

  const {data: fetchedNews, isLoading: newsLoading} = useGetArticlesQuery({
    q: 'haji',
    page: 1,
  });

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
              categoryColor: CATEGORY_COLORS[key] ?? AppColors.categoryDefault,
            };
          })
        : [],
    [fetchedNews],
  );

  return (
    <Pressable style={styles.page} onPress={handleScreenTap}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.page} edges={['left', 'right', 'top']}>
        {/* HEADER */}
        <View style={styles.headerInfoContainer}>
          <Text style={styles.title}>{AppStrings.APP_TITLE}</Text>
          <Text style={styles.subtitle}>{AppStrings.APP_SUBTITLE}</Text>
          <View style={styles.inputRow}>
            <View
              style={[
                styles.inputContainer,
                errors.porsiNumber && styles.inputError,
              ]}>
              <FeatherIcon
                name="search"
                size={AppDimens.iconMD}
                color={AppColors.textLight}
                style={styles.icon}
              />
              <Controller
                control={control}
                name="porsiNumber"
                rules={{
                  required: AppStrings.PORTION_REQUIRED,
                  minLength: {
                    value: 10,
                    message: AppStrings.PORTION_LENGTH,
                  },
                  maxLength: {
                    value: 10,
                    message: AppStrings.PORTION_LENGTH,
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: AppStrings.PORTION_NUMBER_ONLY,
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={styles.input}
                    placeholder={AppStrings.INPUT_PLACEHOLDER}
                    placeholderTextColor={AppColors.textLight}
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
              style={[styles.button, appLoading && styles.buttonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={appLoading || !!errors.porsiNumber}>
              {appLoading ? (
                <ActivityIndicator color={AppColors.white} />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>
                    {AppStrings.BUTTON_TEXT}
                  </Text>
                  <Ionicons
                    name="send-sharp"
                    size={AppDimens.iconMD}
                    color={AppColors.white}
                  />
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

        {/* BODY */}
        <View style={styles.bodyContainer}>
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
                onPress={() => navigation.navigate('DetailNews', {id: item.id})}
              />
            )}
            keyExtractor={item => item.id}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </SafeAreaView>

      {/* LOADING OVERLAY ENTIRE SCREEN */}
      {appLoading && (
        <View style={styles.loadingOverlay} pointerEvents="auto">
          <CircleFade size={48} color={AppColors.white} />
        </View>
      )}
      <ToastManager showProgressBar={true} showCloseIcon={false} />
    </Pressable>
  );
};

export default HomeScreen;
