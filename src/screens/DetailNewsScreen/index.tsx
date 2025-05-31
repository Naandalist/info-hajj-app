import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import {useGetArticleByIdQuery} from '@/services/newsApi';
import {removeBrTags} from '@/utils';
import type {RootStackParamList} from '../../App';
import {DetailNewsSkeleton} from '@/components';
import {AppColors, AppDimens, AppFonts} from '@/constants';

type DetailNewsRouteProp = RouteProp<RootStackParamList, 'DetailNews'>;

const DetailNewsScreen: React.FC = () => {
  const route = useRoute<DetailNewsRouteProp>();
  const {id} = route.params;

  const {data: detail, isLoading, isError} = useGetArticleByIdQuery(Number(id));

  const {width} = useWindowDimensions();

  if (isLoading || !detail || isError) {
    return <DetailNewsSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView>
        {detail.image?.full && (
          <Image source={{uri: detail.image.full}} style={styles.image} />
        )}
        {detail.image?.caption && (
          <Text style={styles.caption}>{detail.image.caption}</Text>
        )}
        <View style={styles.header}>
          <Text style={styles.title}>{detail.title}</Text>
          <View style={styles.meta}>
            <Text style={[styles.category]}>{detail.category.name}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.date}>
              {new Date(detail.published_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <RenderHTML
            contentWidth={width - 32}
            source={{html: removeBrTags(detail.content)}}
            tagsStyles={{
              p: {
                marginBottom: 12,
                lineHeight: 20,
                color: AppColors.textLight,
                fontFamily: AppFonts.regular,
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.white},
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: '100%', height: 200},
  caption: {
    fontSize: 12,
    color: AppColors.textLight,
    marginHorizontal: AppDimens.marginLG,
    marginTop: 8,
    fontFamily: AppFonts.mediumItalic,
  },
  header: {padding: AppDimens.paddingLG},
  title: {
    fontSize: 24,
    color: AppColors.textDark,
    fontFamily: AppFonts.extraBold,
    marginBottom: 8,
  },
  meta: {flexDirection: 'row', alignItems: 'center'},
  category: {
    fontSize: 12,
    color: AppColors.textDark,
    fontFamily: AppFonts.bold,
  },
  dot: {marginHorizontal: 4, color: AppColors.textLight},
  date: {fontSize: 12, color: AppColors.textLight},
  content: {paddingHorizontal: AppDimens.paddingLG, marginBottom: 24},
});

export default DetailNewsScreen;
