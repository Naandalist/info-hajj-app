import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NewsCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          {/* Left Content Area Skeleton */}
          <SkeletonPlaceholder.Item flex={1} marginRight={40}>
            <SkeletonPlaceholder.Item
              width={80}
              height={20}
              borderRadius={4}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={4}
              marginBottom={6}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={20}
              borderRadius={4}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item
              width={100}
              height={15}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
          {/* Image Square Skeleton */}
          <SkeletonPlaceholder.Item width={80} height={80} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dashed',
    paddingBottom: 24,
    paddingVertical: 12,
  },
});

export default NewsCardSkeleton;
