import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

const DetailNewsSkeleton: React.FC = () => (
  <View style={styles.container}>
    <SkeletonPlaceholder>
      {/* Hero image */}
      <SkeletonPlaceholder.Item width={width} height={200} />

      <SkeletonPlaceholder.Item paddingHorizontal={16} marginTop={16}>
        {/* Title */}
        <SkeletonPlaceholder.Item width="60%" height={24} borderRadius={4} />

        {/* Meta row: category + date */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginTop={12}>
          <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={40}
            height={14}
            borderRadius={4}
            marginLeft={12}
          />
        </SkeletonPlaceholder.Item>

        {/* Author / source */}
        <SkeletonPlaceholder.Item
          width="40%"
          height={14}
          borderRadius={4}
          marginTop={12}
        />

        {/* Content paragraphs */}
        <SkeletonPlaceholder.Item marginTop={24}>
          {[...Array(5)].map((_, i) => (
            <SkeletonPlaceholder.Item
              key={i}
              width="100%"
              height={14}
              borderRadius={4}
              marginBottom={12}
            />
          ))}
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item marginTop={24}>
          {[...Array(5)].map((_, i) => (
            <SkeletonPlaceholder.Item
              key={i}
              width="100%"
              height={14}
              borderRadius={4}
              marginBottom={12}
            />
          ))}
        </SkeletonPlaceholder.Item>

        {/* Related heading */}
        <SkeletonPlaceholder.Item
          width="30%"
          height={18}
          borderRadius={4}
          marginTop={24}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default DetailNewsSkeleton;
