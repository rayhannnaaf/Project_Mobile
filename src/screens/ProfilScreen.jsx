/**
 * ProfilScreen.jsx
 * Animasi:
 * 1. Kartu asuransi — flip 3D (rotateY interpolation) saat ditekan
 * 2. Stats — number count-up animation saat mount
 * 3. Menu items — stagger slide-in dari kiri
 * 4. Avatar — scale spring saat mount
 * 5. Logout button — shake warning animation
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Image,
  TouchableOpacity, StyleSheet, Alert, Switch, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MENU_ITEMS = [
  { id: 1, icon: '📄', label: 'Data Polis Saya',    sub: 'Lihat detail polis aktif' },
  { id: 2, icon: '👨‍👩‍👧', label: 'Anggota Keluarga', sub: '1 tanggungan terdaftar' },
  { id: 3, icon: '🏦', label: 'Rekening Bank',      sub: 'BCA ****4321' },
  { id: 4, icon: '🔒', label: 'Keamanan Akun',      sub: 'Password & PIN' },
  { id: 5, icon: '📞', label: 'Hubungi CS',          sub: '1500-123 (24 jam)' },
  { id: 6, icon: '⭐', label: 'Beri Ulasan',          sub: 'Bantu kami berkembang' },
];

const STATS = [
  { icon: '🏥', target: 12,  label: 'Kunjungan RS',   suffix: '' },
  { icon: '✅', target: 8,   label: 'Klaim Berhasil', suffix: '' },
  { icon: '⭐', target: 4.9, label: 'Rating Kami',    suffix: '' },
];

export default function ProfilScreen() {
  const [notifOn, setNotifOn]   = useState(true);
  const [isFlipped, setFlipped] = useState(false);

  // ── 1. Kartu flip 3D ──
  const flipAnim = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue,
      useNativeDriver: true,
      tension: 60,
      friction: 9,
    }).start();
    setFlipped(!isFlipped);
  };

  // Sisi depan: 0 → 90deg; sisi belakang: -90 → 0deg
  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '90deg'],
  });
  const backRotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-90deg', '-90deg', '0deg'],
  });
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.49, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.49, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  // ── 2. Avatar spring entrance ──
  const avatarScale = useRef(new Animated.Value(0)).current;
  const headerAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(avatarScale, {
        toValue: 1,
        delay: 100,
        useNativeDriver: true,
        tension: 60,
        friction: 6,
      }),
      Animated.timing(headerAnim, {
        toValue: 1,
        delay: 300,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── 3. Menu stagger slide-in ──
  const menuAnims = useRef(MENU_ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      70,
      menuAnims.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 70,
          friction: 9,
          delay: 500,
        })
      )
    ).start();
  }, []);

  // ── 4. Logout shake ──
  const logoutShake = useRef(new Animated.Value(0)).current;

  const triggerLogout = () => {
    Animated.sequence([
      Animated.timing(logoutShake, { toValue: 6,  duration: 60, useNativeDriver: true }),
      Animated.timing(logoutShake, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(logoutShake, { toValue: 6,  duration: 60, useNativeDriver: true }),
      Animated.timing(logoutShake, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(logoutShake, { toValue: 0,  duration: 60, useNativeDriver: true }),
    ]).start(() =>
      Alert.alert('Keluar?', 'Kamu yakin ingin keluar?', [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive' },
      ])
    );
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── HEADER PROFIL dengan avatar spring ── */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => Alert.alert('Ganti Foto', 'Fitur ganti foto profil')}>
            <Animated.View
              style={[s.avatarWrapper, { transform: [{ scale: avatarScale }] }]}
            >
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' }}
                style={s.avatar}
                resizeMode="cover"
              />
              <View style={s.editBadge}><Text style={{ fontSize: 12 }}>✏️</Text></View>
            </Animated.View>
          </TouchableOpacity>

          <Animated.View
            style={{
              opacity: headerAnim,
              transform: [{
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1], outputRange: [16, 0],
                }),
              }],
              alignItems: 'center', gap: 4,
            }}
          >
            <Text style={s.userName}>Budi Santoso</Text>
            <Text style={s.userEmail}>budi.santoso@email.com</Text>
            <Text style={s.userPhone}>📱 +62 812-3456-7890</Text>
          </Animated.View>

          <View style={s.editBtnWrapper}>
            <TouchableOpacity
              style={s.editBtn}
              onPress={() => Alert.alert('Edit Profil', 'Membuka form edit profil...')}
            >
              <Text style={s.editBtnTxt}>✏️ Edit Profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── KARTU ASURANSI FLIP ── */}
        <TouchableOpacity onPress={handleFlip} style={s.cardWrapper} activeOpacity={1}>
          {/* Sisi Depan */}
          <Animated.View
            style={[
              s.insuranceCard,
              {
                opacity: frontOpacity,
                transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
                position: 'absolute', top: 0, left: 0, right: 0,
              },
            ]}
          >
            <View style={s.cardDecor1} />
            <View style={s.cardDecor2} />
            <View style={s.cardTop}>
              <View>
                <Text style={s.cardBrand}>HealthShield</Text>
                <Text style={s.cardPaket}>Paket Standard</Text>
              </View>
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
            <Text style={s.flipHint}>Ketuk untuk balik kartu 🔄</Text>
          </Animated.View>

          {/* Sisi Belakang */}
          <Animated.View
            style={[
              s.insuranceCard,
              s.cardBack,
              {
                opacity: backOpacity,
                transform: [{ perspective: 1000 }, { rotateY: backRotate }],
              },
            ]}
          >
            <View style={s.cardDecor1} />
            <Text style={[s.cardBrand, { marginBottom: 12 }]}>Info Klaim</Text>
            {[
              { label: 'Limit Rawat Inap',  val: 'Rp 150.000.000 / tahun' },
              { label: 'Limit Rawat Jalan', val: 'Unlimited' },
              { label: 'Klaim Tersisa',     val: 'Rp 148.650.000' },
              { label: 'Tanggungan',        val: '1 anak terdaftar' },
            ].map((row, i) => (
              <View key={i} style={s.backRow}>
                <Text style={s.cardLabel}>{row.label}</Text>
                <Text style={s.cardValue}>{row.val}</Text>
              </View>
            ))}
            <Text style={s.flipHint}>Ketuk untuk balik kartu 🔄</Text>
          </Animated.View>

          {/* Spacer agar wrapper punya tinggi */}
          <View style={{ height: 180 }} />
        </TouchableOpacity>

        {/* ── STATISTIK dengan count-up ── */}
        <View style={s.statsRow}>
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} delay={i * 120} />
          ))}
        </View>

        {/* ── MENU PENGATURAN dengan stagger ── */}
        <View style={s.menuBox}>
          <Text style={s.menuTitle}>⚙️ Pengaturan</Text>

          {/* Toggle Notifikasi */}
          <View style={s.menuItem}>
            <View style={s.menuLeft}>
              <View style={s.menuIcon}><Text style={{ fontSize: 18 }}>🔔</Text></View>
              <View>
                <Text style={s.menuLabel}>Notifikasi</Text>
                <Text style={s.menuSub}>Push notification aktif</Text>
              </View>
            </View>
            <Switch
              value={notifOn}
              onValueChange={setNotifOn}
              trackColor={{ false: '#CBD5E1', true: '#00C8A0' }}
              thumbColor="#fff"
              ios_backgroundColor="#CBD5E1"
            />
          </View>
          <View style={{ height: 1, backgroundColor: '#F0F4F8' }} />

          {MENU_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              <Animated.View
                style={{
                  opacity: menuAnims[i],
                  transform: [{
                    translateX: menuAnims[i].interpolate({
                      inputRange: [0, 1], outputRange: [-40, 0],
                    }),
                  }],
                }}
              >
                <TouchableOpacity
                  onPress={() => Alert.alert(item.label, item.sub)}
                  activeOpacity={0.7}
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
                </TouchableOpacity>
              </Animated.View>
              {i < MENU_ITEMS.length - 1 && (
                <View style={{ height: 1, backgroundColor: '#F0F4F8' }} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* ── LOGOUT dengan shake warning ── */}
        <Animated.View
          style={[
            s.logoutWrapper,
            { transform: [{ translateX: logoutShake }] },
          ]}
        >
          <TouchableOpacity style={s.logoutBtn} onPress={triggerLogout}>
            <Text style={s.logoutTxt}>🚪 Keluar dari Akun</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Stat item dengan count-up animation ──
function StatItem({ stat, delay }) {
  const countAnim = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    Animated.timing(countAnim, {
      toValue: stat.target,
      duration: 1200,
      delay: 400 + delay,
      useNativeDriver: false,
    }).start();

    const listener = countAnim.addListener(({ value }) => {
      setDisplay(
        Number.isInteger(stat.target)
          ? Math.round(value).toString()
          : value.toFixed(1)
      );
    });
    return () => countAnim.removeListener(listener);
  }, []);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: 300 + delay,
      useNativeDriver: true,
      tension: 70,
      friction: 7,
    }).start();
  }, []);

  return (
    <Animated.View style={[s.statItem, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={{ fontSize: 22 }}>{stat.icon}</Text>
      <Text style={s.statVal}>{display}{stat.suffix}</Text>
      <Text style={s.statLabel}>{stat.label}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    backgroundColor: '#0A2540', alignItems: 'center',
    paddingTop: 24, paddingBottom: 28, gap: 6,
  },
  avatarWrapper: { position: 'relative', marginBottom: 4 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#00C8A0' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 3,
  },
  userName: { fontSize: 20, fontWeight: '800', color: '#fff' },
  userEmail: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  userPhone: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  editBtnWrapper: { marginTop: 8 },
  editBtn: {
    backgroundColor: 'rgba(0,200,160,0.15)', borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 8,
    borderWidth: 1, borderColor: '#00C8A0',
  },
  editBtnTxt: { color: '#00C8A0', fontWeight: '700', fontSize: 13 },
  cardWrapper: { margin: 16 },
  insuranceCard: {
    backgroundColor: '#0A2540', borderRadius: 20,
    padding: 20, overflow: 'hidden',
    elevation: 8, shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
  },
  cardBack: { backgroundColor: '#0D2E50' },
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
  backRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  activePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,200,160,0.15)', alignSelf: 'flex-start',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#00C8A0' },
  activeText: { fontSize: 11, color: '#00C8A0', fontWeight: '700' },
  flipHint: {
    fontSize: 10, color: 'rgba(255,255,255,0.35)',
    textAlign: 'center', marginTop: 10,
  },
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
  logoutBtn: {
    backgroundColor: '#FFEBEE', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: '#FFCDD2',
  },
  logoutTxt: { color: '#E53935', fontWeight: '700', fontSize: 14 },
});