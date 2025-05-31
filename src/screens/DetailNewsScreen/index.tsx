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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RenderHTML from 'react-native-render-html';
import {useGetArticleByIdQuery} from '@/services/newsApi';
import {removeBrTags} from '@/utils';
import {AppColors, AppDimens, AppFonts} from '@/constants';
import DetailNewsSkeleton from '@/components/DetailNewsSkeleton';

type RootStackParamList = {
  Details: {id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailNewsScreen: React.FC<Props> = ({route}) => {
  const {id} = route.params;
  const {data: detail, isLoading} = useGetArticleByIdQuery(id);
  const {width} = useWindowDimensions();

  if (isLoading || !detail) {
    return <DetailNewsSkeleton />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView>
        {detail.image?.full && (
          <Image source={{uri: detail.image.full}} style={styles.image} />
        )}
        {detail.image?.caption && (
          <Text style={styles.caption}>{detail.image.caption}</Text>
        )}
        <View style={styles.header}>
          {detail.prefix && <Text style={styles.prefix}>{detail.prefix}</Text>}
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
                marginBottom: AppDimens.marginMD,
                lineHeight: 20,
                color: AppColors.textLight,
                fontFamily: AppFonts.medium,
              },
            }}
          />
        </View>
        {detail.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {detail.tags.map(tag => (
              <View key={tag.id} style={styles.tag}>
                <Text style={styles.tagText}>#{tag.name}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.white},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: AppColors.red, fontSize: 16},
  image: {width: '100%', height: 200},
  caption: {
    fontSize: 12,
    color: AppColors.textLight,
    marginHorizontal: AppDimens.paddingLG,
    marginTop: 8,
    fontFamily: AppFonts.mediumItalic,
  },
  header: {padding: AppDimens.paddingLG},
  prefix: {
    fontSize: 14,
    color: AppColors.secondaryGreen,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    color: AppColors.textDark,
    marginBottom: 8,
    fontFamily: AppFonts.extraBold,
  },
  meta: {flexDirection: 'row', alignItems: 'center'},
  category: {
    fontSize: 12,
    fontFamily: AppFonts.extraBold,
    color: AppColors.textDark,
  },
  dot: {marginHorizontal: 4, color: AppColors.textLight},
  date: {
    fontSize: 12,
    color: AppColors.textLight,
    fontFamily: AppFonts.regular,
  },
  content: {
    paddingHorizontal: AppDimens.paddingLG,
    marginBottom: AppDimens.marginMD,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: AppDimens.paddingLG,
    marginBottom: AppDimens.marginMD,
  },
  tag: {
    backgroundColor: AppColors.darkGreen,
    borderRadius: 4,
    paddingHorizontal: AppDimens.paddingSM,
    paddingVertical: AppDimens.paddingSM,
    marginRight: AppDimens.marginSM,
    marginBottom: AppDimens.marginSM,
  },
  tagText: {fontSize: 10, color: AppColors.textDark},
  relatedContainer: {
    paddingHorizontal: AppDimens.paddingLG,
    paddingBottom: AppDimens.marginMD,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textDark,
    marginBottom: AppDimens.marginSM,
  },
});

export default DetailNewsScreen;
