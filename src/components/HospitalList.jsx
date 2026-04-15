import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import { hospitalList } from '../data/data';

const HospitalItem = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.hospitalImage}
          resizeMode="cover"
        />

        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {String(item.type)}
          </Text>
        </View>

        {/* Info RS */}
        <View style={styles.cardContent}>
          <Text style={styles.hospitalName} numberOfLines={1}>
            {String(item.name)}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.cityText}>
              {'📍 ' + String(item.city)}
            </Text>

            <Text style={styles.ratingText}>
              {'⭐ ' + String(item.rating)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function HospitalList() {
  const handlePress = (item) => {
    Alert.alert(
      `${item.name} 🏥`,
      `Kota: ${item.city}\nTipe: ${item.type}\nRating: ⭐ ${item.rating}\n\nKlik OK untuk lihat detail RS.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>
          {' Rumah Sakit Mitra'}
        </Text>
        <Text style={styles.seeAll}>
          {'Lihat Semua →'}
        </Text>
      </View>

      <FlatList
        data={hospitalList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HospitalItem item={item} onPress={handlePress} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        contentContainerStyle={styles.listContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
  },
  seeAll: {
    fontSize: 13,
    color: '#00C8A0',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 200,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hospitalImage: {
    width: '100%',
    height: 120,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(10,37,64,0.85)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
  },
  hospitalName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cityText: {
    fontSize: 11,
    color: '#5A7184',
  },
  ratingText: {
    fontSize: 11,
    color: '#5A7184',
    fontWeight: '600',
  },
});