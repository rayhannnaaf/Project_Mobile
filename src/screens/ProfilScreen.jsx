/**
 * ProfilScreen.js
 * Fitur: Data profil user, kartu asuransi, menu pengaturan
 * Komponen: ScrollView, Image, TouchableWithoutFeedback, Button
 */
import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image,
  TouchableWithoutFeedback, Button, StyleSheet, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { id: 1, icon: '📄', label: 'Data Polis Saya', sub: 'Lihat detail polis aktif' },
  { id: 2, icon: '👨‍👩‍👧', label: 'Anggota Keluarga', sub: '1 tanggungan terdaftar' },
  { id: 3, icon: '🏦', label: 'Rekening Bank', sub: 'BCA ****4321' },
  { id: 4, icon: '🔒', label: 'Keamanan Akun', sub: 'Password & PIN' },
  { id: 5, icon: '📞', label: 'Hubungi CS', sub: '1500-123 (24 jam)' },
  { id: 6, icon: '⭐', label: 'Beri Ulasan', sub: 'Bantu kami berkembang' },
];

export default function ProfilScreen() {
  const [notifOn, setNotifOn] = useState(Boolean(true));

  const handleNotifChange = (val) => {
    setNotifOn(Boolean(val));
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── HEADER PROFIL ── */}
        <View style={s.header}>
          {/* Foto profil dari CDN */}
          <TouchableWithoutFeedback onPress={() => Alert.alert('Ganti Foto', 'Fitur ganti foto profil')}>
            <View style={s.avatarWrapper}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' }}
                style={s.avatar}
                resizeMode="cover"
              />
              <View style={s.editBadge}>
                <Text style={{ fontSize: 12 }}>✏️</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <Text style={s.userName}>Budi Santoso</Text>
          <Text style={s.userEmail}>budi.santoso@email.com</Text>
          <Text style={s.userPhone}>📱 +62 812-3456-7890</Text>

          {/* Tombol Edit Profil menggunakan Button bawaan RN */}
          <View style={s.editBtnWrapper}>
            <Button
              title="✏️ Edit Profil"
              color="#00C8A0"
              onPress={() => Alert.alert('Edit Profil', 'Membuka form edit profil...')}
            />
          </View>
        </View>

        {/* ── KARTU ASURANSI ── */}
        <View style={s.insuranceCard}>
          {/* Background dekoratif */}
          <View style={s.cardDecor1} />
          <View style={s.cardDecor2} />

          <View style={s.cardTop}>
            <View>
              <Text style={s.cardBrand}>HealthShield</Text>
              <Text style={s.cardPaket}>Paket Standard</Text>
            </View>
            {/* Logo/foto kecil di kartu */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&q=80' }}
              style={s.cardLogo}
              resizeMode="cover"
            />
          </View>

          <Text style={s.cardNo}>HS-2024-00421</Text>

          <View style={s.cardBottom}>
            <View>
              <Text style={s.cardLabel}>Nama Peserta</Text>
              <Text style={s.cardValue}>Budi Santoso</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={s.cardLabel}>Berlaku Hingga</Text>
              <Text style={s.cardValue}>31/12/2025</Text>
            </View>
          </View>

          <View style={s.activePill}>
            <View style={s.activeDot} />
            <Text style={s.activeText}>Aktif</Text>
          </View>
        </View>

        {/* ── STATISTIK ── */}
        <View style={s.statsRow}>
          {[
            { icon: '🏥', val: '12', label: 'Kunjungan RS' },
            { icon: '✅', val: '8', label: 'Klaim Berhasil' },
            { icon: '⭐', val: '4.9', label: 'Rating Kami' },
          ].map((stat, i) => (
            <View key={i} style={s.statItem}>
              <Text style={{ fontSize: 22 }}>{stat.icon}</Text>
              <Text style={s.statVal}>{stat.val}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* ── MENU PENGATURAN ── */}
        <View style={s.menuBox}>
          <Text style={s.menuTitle}>⚙️ Pengaturan</Text>

          {/* Toggle Notifikasi */}
          <View style={s.menuItem}>
            <View style={s.menuLeft}>
              <View style={s.menuIcon}>
                <Text style={{ fontSize: 18 }}>🔔</Text>
              </View>
              <View>
                <Text style={s.menuLabel}>Notifikasi</Text>
                <Text style={s.menuSub}>Push notification aktif</Text>
              </View>
            </View>
            <Switch
              value={Boolean(notifOn)}
              onValueChange={handleNotifChange}
              trackColor={{ false: '#CBD5E1', true: '#00C8A0' }}
              thumbColor={'#ffffff'}
              ios_backgroundColor="#CBD5E1"
            />
          </View>

          <View style={{ height: 1, backgroundColor: '#F0F4F8' }} />

          {/* Menu items lainnya */}
          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              <TouchableWithoutFeedback
                onPress={() => Alert.alert(item.label, item.sub)}
              >
                <View style={s.menuItem}>
                  <View style={s.menuLeft}>
                    <View style={s.menuIcon}>
                      <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                    </View>
                    <View>
                      <Text style={s.menuLabel}>{item.label}</Text>
                      <Text style={s.menuSub}>{item.sub}</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#8FA3B1', fontSize: 16 }}>›</Text>
                </View>
              </TouchableWithoutFeedback>
              {i < MENU_ITEMS.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#F0F4F8' }} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Tombol Keluar */}
        <View style={s.logoutWrapper}>
          <Button
            title="🚪 Keluar dari Akun"
            color="#E53935"
            onPress={() =>
              Alert.alert('Keluar?', 'Kamu yakin ingin keluar dari akun?', [
                { text: 'Batal', style: 'cancel' },
                { text: 'Keluar', style: 'destructive' },
              ])
            }
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    backgroundColor: '#0A2540', alignItems: 'center',
    paddingTop: 24, paddingBottom: 28, gap: 6,
  },
  avatarWrapper: { position: 'relative', marginBottom: 4 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 3, borderColor: '#00C8A0',
  },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    elevation: 3,
  },
  userName: { fontSize: 20, fontWeight: '800', color: '#fff' },
  userEmail: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  userPhone: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  editBtnWrapper: { marginTop: 8, width: 160 },
  insuranceCard: {
    margin: 16, backgroundColor: '#0A2540', borderRadius: 20,
    padding: 20, overflow: 'hidden', elevation: 8,
    shadowColor: '#0A2540', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12,
  },
  cardDecor1: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)', top: -60, right: -40,
  },
  cardDecor2: {
    position: 'absolute', width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(0,200,160,0.1)', bottom: -30, left: -20,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  cardBrand: { fontSize: 18, fontWeight: '800', color: '#fff' },
  cardPaket: { fontSize: 12, color: '#00C8A0', marginTop: 2 },
  cardLogo: { width: 44, height: 44, borderRadius: 10, opacity: 0.8 },
  cardNo: { fontSize: 15, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, marginBottom: 20 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  cardLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 3 },
  cardValue: { fontSize: 13, fontWeight: '700', color: '#fff' },
  activePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,200,160,0.15)', alignSelf: 'flex-start',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#00C8A0' },
  activeText: { fontSize: 11, color: '#00C8A0', fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginHorizontal: 16, borderRadius: 16, padding: 16,
    justifyContent: 'space-around', elevation: 2, marginBottom: 16,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statVal: { fontSize: 18, fontWeight: '800', color: '#0A2540' },
  statLabel: { fontSize: 10, color: '#5A7184' },
  menuBox: {
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 16, overflow: 'hidden', elevation: 2, marginBottom: 16,
  },
  menuTitle: {
    fontSize: 14, fontWeight: '700', color: '#0A2540',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F4F8',
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { fontSize: 13, fontWeight: '600', color: '#0A2540' },
  menuSub: { fontSize: 11, color: '#8FA3B1', marginTop: 1 },
  logoutWrapper: { marginHorizontal: 16 },
});