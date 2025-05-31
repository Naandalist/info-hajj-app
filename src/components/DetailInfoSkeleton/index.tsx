import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

const DetailInfoSkeleton: React.FC = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item paddingHorizontal={16} paddingTop={16}>
      {/* Avatar */}
      <SkeletonPlaceholder.Item
        width={100}
        height={100}
        borderRadius={8}
        alignSelf="center"
      />

      {/* Name */}
      <SkeletonPlaceholder.Item
        width={200}
        height={20}
        borderRadius={4}
        marginTop={16}
        alignSelf="center"
      />

      {/* Location */}
      <SkeletonPlaceholder.Item
        width={250}
        height={14}
        borderRadius={4}
        marginTop={8}
        alignSelf="center"
      />

      {/* Porsi & Passport */}
      <SkeletonPlaceholder.Item
        width={180}
        height={14}
        borderRadius={4}
        marginTop={12}
        alignSelf="center"
      />
      <SkeletonPlaceholder.Item
        width={180}
        height={14}
        borderRadius={4}
        marginTop={6}
        alignSelf="center"
      />

      {/* Status badge */}
      <SkeletonPlaceholder.Item
        width={140}
        height={32}
        borderRadius={4}
        marginTop={16}
        alignSelf="center"
      />

      {/* Divider */}
      <SkeletonPlaceholder.Item
        width={width - 32}
        height={1}
        borderRadius={0}
        marginTop={24}
        alignSelf="center"
      />

      {/* Section title */}
      <SkeletonPlaceholder.Item
        width={180}
        height={18}
        borderRadius={4}
        marginTop={24}
      />

      {/* Info rows */}
      {Array.from({length: 6}).map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          flexDirection="row"
          justifyContent="space-between"
          marginTop={16}>
          <SkeletonPlaceholder.Item width={140} height={14} borderRadius={4} />
          <SkeletonPlaceholder.Item width={140} height={14} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      ))}

      {/* Divider */}
      <SkeletonPlaceholder.Item
        width={width - 32}
        height={1}
        borderRadius={0}
        marginTop={24}
        alignSelf="center"
      />

      {/* Next section title */}
      <SkeletonPlaceholder.Item
        width={160}
        height={18}
        borderRadius={4}
        marginTop={24}
      />

      {/* Placeholder for a few lines under next section */}
      {Array.from({length: 3}).map((_, i) => (
        <SkeletonPlaceholder.Item
          key={i}
          width="100%"
          height={14}
          borderRadius={4}
          marginTop={16}
        />
      ))}
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

export default DetailInfoSkeleton;
