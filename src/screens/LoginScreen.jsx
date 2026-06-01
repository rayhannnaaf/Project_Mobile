/**
 * LoginScreen.jsx
 * src/screens/LoginScreen.jsx
 *
 * Props:
 *   navigation  — dari Tab navigator (untuk pindah ke Register)
 *   onLogin     — callback dari AppNavigator untuk masuk ke MainTabs
 */
import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Animated, KeyboardAvoidingView,
  Platform, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

/* ── Animated input with focus glow ── */
function AnimInput({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, icon }) {
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
      </Animated.View>
    </View>
  );
}

/* ── LoginScreen ── */
export default function LoginScreen({ navigation, onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const logoAnim   = useRef(new Animated.Value(0)).current;
  const formAnim   = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.spring(logoAnim,   { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(formAnim,   { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.spring(footerAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
  }, []);

  const entrance = (anim, dy = 40) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [dy, 0] }) }],
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('⚠️ Perhatian', 'Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    // TODO: ganti dengan API call sungguhan
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin(); // ← masuk ke MainTabs
    }, 1200);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.blobTR} />
      <View style={s.blobBL} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Logo */}
          <Animated.View style={[s.logoSec, entrance(logoAnim, 30)]}>
            <View style={s.logoCircle}>
              <Text style={s.logoEmoji}>🛡️</Text>
            </View>
            <Text style={s.brand}>Connext</Text>
            <Text style={s.tagline}>Perlindungan terbaik untuk hidupmu</Text>
          </Animated.View>

          {/* Form card */}
          <Animated.View style={[s.card, entrance(formAnim, 50)]}>
            <Text style={s.cardTitle}>Masuk ke Akun</Text>
            <Text style={s.cardSub}>Halo! Senang melihatmu kembali 👋</Text>

            <AnimInput label="Email" placeholder="nama@email.com" value={email} onChangeText={setEmail} icon="📧" keyboardType="email-address" />
            <AnimInput label="Password" placeholder="Masukkan password" value={password} onChangeText={setPassword} icon="🔒" secureTextEntry />

            <TouchableOpacity style={s.forgotRow} onPress={() => Alert.alert('🔑 Reset Password', 'Link reset dikirim ke email Anda.')}>
              <Text style={s.forgotTxt}>Lupa password?</Text>
            </TouchableOpacity>

            <SpringButton onPress={handleLogin} style={s.loginBtn} disabled={loading}>
              <Text style={s.loginBtnTxt}>{loading ? '⏳ Memproses...' : 'Masuk →'}</Text>
            </SpringButton>

            <View style={s.divider}>
              <View style={s.divLine} />
              <Text style={s.divTxt}>atau</Text>
              <View style={s.divLine} />
            </View>

            <View style={s.socialRow}>
              <SpringButton style={s.socialBtn} onPress={() => Alert.alert('Google Login')}>
                <Text style={s.socialTxt}>Google</Text>
              </SpringButton>
              <SpringButton style={s.socialBtn} onPress={() => Alert.alert('Apple Login')}>
                <Text style={s.socialTxt}>Apple</Text>
              </SpringButton>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[s.footer, entrance(footerAnim, 20)]}>
            <Text style={s.footerTxt}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={s.footerLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const inp = StyleSheet.create({
  wrap:  { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.6)', marginBottom: 6, letterSpacing: 0.5 },
  box:   { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13 },
  icon:  { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: '#fff', fontWeight: '500' },
});

const s = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#071929' },
  blobTR:     { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: '#00C8A018', top: -60, right: -60 },
  blobBL:     { position: 'absolute', width: 160, height: 160, borderRadius: 80,  backgroundColor: '#0A254030', bottom: 40, left: -50 },
  scroll:     { flexGrow: 1, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32, justifyContent: 'center' },
  logoSec:    { alignItems: 'center', marginBottom: 36 },
  logoCircle: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#0A2540', borderWidth: 2, borderColor: '#00C8A040', justifyContent: 'center', alignItems: 'center', marginBottom: 14, shadowColor: '#00C8A0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  logoEmoji:  { fontSize: 36 },
  brand:      { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },
  tagline:    { fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4, textAlign: 'center' },
  card:       { backgroundColor: '#0D2444', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1E3A5F', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  cardTitle:  { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  cardSub:    { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 },
  forgotRow:  { alignItems: 'flex-end', marginTop: -4, marginBottom: 20 },
  forgotTxt:  { fontSize: 12, color: '#00C8A0', fontWeight: '600' },
  loginBtn:   { backgroundColor: '#00C8A0', borderRadius: 14, paddingVertical: 15, alignItems: 'center', shadowColor: '#00C8A0', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  loginBtnTxt:{ fontSize: 16, fontWeight: '800', color: '#071929', letterSpacing: 0.3 },
  divider:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 20 },
  divLine:    { flex: 1, height: 1, backgroundColor: '#1E3A5F' },
  divTxt:     { fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: '600' },
  socialRow:  { flexDirection: 'row', gap: 12 },
  socialBtn:  { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: '#112a47', borderWidth: 1, borderColor: '#1E3A5F' },
  socialIcon: { fontSize: 16 },
  socialTxt:  { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },
  footer:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerTxt:  { fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  footerLink: { fontSize: 14, color: '#00C8A0', fontWeight: '800' },
});