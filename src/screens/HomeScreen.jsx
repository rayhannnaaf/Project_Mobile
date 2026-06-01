/**
 * HomeScreen.jsx
 * Animasi:
 * 1. DiffClamp — header collapse/expand saat scroll
 * 2. Stagger entrance — kartu polis, quick actions, banner muncul berurutan
 * 3. Interpolation — notif bell bergoyang saat mount
 * 4. Gesture press scale — semua TouchableOpacity punya spring feedback
 */
import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, FlatList, Image,
  TouchableOpacity, StyleSheet, Alert, Dimensions, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');

const HEADER_HEIGHT = 68; // tinggi header yang akan di-collapse

const BANNERS = [
  {
    id: 'b1',
    title: 'Promo Spesial\nDiskon 30%',
    sub: 'Berlaku s/d 31 Des 2025',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    color: '#0A2540',
  },
  {
    id: 'b2',
    title: 'Konsultasi Dokter\nGratis Online',
    sub: 'Untuk member baru',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
    color: '#1B5E20',
  },
  {
    id: 'b3',
    title: 'Cashback 50K\nPembayaran Pertama',
    sub: 'Pakai GoPay & OVO',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80',
    color: '#4A148C',
  },
];

const HOSPITALS = [
  {
    id: '1',
    name: 'RS Cipto Mangunkusumo',
    city: 'Jakarta Pusat',
    type: 'RS Umum',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80',
  },
  {
    id: '2',
    name: 'RS Pondok Indah',
    city: 'Jakarta Selatan',
    type: 'RS Swasta',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  },
  {
    id: '3',
    name: 'RS Siloam',
    city: 'Tangerang',
    type: 'RS Swasta',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=80',
  },
  {
    id: '4',
    name: 'RS Hasan Sadikin',
    city: 'Bandung',
    type: 'RS Umum',
    rating: '4.6',
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&q=80',
  },
];

const QUICK_ACTIONS = [
  { icon: '🏥', label: 'Cari RS' },
  { icon: '📋', label: 'Klaim' },
  { icon: '💊', label: 'Obat' },
  { icon: '👨‍⚕️', label: 'Dokter' },
];

// ── Komponen tombol dengan spring press feedback ──
function AnimPressable({ onPress, children, style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.93,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  // ── 1. DiffClamp untuk collapsing header ──
  const scrollY = useRef(new Animated.Value(0)).current;

  // diffClamp menjepit delta scroll antara 0 dan HEADER_HEIGHT
  const clampedScroll = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerTranslateY = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // ── 2. Stagger entrance animations ──
  const cardAnim  = useRef(new Animated.Value(0)).current; // kartu polis
  const qaAnim    = useRef(new Animated.Value(0)).current; // quick actions
  const bannerAnim= useRef(new Animated.Value(0)).current; // banner
  const listAnim  = useRef(new Animated.Value(0)).current; // RS list

  useEffect(() => {
    Animated.stagger(120, [
      Animated.spring(cardAnim,   { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(qaAnim,     { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(bannerAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(listAnim,   { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
  }, []);

  const makeEntrance = (anim, offsetY = 30) => ({
    opacity: anim,
    transform: [{
      translateY: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [offsetY, 0],
      }),
    }],
  });

  // ── 3. Notif bell shake animation ──
  const bellShake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shake = () =>
      Animated.sequence([
        Animated.timing(bellShake, { toValue: 1,  duration: 80,  useNativeDriver: true }),
        Animated.timing(bellShake, { toValue: -1, duration: 80,  useNativeDriver: true }),
        Animated.timing(bellShake, { toValue: 1,  duration: 80,  useNativeDriver: true }),
        Animated.timing(bellShake, { toValue: -1, duration: 80,  useNativeDriver: true }),
        Animated.timing(bellShake, { toValue: 0,  duration: 80,  useNativeDriver: true }),
      ]);

    // Delay sedikit lalu guncang, ulangi setiap 4 detik
    const timeout = setTimeout(() => {
      shake().start();
      const interval = setInterval(() => shake().start(), 4000);
      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const bellRotate = bellShake.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-20deg', '20deg'],
  });

  return (
    <SafeAreaView style={s.safe} edges={['top']}>

      {/* ── HEADER dengan DiffClamp collapse ── */}
      <Animated.View
        style={[
          s.header,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={s.headerLeft}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }}
            style={s.avatar}
          />
          <View>
            <Text style={s.greet}>Selamat Pagi 👋</Text>
            <Text style={s.name}>Budi Santoso</Text>
          </View>
        </View>

        {/* Notif bell dengan shake interpolation */}
        <TouchableOpacity onPress={() => Alert.alert('🔔 Notifikasi', '3 notifikasi baru')}>
          <View style={s.notifBtn}>
            <Animated.Text
              style={{ fontSize: 18, transform: [{ rotate: bellRotate }] }}
            >
              🔔
            </Animated.Text>
            <View style={s.notifBadge}>
              <Text style={s.notifNum}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* ── SCROLL VIEW dengan listener untuk DiffClamp ── */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: HEADER_HEIGHT, // kompensasi header yang overlap
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >

        {/* ── KARTU POLIS — entrance animation ── */}
        <Animated.View style={makeEntrance(cardAnim)}>
          <AnimPressable
            onPress={() => Alert.alert('Polis', 'Paket Standard aktif')}
            style={s.policyCard}
          >
            <View>
              <Text style={s.polLabel}>Status Polis</Text>
              <Text style={s.polName}>Paket Standard</Text>
              <View style={s.activeBadge}>
                <View style={s.dot} />
                <Text style={s.activeText}>Aktif</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.polLabel}>Berlaku hingga</Text>
              <Text style={s.polDate}>31 Des 2025</Text>
              <Text style={s.polNo}>HS-2024-00421</Text>
            </View>
          </AnimPressable>
        </Animated.View>

        {/* ── QUICK ACTIONS — entrance + per-item stagger ── */}
        <Animated.View style={[s.qaBox, makeEntrance(qaAnim)]}>
          <Text style={s.secTitle}>⚡ Aksi Cepat</Text>
          <View style={s.qaRow}>
            {QUICK_ACTIONS.map((q, i) => (
              <QAItem key={i} item={q} index={i} />
            ))}
          </View>
        </Animated.View>

        {/* ── BANNER SCROLL — entrance animation ── */}
        <Animated.View style={makeEntrance(bannerAnim, 20)}>
          <Text style={[s.secTitle, { marginHorizontal: 16, marginBottom: 10 }]}>🎁 Promo</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {BANNERS.map((b) => (
              <BannerCard key={b.id} banner={b} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* ── DAFTAR RS — entrance animation ── */}
        <Animated.View style={[{ marginTop: 16 }, makeEntrance(listAnim, 20)]}>
          <View style={s.rowBetween}>
            <Text style={[s.secTitle, { marginHorizontal: 16 }]}>🏥 RS Mitra</Text>
            <Text style={[s.seeAll, { marginRight: 16 }]}>Lihat Semua →</Text>
          </View>
          <FlatList
            data={HOSPITALS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginTop: 10 }}
            renderItem={({ item, index }) => <HospitalCard item={item} index={index} />}
          />
        </Animated.View>

      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// ── Quick Action Item dengan individual spring masuk ──
function QAItem({ item, index }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      delay: 400 + index * 80,
      useNativeDriver: true,
      tension: 80,
      friction: 7,
    }).start();
  }, []);

  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        opacity: anim,
        transform: [{ scale: anim }],
      }}
    >
      <TouchableOpacity
        onPress={() => Alert.alert(item.label)}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, tension: 300, friction: 10 }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }).start()
        }
        activeOpacity={1}
      >
        <Animated.View style={[s.qaItem, { transform: [{ scale }] }]}>
          <View style={s.qaIcon}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
          </View>
          <Text style={s.qaLabel}>{item.label}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Banner Card dengan scale press ──
function BannerCard({ banner }) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <TouchableOpacity
      onPress={() => Alert.alert(banner.title.replace('\n', ' '))}
      onPressIn={() =>
        Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, tension: 300, friction: 10 }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }).start()
      }
      activeOpacity={1}
    >
      <Animated.View style={[s.bannerCard, { transform: [{ scale }] }]}>
        <Image source={{ uri: banner.img }} style={s.bannerImg} resizeMode="cover" />
        <View style={[s.bannerOverlay, { backgroundColor: banner.color + 'CC' }]} />
        <View style={s.bannerText}>
          <Text style={s.bannerTitle}>{banner.title}</Text>
          <Text style={s.bannerSub}>{banner.sub}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ── Hospital Card dengan slide-in dari kanan + press scale ──
function HospitalCard({ item, index }) {
  const slideAnim = useRef(new Animated.Value(60)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: 600 + index * 100,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        delay: 600 + index * 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Alert.alert(item.name, `${item.city} · ⭐ ${item.rating}`)}
      onPressIn={() =>
        Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, tension: 300, friction: 10 }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }).start()
      }
      activeOpacity={1}
    >
      <Animated.View
        style={[
          s.rsCard,
          {
            opacity: opacityAnim,
            transform: [{ translateX: slideAnim }, { scale }],
          },
        ]}
      >
        <Image source={{ uri: item.img }} style={s.rsImg} resizeMode="cover" />
        <View style={s.rsTypeBadge}>
          <Text style={s.rsTypeTxt}>{item.type}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={s.rsName} numberOfLines={1}>{item.name}</Text>
          <View style={s.rowBetween}>
            <Text style={s.rsCity}>📍 {item.city}</Text>
            <Text style={s.rsRating}>⭐ {item.rating}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    zIndex: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#0A2540', paddingHorizontal: 16,
    height: HEADER_HEIGHT,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#00C8A0' },
  greet: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  name: { fontSize: 15, fontWeight: '700', color: '#fff' },
  notifBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center',
  },
  notifBadge: {
    position: 'absolute', top: 4, right: 4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#E53935', justifyContent: 'center', alignItems: 'center',
  },
  notifNum: { fontSize: 9, color: '#fff', fontWeight: '800' },
  policyCard: {
    margin: 16, backgroundColor: '#0A2540', borderRadius: 16,
    padding: 16, flexDirection: 'row', justifyContent: 'space-between',
    elevation: 6, shadowColor: '#0A2540', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10,
  },
  polLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  polName: { fontSize: 18, fontWeight: '800', color: '#fff', marginVertical: 2 },
  activeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(0,200,160,0.15)', alignSelf: 'flex-start',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00C8A0' },
  activeText: { fontSize: 11, color: '#00C8A0', fontWeight: '700' },
  polDate: { fontSize: 15, fontWeight: '700', color: '#fff' },
  polNo: { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  qaBox: {
    backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16,
    padding: 16, elevation: 2, marginBottom: 16,
  },
  secTitle: { fontSize: 16, fontWeight: '700', color: '#0A2540', marginBottom: 4 },
  qaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  qaItem: { alignItems: 'center', gap: 6 },
  qaIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center',
  },
  qaLabel: { fontSize: 11, color: '#0A2540', fontWeight: '600' },
  bannerCard: {
    width: SW - 64, height: 150, borderRadius: 14, overflow: 'hidden',
  },
  bannerImg: { ...StyleSheet.absoluteFillObject },
  bannerOverlay: { ...StyleSheet.absoluteFillObject },
  bannerText: { position: 'absolute', bottom: 14, left: 14 },
  bannerTitle: { fontSize: 17, fontWeight: '800', color: '#fff', lineHeight: 23 },
  bannerSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 3 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { fontSize: 13, color: '#00C8A0', fontWeight: '600' },
  rsCard: {
    width: 190, borderRadius: 14, backgroundColor: '#fff',
    overflow: 'hidden', elevation: 3,
  },
  rsImg: { width: '100%', height: 110 },
  rsTypeBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: 'rgba(10,37,64,0.85)', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  rsTypeTxt: { fontSize: 10, color: '#fff', fontWeight: '600' },
  rsName: { fontSize: 13, fontWeight: '700', color: '#0A2540', marginBottom: 6 },
  rsCity: { fontSize: 11, color: '#5A7184' },
  rsRating: { fontSize: 11, color: '#5A7184', fontWeight: '600' },
});