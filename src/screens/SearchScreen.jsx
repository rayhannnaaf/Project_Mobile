/**
 * SearchScreen.jsx
 * Animasi:
 * 1. Search bar — focus expand + border color interpolation
 * 2. FlatList items — slide-up entrance dengan stagger per item
 * 3. Filter chips — spring bounce saat dipilih
 * 4. Clear button — fade + scale masuk/keluar
 * 5. Empty state — pulse animation
 */
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  TextInput, StyleSheet, Alert, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const FILTER_CHIPS = ['Semua', 'Tipe A', 'Tipe B', 'Jakarta', 'Bandung', 'Surabaya'];

// ── Animated BPJS Card dengan slide-up per item ──
const BPJSCard = React.memo(({ item, index }) => {
  const slideAnim  = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scale       = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 80,
        useNativeDriver: true,
        tension: 65,
        friction: 9,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        delay: index * 80,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 10 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }).start();

  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          `${item.name} 🏥`,
          `📍 ${item.address}\n📞 ${item.phone}\n⭐ ${item.rating}\n✅ ${item.bpjsClass.join(', ')}`
        )
      }
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          s.card,
          {
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }, { scale }],
          },
        ]}
      >
        <Image source={{ uri: item.img }} style={s.cardImg} resizeMode="cover" />
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
            <View style={s.classRow}>
              {item.bpjsClass.map((cls, i) => (
                <View key={i} style={s.classBadge}>
                  <Text style={s.classTxt}>{cls}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

// ── Filter Chip dengan spring bounce ──
function FilterChip({ label, isActive, onPress }) {
  const scale  = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(bgAnim, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: false,
      tension: 120,
      friction: 8,
    }).start();
  }, [isActive]);

  const handlePress = () => {
    // Spring bounce saat dipilih
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, tension: 400, friction: 6 }),
      Animated.spring(scale, { toValue: 1,    useNativeDriver: true, tension: 200, friction: 6 }),
    ]).start();
    onPress(label);
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#0A2540'],
  });
  const color = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#5A7184', '#fff'],
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <Animated.View
        style={[
          s.chip,
          { backgroundColor, transform: [{ scale }] },
          isActive && s.chipActive,
        ]}
      >
        <Animated.Text style={[s.chipTxt, { color }]}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const [query, setQuery]           = useState('');
  const [activeFilter, setFilter]   = useState('Semua');
  const [isFocused, setFocused]     = useState(false);

  // ── Search bar focus animation ──
  const focusAnim = useRef(new Animated.Value(0)).current;
  // Clear button visibility
  const clearOpacity = useRef(new Animated.Value(0)).current;
  const clearScale   = useRef(new Animated.Value(0.5)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.spring(focusAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 120,
      friction: 8,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.spring(focusAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 120,
      friction: 8,
    }).start();
  };

  // Animasi clear button saat teks berubah
  useEffect(() => {
    if (query.length > 0) {
      Animated.parallel([
        Animated.spring(clearOpacity, { toValue: 1, useNativeDriver: true, tension: 200 }),
        Animated.spring(clearScale,   { toValue: 1, useNativeDriver: true, tension: 200 }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(clearOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.spring(clearScale,   { toValue: 0.5, useNativeDriver: true, tension: 200 }),
      ]).start();
    }
  }, [query]);

  // Interpolate border color saat focus
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0.08)', '#00C8A0'],
  });
  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.06, 0.18],
  });

  const filtered = useMemo(() => {
    let result = BPJS_HOSPITALS;
    if (query) {
      result = result.filter(
        h =>
          h.name.toLowerCase().includes(query.toLowerCase()) ||
          h.city.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (activeFilter !== 'Semua') {
      result = result.filter(
        h => h.type.includes(activeFilter) || h.city === activeFilter
      );
    }
    return result;
  }, [query, activeFilter]);

  // Re-mount list ketika filter berubah agar slide-in ulang
  const listKey = `${activeFilter}-${query}`;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Cari RS BPJS 🔍</Text>
        <Text style={s.headerSub}>Temukan rumah sakit mitra BPJS terdekat</Text>
      </View>

      {/* ── Search Bar dengan focus animation ── */}
      <Animated.View
        style={[
          s.searchBox,
          {
            borderColor,
            shadowOpacity,
          },
        ]}
      >
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Cari nama RS atau kota..."
          placeholderTextColor="#8FA3B1"
          value={query}
          onChangeText={setQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* Clear button dengan fade + scale */}
        <Animated.View
          style={{
            opacity: clearOpacity,
            transform: [{ scale: clearScale }],
          }}
          pointerEvents={query.length > 0 ? 'auto' : 'none'}
        >
          <TouchableOpacity onPress={() => setQuery('')} style={s.clearBtn}>
            <Text style={{ fontSize: 14, color: '#5A7184' }}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* ── Filter Chips ── */}
      <FlatList
        data={FILTER_CHIPS}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chipRow}
        renderItem={({ item }) => (
          <FilterChip
            label={item}
            isActive={activeFilter === item}
            onPress={setFilter}
          />
        )}
        style={{ flexGrow: 0 }}
      />

      {/* Counter hasil */}
      <Text style={s.counter}>{filtered.length} RS BPJS ditemukan</Text>

      {/* ── FlatList RS BPJS ── */}
      <FlatList
        key={listKey}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <BPJSCard item={item} index={index} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
}

// ── Empty state dengan pulse animation ──
function EmptyState() {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.empty}>
      <Animated.Text style={{ fontSize: 48, transform: [{ scale: pulse }] }}>🏥</Animated.Text>
      <Text style={s.emptyText}>RS tidak ditemukan</Text>
      <Text style={s.emptySub}>Coba kata kunci lain</Text>
    </View>
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
    marginTop: -16,
    borderWidth: 1.5,
    elevation: 4, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 6,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 14, color: '#0A2540' },
  clearBtn: { padding: 6 },
  chipRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip: {
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
  },
  chipActive: { borderColor: '#0A2540' },
  chipTxt: { fontSize: 12, fontWeight: '600' },
  counter: {
    fontSize: 12, color: '#5A7184', fontWeight: '600',
    marginHorizontal: 16, marginBottom: 4,
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
  ratingBox: { backgroundColor: '#FFF8E1', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  ratingTxt: { fontSize: 12, fontWeight: '700', color: '#F57F17' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  typeBadge: { backgroundColor: '#EFF6FF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  typeText: { fontSize: 11, color: '#1565C0', fontWeight: '600' },
  classRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  classBadge: { backgroundColor: '#E8F5E9', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  classTxt: { fontSize: 11, color: '#2E7D32', fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: '700', color: '#0A2540' },
  emptySub: { fontSize: 13, color: '#8FA3B1' },
});