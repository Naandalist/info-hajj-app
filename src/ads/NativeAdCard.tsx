import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  NativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
} from 'react-native-google-mobile-ads';
import {AppColors, AppFonts} from '@/constants';
import {nativeAdUnitId} from './adUnits';
import {mobileAdsReady} from './startMobileAds';

type NativeAdCardProps = {
  slotKey?: string;
};

const NativeAdCard: React.FC<NativeAdCardProps> = ({slotKey}) => {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);

  useEffect(() => {
    if (!nativeAdUnitId) {
      return;
    }

    let cancelled = false;
    let loaded: NativeAd | undefined;

    mobileAdsReady().then(async ok => {
      if (!ok || cancelled) {
        return;
      }
      try {
        loaded = await NativeAd.createForAdRequest(nativeAdUnitId, {
          startVideoMuted: true,
        });
        if (cancelled) {
          loaded.destroy();
          return;
        }
        setNativeAd(loaded);
      } catch {
        loaded?.destroy();
      }
    });

    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [slotKey]);

  if (!nativeAd) {
    return null;
  }

  const image = nativeAd.images?.[0] ?? nativeAd.icon;
  const imageAssetType = nativeAd.images?.[0]
    ? NativeAssetType.IMAGE
    : NativeAssetType.ICON;

  return (
    <View style={styles.cardContainer}>
      <NativeAdView nativeAd={nativeAd}>
        <View style={styles.contentRow}>
          <View style={styles.leftContentArea}>
            <View style={styles.headerRow}>
              <View style={styles.adBadge}>
                <Text style={styles.adBadgeText}>IKLAN</Text>
              </View>
              {nativeAd.advertiser ? (
                <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                  <Text style={styles.advertiserText} numberOfLines={1}>
                    {nativeAd.advertiser}
                  </Text>
                </NativeAsset>
              ) : null}
            </View>

            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={styles.headline} numberOfLines={3}>
                {nativeAd.headline}
              </Text>
            </NativeAsset>

            {nativeAd.body ? (
              <NativeAsset assetType={NativeAssetType.BODY}>
                <Text style={styles.body} numberOfLines={2}>
                  {nativeAd.body}
                </Text>
              </NativeAsset>
            ) : null}

            {nativeAd.callToAction ? (
              <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                <Text style={styles.cta}>{nativeAd.callToAction}</Text>
              </NativeAsset>
            ) : null}
          </View>

          {image?.url ? (
            <NativeAsset assetType={imageAssetType}>
              <Image
                source={{uri: image.url}}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </NativeAsset>
          ) : null}
        </View>
      </NativeAdView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: AppColors.white,
    marginBottom: 16,
    marginHorizontal: 16,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  adBadge: {
    backgroundColor: AppColors.secondaryGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  adBadgeText: {
    color: AppColors.white,
    fontSize: 10,
    fontFamily: AppFonts.bold,
  },
  advertiserText: {
    flex: 1,
    fontSize: 12,
    color: AppColors.textLight,
    fontFamily: AppFonts.medium,
  },
  headline: {
    fontSize: 16,
    fontFamily: AppFonts.extraBold,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 22,
  },
  body: {
    fontSize: 12,
    color: AppColors.textLight,
    fontFamily: AppFonts.regular,
    marginBottom: 8,
    lineHeight: 18,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.secondaryGreen,
    color: AppColors.white,
    fontSize: 12,
    fontFamily: AppFonts.bold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
  },
});

export default NativeAdCard;
