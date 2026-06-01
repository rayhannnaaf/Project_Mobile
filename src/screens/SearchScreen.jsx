/**
 * SearchScreen.js
 * Fitur: Cari RS yang menerima BPJS
 * Komponen: FlatList, Image, TouchableWithoutFeedback, TextInput
 */
import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, Image, TouchableWithoutFeedback,
  TextInput, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data RS yang menyediakan layanan BPJS
const BPJS_HOSPITALS = [
  {
    id: '1',
    name: 'RSUP Dr. Cipto Mangunkusumo',
    city: 'Jakarta Pusat',
    address: 'Jl. Diponegoro No.71, Jakarta',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.8',
    phone: '(021) 500-135',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80',
  },
  {
    id: '2',
    name: 'RSUD Tarakan',
    city: 'Jakarta Pusat',
    address: 'Jl. Kyai Caringin No.7, Jakarta',
    type: 'RS Tipe B',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.5',
    phone: '(021) 345-0780',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  },
  {
    id: '3',
    name: 'RS Hasan Sadikin',
    city: 'Bandung',
    address: 'Jl. Pasteur No.38, Bandung',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.7',
    phone: '(022) 203-4953',
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&q=80',
  },
  {
    id: '4',
    name: 'RSUP Dr. Sardjito',
    city: 'Yogyakarta',
    address: 'Jl. Kesehatan No.1, Yogyakarta',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.8',
    phone: '(0274) 587-333',
    img: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80',
  },
  {
    id: '5',
    name: 'RSUD Dr. Soetomo',
    city: 'Surabaya',
    address: 'Jl. Mayjend Prof. Dr. Moestopo, Surabaya',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.7',
    phone: '(031) 501-1456',
    img: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&q=80',
  },
  {
    id: '6',
    name: 'RS Wahidin Sudirohusodo',
    city: 'Makassar',
    address: 'Jl. Perintis Kemerdekaan, Makassar',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.6',
    phone: '(0411) 584-576',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=80',
  },
  {
    id: '7',
    name: 'RS Adam Malik',
    city: 'Medan',
    address: 'Jl. Bunga Lau No.17, Medan',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 1', 'Kelas 2', 'Kelas 3'],
    rating: '4.5',
    phone: '(061) 836-0143',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80',
  },
  {
    id: '8',
    name: 'RSUD Ulin',
    city: 'Banjarmasin',
    address: 'Jl. Jend. A. Yani No.43, Banjarmasin',
    type: 'RS Tipe A',
    bpjsClass: ['Kelas 2', 'Kelas 3'],
    rating: '4.4',
    phone: '(0511) 325-2180',
    img: 'https://images.unsplash.com/photo-1578496480157-697fc14d2e55?w=400&q=80',
  },
];

// Komponen kartu RS BPJS
const BPJSCard = ({ item }) => (
  <TouchableWithoutFeedback
    onPress={() =>
      Alert.alert(
        `${item.name} 🏥`,
        `📍 ${item.address}\n📞 ${item.phone}\n⭐ Rating: ${item.rating}\n✅ BPJS: ${item.bpjsClass.join(', ')}`
      )
    }
  >
    <View style={s.card}>
      {/* Foto RS dari CDN */}
      <Image source={{ uri: item.img }} style={s.cardImg} resizeMode="cover" />

      {/* Badge BPJS */}
      <View style={s.bpjsBadge}>
        <Text style={s.bpjsText}>✅ BPJS</Text>
      </View>

      <View style={s.cardBody}>
        <View style={s.cardTop}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
            <Text style={s.cardCity}>📍 {item.city}</Text>
          </View>
          <View style={s.ratingBox}>
            <Text style={s.ratingTxt}>⭐ {item.rating}</Text>
          </View>
        </View>

        <View style={s.cardBottom}>
          <View style={s.typeBadge}>
            <Text style={s.typeText}>{item.type}</Text>
          </View>
          {/* Kelas BPJS yang tersedia */}
          <View style={s.classRow}>
            {item.bpjsClass.map((cls, i) => (
              <View key={i} style={s.classBadge}>
                <Text style={s.classTxt}>{cls}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  // useMemo: filter hanya dihitung ulang saat query atau data berubah
  // Ini optimasi performa — tidak filter ulang saat state lain berubah
  const filtered = useMemo(() =>
    BPJS_HOSPITALS.filter(
      (h) =>
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.city.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Cari RS BPJS 🔍</Text>
        <Text style={s.headerSub}>Temukan rumah sakit mitra BPJS terdekat</Text>
      </View>

      {/* Search Bar */}
      <View style={s.searchBox}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Cari nama RS atau kota..."
          placeholderTextColor="#8FA3B1"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableWithoutFeedback onPress={() => setQuery('')}>
            <View style={s.clearBtn}>
              <Text style={{ fontSize: 14, color: '#5A7184' }}>✕</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* Counter hasil */}
      <Text style={s.counter}>
        {filtered.length} RS BPJS ditemukan
      </Text>

      {/* FlatList daftar RS BPJS */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BPJSCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={{ fontSize: 40 }}>🏥</Text>
            <Text style={s.emptyText}>RS tidak ditemukan</Text>
            <Text style={s.emptySub}>Coba kata kunci lain</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    backgroundColor: '#0A2540', paddingHorizontal: 16,
    paddingTop: 16, paddingBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 14, paddingHorizontal: 14,
    marginTop: -16, // overlap ke header
    elevation: 4, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 14, color: '#0A2540' },
  clearBtn: { padding: 6 },
  counter: {
    fontSize: 12, color: '#5A7184', fontWeight: '600',
    marginHorizontal: 16, marginTop: 12, marginBottom: 4,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 16,
    overflow: 'hidden', elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6,
  },
  cardImg: { width: '100%', height: 140 },
  bpjsBadge: {
    position: 'absolute', top: 10, right: 10,
    backgroundColor: '#00C853', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  bpjsText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  cardBody: { padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  cardName: { fontSize: 14, fontWeight: '700', color: '#0A2540', marginBottom: 3 },
  cardCity: { fontSize: 12, color: '#5A7184' },
  ratingBox: {
    backgroundColor: '#FFF8E1', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  ratingTxt: { fontSize: 12, fontWeight: '700', color: '#F57F17' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  typeBadge: {
    backgroundColor: '#EFF6FF', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  typeText: { fontSize: 11, color: '#1565C0', fontWeight: '600' },
  classRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  classBadge: {
    backgroundColor: '#E8F5E9', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  classTxt: { fontSize: 11, color: '#2E7D32', fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#0A2540' },
  emptySub: { fontSize: 13, color: '#8FA3B1' },
});