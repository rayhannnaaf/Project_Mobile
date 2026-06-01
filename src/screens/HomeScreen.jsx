/**
 * HomeScreen.js
 * Komponen: ScrollView, FlatList, Image, TouchableWithoutFeedback, Button
 */
import React from 'react';
import {
  View, Text, ScrollView, FlatList, Image,
  TouchableWithoutFeedback, StyleSheet, Alert, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');

// Data banner promo
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

// Data rumah sakit (non-BPJS untuk Home, BPJS ada di SearchScreen)
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

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* ── HEADER ── */}
      <View style={s.header}>
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
        <TouchableWithoutFeedback onPress={() => Alert.alert('🔔 Notifikasi', '3 notifikasi baru')}>
          <View style={s.notifBtn}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
            <View style={s.notifBadge}><Text style={s.notifNum}>3</Text></View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* ── KARTU POLIS ── */}
        <View style={s.policyCard}>
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
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={s.qaBox}>
          <Text style={s.secTitle}>⚡ Aksi Cepat</Text>
          <View style={s.qaRow}>
            {QUICK_ACTIONS.map((q, i) => (
              <TouchableWithoutFeedback key={i} onPress={() => Alert.alert(q.label)}>
                <View style={s.qaItem}>
                  <View style={s.qaIcon}><Text style={{ fontSize: 22 }}>{q.icon}</Text></View>
                  <Text style={s.qaLabel}>{q.label}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        {/* ── BANNER SCROLL ── */}
        <Text style={[s.secTitle, { marginHorizontal: 16, marginBottom: 10 }]}>🎁 Promo</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        >
          {BANNERS.map((b) => (
            <TouchableWithoutFeedback key={b.id} onPress={() => Alert.alert(b.title.replace('\n', ' '))}>
              <View style={s.bannerCard}>
                <Image source={{ uri: b.img }} style={s.bannerImg} resizeMode="cover" />
                <View style={[s.bannerOverlay, { backgroundColor: b.color + 'CC' }]} />
                <View style={s.bannerText}>
                  <Text style={s.bannerTitle}>{b.title}</Text>
                  <Text style={s.bannerSub}>{b.sub}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>

        {/* ── DAFTAR RS (FlatList horizontal) ── */}
        <View style={{ marginTop: 16 }}>
          <View style={s.rowBetween}>
            <Text style={[s.secTitle, { marginHorizontal: 16 }]}>🏥 RS Mitra</Text>
            <Text style={[s.seeAll, { marginRight: 16 }]}>Lihat Semua →</Text>
          </View>
          <FlatList
            data={HOSPITALS}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12, marginTop: 10 }}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => Alert.alert(item.name, `${item.city} · ⭐ ${item.rating}`)}>
                <View style={s.rsCard}>
                  <Image source={{ uri: item.img }} style={s.rsImg} resizeMode="cover" />
                  <View style={s.rsTypeBadge}><Text style={s.rsTypeTxt}>{item.type}</Text></View>
                  <View style={{ padding: 10 }}>
                    <Text style={s.rsName} numberOfLines={1}>{item.name}</Text>
                    <View style={s.rowBetween}>
                      <Text style={s.rsCity}>📍 {item.city}</Text>
                      <Text style={s.rsRating}>⭐ {item.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#0A2540', paddingHorizontal: 16, paddingVertical: 12,
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
    padding: 16, elevation: 2,
  },
  secTitle: { fontSize: 16, fontWeight: '700', color: '#0A2540', marginBottom: 4 },
  qaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  qaItem: { alignItems: 'center', flex: 1, gap: 6 },
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