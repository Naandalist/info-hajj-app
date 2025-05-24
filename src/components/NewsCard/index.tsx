import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Image,
} from 'react-native';

interface NewsCardProps {
  category: string;
  description: string;
  date: string;
  imageUrl?: string;
  onPress?: () => void;
  categoryColor?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  category,
  description,
  date,
  imageUrl,
  onPress,
  categoryColor = '#28A745',
}) => {
  const imageSource: ImageSourcePropType | undefined = imageUrl
    ? {uri: imageUrl}
    : undefined;

  return (
    <TouchableOpacity onPress={onPress} style={cardStyles.cardContainer}>
      <View style={cardStyles.contentRow}>
        {/* Left Content Area */}
        <View style={cardStyles.leftContentArea}>
          <View
            style={[
              cardStyles.categoryTagBase,
              {backgroundColor: categoryColor},
            ]}>
            <Text style={cardStyles.categoryText}>
              {category.toUpperCase()}
            </Text>
          </View>

          <Text style={cardStyles.descriptionText}>{description}</Text>
          <Text style={cardStyles.dateText}>{date}</Text>
        </View>

        {/* Right Image Area */}
        {imageSource && (
          <View style={cardStyles.rightImageContainer}>
            <Image
              source={imageSource}
              style={cardStyles.imageStyle}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,

    marginHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dashed',
    paddingBottom: 10,
  },
  contentRow: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  leftContentArea: {
    flex: 1,
    marginRight: 12,
  },
  categoryTagBase: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainTitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#555555',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 22,
  },
  dateText: {
    fontSize: 12,
    color: '#777777',
  },
  rightImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
});

export default NewsCard;
