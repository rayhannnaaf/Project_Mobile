import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, KeyboardAvoidingView,
  Platform, ScrollView, Alert, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');

/* ── Spring-press wrapper ── */
function SpringButton({ onPress, style, children, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, tension: 300, friction: 10 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true, tension: 300, friction: 10 }).start();
  return (
    <TouchableOpacity onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} activeOpacity={1} disabled={disabled}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </TouchableOpacity>
  );
}

/* ── Animated input ── */
function AnimInput({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, icon, hint }) {
  const glow = useRef(new Animated.Value(0)).current;
  const onFocus = () => Animated.timing(glow, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  const onBlur  = () => Animated.timing(glow, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  const borderColor = glow.interpolate({ inputRange: [0, 1], outputRange: ['#1E3A5F', '#00C8A0'] });
  const bg          = glow.interpolate({ inputRange: [0, 1], outputRange: ['#0D2E50', '#0A3558'] });
  return (
    <View style={inp.wrap}>
      <Text style={inp.label}>{label}</Text>
      <Animated.View style={[inp.box, { borderColor, backgroundColor: bg }]}>
        <Text style={inp.icon}>{icon}</Text>
        <TextInput
          style={inp.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value?.length > 0 && <Text style={{ fontSize: 13 }}>✅</Text>}
      </Animated.View>
      {!!hint && <Text style={inp.hint}>{hint}</Text>}
    </View>
  );
}

/* ── Step indicator ── */
function StepIndicator({ current, total }) {
  return (
    <View style={si.row}>
      {Array.from({ length: total }).map((_, i) => {
        const done   = i < current - 1;
        const active = i === current - 1;
        return (
          <React.Fragment key={i}>
            <View style={[si.dot, (done || active) && si.dotOn]}>
              <Text style={{ fontSize: 10, color: '#071929', fontWeight: '800' }}>
                {done ? '✓' : i + 1}
              </Text>
            </View>
            {i < total - 1 && <View style={[si.line, done && si.lineOn]} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

/* ── RegisterScreen ── */
export default function RegisterScreen({ navigation, onLogin }) {
  const [step, setStep] = useState(1);
  const TOTAL = 2;

  // Step 1
  const [nama,    setNama]    = useState('');
  const [email,   setEmail]   = useState('');
  const [telepon, setTelepon] = useState('');

  // Step 2
  const [noKTP,   setNoKTP]   = useState('');
  const [pass,    setPass]    = useState('');
  const [confirm, setConfirm] = useState('');

  const [loading, setLoading] = useState(false);

  // Entrance anims
  const headerAnim = useRef(new Animated.Value(0)).current;
  const cardAnim   = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  // Slide between steps
  const slideX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.spring(headerAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(cardAnim,   { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(footerAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
  }, []);

  const entrance = (anim, dy = 40) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [dy, 0] }) }],
  });

  const slideToStep = (next) => {
    const dir = next > step ? -SW : SW;
    Animated.timing(slideX, { toValue: dir, duration: 280, useNativeDriver: true }).start(() => {
      setStep(next);
      slideX.setValue(-dir);
      Animated.spring(slideX, { toValue: 0, useNativeDriver: true, tension: 60, friction: 8 }).start();
    });
  };

  const goNext = () => {
    if (!nama || !email || !telepon) { Alert.alert('⚠️ Perhatian', 'Semua field wajib diisi.'); return; }
    slideToStep(2);
  };

  const goBack = () => {
    if (step === 2) { slideToStep(1); }
    else { navigation.navigate('Login'); }
  };

  const handleRegister = () => {
    if (!noKTP || !pass || !confirm) { Alert.alert('⚠️ Perhatian', 'Semua field wajib diisi.'); return; }
    if (pass !== confirm) { Alert.alert('❌ Error', 'Password dan konfirmasi tidak cocok.'); return; }
    setLoading(true);
    // TODO: ganti dengan API call sungguhan
    setTimeout(() => {
      setLoading(false);
      Alert.alert('🎉 Selamat!', 'Akun berhasil dibuat!', [
        { text: 'Masuk', onPress: () => { if (onLogin) onLogin(); } },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.blobTL} />
      <View style={s.blobBR} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <Animated.View style={[s.header, entrance(headerAnim, 20)]}>
            <TouchableOpacity style={s.backBtn} onPress={goBack}>
              <Text style={s.backTxt}>← Kembali</Text>
            </TouchableOpacity>
            <View style={s.titleRow}>
              <View style={s.logoMini}><Text style={{ fontSize: 20 }}>🛡️</Text></View>
              <View>
                <Text style={s.title}>Buat Akun Baru</Text>
                <Text style={s.subtitle}>Langkah {step} dari {TOTAL} — {step === 1 ? 'Data Diri' : 'Keamanan'}</Text>
              </View>
            </View>
            <StepIndicator current={step} total={TOTAL} />
          </Animated.View>

          {/* Form card */}
          <Animated.View style={[s.card, entrance(cardAnim, 50)]}>
            <Animated.View style={{ transform: [{ translateX: slideX }] }}>

              {step === 1 ? (
                <View>
                  <Text style={s.stepTitle}>👤 Data Diri</Text>
                  <Text style={s.stepDesc}>Masukkan informasi pribadi Anda</Text>
                  <AnimInput label="Nama Lengkap" placeholder="Sesuai KTP"        value={nama}    onChangeText={setNama}    icon="👤" />
                  <AnimInput label="Email"         placeholder="nama@email.com"    value={email}   onChangeText={setEmail}   icon="📧" keyboardType="email-address" />
                  <AnimInput label="Nomor Telepon" placeholder="08xx xxxx xxxx"    value={telepon} onChangeText={setTelepon} icon="📱" keyboardType="phone-pad" />
                  <SpringButton onPress={goNext} style={s.primaryBtn}>
                    <Text style={s.primaryBtnTxt}>Lanjutkan →</Text>
                  </SpringButton>
                </View>
              ) : (
                <View>
                  <Text style={s.stepTitle}>🔐 Keamanan</Text>
                  <Text style={s.stepDesc}>Buat password kuat dan masukkan No. KTP</Text>
                  <AnimInput label="No. KTP"              placeholder="16 digit nomor KTP" value={noKTP}   onChangeText={setNoKTP}   icon="🪪" keyboardType="numeric" hint="Digunakan untuk verifikasi identitas" />
                  <AnimInput label="Password"             placeholder="Min. 8 karakter"    value={pass}    onChangeText={setPass}    icon="🔒" secureTextEntry hint="Kombinasikan huruf, angka, dan simbol" />
                  <AnimInput label="Konfirmasi Password"  placeholder="Ulangi password"    value={confirm} onChangeText={setConfirm} icon="🔑" secureTextEntry />
                  <View style={s.termsBox}>
                    <Text style={s.termsTxt}>
                      Dengan mendaftar, Anda menyetujui{' '}
                      <Text style={s.termsLink}>Syarat & Ketentuan</Text>{' '}dan{' '}
                      <Text style={s.termsLink}>Kebijakan Privasi</Text> kami.
                    </Text>
                  </View>
                  <SpringButton onPress={handleRegister} style={s.primaryBtn} disabled={loading}>
                    <Text style={s.primaryBtnTxt}>{loading ? '⏳ Mendaftarkan...' : '🎉 Daftar Sekarang'}</Text>
                  </SpringButton>
                </View>
              )}

            </Animated.View>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[s.footer, entrance(footerAnim, 20)]}>
            <Text style={s.footerTxt}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={s.footerLink}>Masuk di sini</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const si = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  dot:    { width: 28, height: 28, borderRadius: 14, backgroundColor: '#1E3A5F', borderWidth: 1.5, borderColor: '#1E3A5F', justifyContent: 'center', alignItems: 'center' },
  dotOn:  { backgroundColor: '#00C8A0', borderColor: '#00E8B8' },
  line:   { flex: 1, height: 2, backgroundColor: '#1E3A5F', marginHorizontal: 4 },
  lineOn: { backgroundColor: '#00C8A0' },
});

const inp = StyleSheet.create({
  wrap:  { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.6)', marginBottom: 6, letterSpacing: 0.5 },
  box:   { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13 },
  icon:  { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: '#fff', fontWeight: '500' },
  hint:  { fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, marginLeft: 2 },
});

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#071929' },
  blobTL:       { position: 'absolute', width: 180, height: 180, borderRadius: 90,  backgroundColor: '#00C8A018', top: -50,  left: -50  },
  blobBR:       { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#0A254030', bottom: -40, right: -60 },
  scroll:       { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  header:       { marginBottom: 24 },
  backBtn:      { alignSelf: 'flex-start', marginBottom: 20 },
  backTxt:      { fontSize: 14, color: '#00C8A0', fontWeight: '700' },
  titleRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoMini:     { width: 48, height: 48, borderRadius: 14, backgroundColor: '#0A2540', borderWidth: 1.5, borderColor: '#1E3A5F', justifyContent: 'center', alignItems: 'center' },
  title:        { fontSize: 22, fontWeight: '900', color: '#fff' },
  subtitle:     { fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 },
  card:         { backgroundColor: '#0D2444', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1E3A5F', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10, overflow: 'hidden' },
  stepTitle:    { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 4 },
  stepDesc:     { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 22 },
  primaryBtn:   { backgroundColor: '#00C8A0', borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 8, shadowColor: '#00C8A0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  primaryBtnTxt:{ fontSize: 16, fontWeight: '800', color: '#071929', letterSpacing: 0.3 },
  termsBox:     { backgroundColor: '#112a47', borderRadius: 10, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#1E3A5F' },
  termsTxt:     { fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 18 },
  termsLink:    { color: '#00C8A0', fontWeight: '700' },
  footer:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerTxt:    { fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  footerLink:   { fontSize: 14, color: '#00C8A0', fontWeight: '800' },
});