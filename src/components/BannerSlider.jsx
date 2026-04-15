import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { bannerList } from '../data/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;

export default function BannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (BANNER_WIDTH + 12));
    setActiveIndex(index);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>
        {'🎁 Promo & Penawaran'}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {bannerList.map((banner) => (
          <TouchableWithoutFeedback
            key={banner.id}
            onPress={() =>
              Alert.alert(
                'Promo Dipilih! 🎉',
                `Kamu memilih: ${String(banner.title).replace('\n', ' ')}`
              )
            }
          >
            <View style={styles.bannerCard}>
              <Image
                source={{ uri: banner.image }}
                style={styles.bannerImage}
                resizeMode="cover"
              />

              <View
                style={[
                  styles.overlay,
                  { backgroundColor: banner.color + 'CC' },
                ]}
              />

              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>
                  {String(banner.title)}
                </Text>
                <Text style={styles.bannerSubtitle}>
                  {String(banner.subtitle)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>

      <View style={styles.dotRow}>
        {bannerList.map((_, index) => (
          <View
            key={index.toString()}
            style={[
              styles.dot,
              activeIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
  },
  bannerText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#0A2540',
  },
});