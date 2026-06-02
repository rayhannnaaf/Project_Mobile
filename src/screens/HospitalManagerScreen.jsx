/**
 * HospitalManagerScreen.jsx
 * Full CRUD via Supabase: SELECT, INSERT, UPDATE, DELETE
 * Table: hospitals (see src/lib/supabase.js for schema)
 *
 * Animations:
 * - Animated.diffClamp  → header hides on scroll down
 * - Interpolation       → header translateY + opacity
 * - Animated.spring     → card mount stagger + press scale
 * - Animated.timing     → modal slide-up + fade backdrop
 * - Animated.sequence   → delete shake before remove
 * - Animated.loop       → FAB pulse
 * - onScroll event      → Animated.event
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, TextInput,
  TouchableWithoutFeedback, TouchableOpacity,
  StyleSheet, Alert, Animated, Dimensions,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const { width: SW, height: SH } = Dimensions.get('window');
const HEADER_H = 64;
const TABLE    = 'hospitals';

const C = {
  navy: '#0A2540', teal: '#00C8A0', red: '#E53935',
  bg: '#F0F4F8', white: '#FFFFFF', sub: '#5A7184',
  border: '#E2E8F0', lightBlue: '#EFF6FF',
};

const STRIP_COLORS = ['#00C8A0','#1565C0','#6A1B9A','#E65100','#2E7D32','#C62828'];

/* ── Animated card ─────────────────────────────────────────────────────────── */
const HospitalCard = React.memo(({ item, index, onEdit, onDelete }) => {
  const mountAnim  = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const shakeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(mountAnim, {
      toValue: 1, delay: index * 60,
      speed: 14, bounciness: 7, useNativeDriver: true,
    }).start();
  }, []);

  const translateY = mountAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  const onPressIn  = () => Animated.spring(pressScale, { toValue: 0.97, speed: 40, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(pressScale, { toValue: 1,    speed: 20, useNativeDriver: true }).start();

  const confirmDelete = () => {
    Alert.alert(
      'Hapus Rumah Sakit',
      'Yakin ingin menghapus ' + String(item.name) + '?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus', style: 'destructive',
          onPress: () => {
            Animated.sequence([
              Animated.timing(shakeAnim, { toValue:  8, duration: 55, useNativeDriver: true }),
              Animated.timing(shakeAnim, { toValue: -8, duration: 55, useNativeDriver: true }),
              Animated.timing(shakeAnim, { toValue:  5, duration: 55, useNativeDriver: true }),
              Animated.timing(shakeAnim, { toValue: -5, duration: 55, useNativeDriver: true }),
              Animated.timing(shakeAnim, { toValue:  0, duration: 55, useNativeDriver: true }),
            ]).start(() => onDelete(item.id));
          },
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[
        s.card,
        { opacity: mountAnim, transform: [{ translateY }, { scale: pressScale }, { translateX: shakeAnim }] },
      ]}>
        <View style={[s.cardStrip, { backgroundColor: STRIP_COLORS[index % STRIP_COLORS.length] }]} />
        <View style={s.cardBody}>
          <View style={s.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardName} numberOfLines={1}>{String(item.name)}</Text>
              <Text style={s.cardCity}>{'📍 ' + String(item.city)}</Text>
              <Text style={s.cardPhone}>{'📞 ' + String(item.phone ?? '-')}</Text>
            </View>
            <View style={s.cardRight}>
              <View style={s.ratingBox}>
                <Text style={s.ratingTxt}>{'⭐ ' + String(item.rating ?? '4.5')}</Text>
              </View>
              <Text style={s.cardType}>{String(item.type ?? 'RS Umum')}</Text>
            </View>
          </View>
          <View style={s.cardActions}>
            <TouchableOpacity style={s.btnEdit}   onPress={() => onEdit(item)}  activeOpacity={0.8}>
              <Text style={s.btnEditTxt}>{'✏️ Edit'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnDelete} onPress={confirmDelete}       activeOpacity={0.8}>
              <Text style={s.btnDeleteTxt}>{'🗑️ Hapus'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

/* ── Bottom-sheet form modal ───────────────────────────────────────────────── */
const FormModal = ({ visible, item, onClose, onSubmit, loading }) => {
  const slideAnim = useRef(new Animated.Value(SH)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  const [name,   setName]   = useState('');
  const [city,   setCity]   = useState('');
  const [type,   setType]   = useState('');
  const [phone,  setPhone]  = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (visible === true) {
      setName(item  ? String(item.name  ?? '') : '');
      setCity(item  ? String(item.city  ?? '') : '');
      setType(item  ? String(item.type  ?? '') : '');
      setPhone(item ? String(item.phone ?? '') : '');
      setRating(item? String(item.rating?? '') : '');
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, speed: 16, bounciness: 4, useNativeDriver: true }),
        Animated.timing(bgOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: SH, duration: 280, useNativeDriver: true }),
        Animated.timing(bgOpacity, { toValue: 0,  duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (visible !== true) return null;

  const fields = [
    { label: 'Nama RS *',  value: name,   setter: setName,   placeholder: 'RS Contoh Sehat' },
    { label: 'Kota *',     value: city,   setter: setCity,   placeholder: 'Jakarta' },
    { label: 'Tipe',       value: type,   setter: setType,   placeholder: 'RS Umum' },
    { label: 'Telepon',    value: phone,  setter: setPhone,  placeholder: '021-555-1234' },
    { label: 'Rating',     value: rating, setter: setRating, placeholder: '4.5', keyboardType: 'decimal-pad' },
  ];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[s.backdrop, { opacity: bgOpacity }]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View style={[s.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={s.sheetHandle} />
          <Text style={s.sheetTitle}>
            {item !== null ? '✏️ Edit Rumah Sakit' : '➕ Tambah Rumah Sakit'}
          </Text>
          {fields.map((f) => (
            <View key={f.label} style={s.fieldBox}>
              <Text style={s.fieldLabel}>{f.label}</Text>
              <TextInput
                style={s.fieldInput}
                value={f.value}
                onChangeText={f.setter}
                placeholder={f.placeholder}
                placeholderTextColor="#8FA3B1"
                keyboardType={f.keyboardType ?? 'default'}
              />
            </View>
          ))}
          <TouchableOpacity
            style={[s.submitBtn, loading === true && { opacity: 0.6 }]}
            onPress={() => onSubmit({ name, city, type, phone, rating })}
            disabled={loading === true}
            activeOpacity={0.85}
          >
            {loading === true
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.submitTxt}>
                  {item !== null ? '💾 Simpan Perubahan' : '➕ Tambah RS'}
                </Text>
            }
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

/* ── Main Screen ───────────────────────────────────────────────────────────── */
export default function HospitalManagerScreen() {
  const [hospitals,   setHospitals]   = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [modalVisible,setModalVisible]= useState(false);
  const [editItem,    setEditItem]    = useState(null);
  const [search,      setSearch]      = useState('');

  // ── DiffClamp header ────────────────────────────────────────────────────────
  const scrollY   = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_H);

  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, HEADER_H], outputRange: [0, -HEADER_H], extrapolate: 'clamp',
  });
  const headerOpacity = diffClamp.interpolate({
    inputRange: [0, HEADER_H], outputRange: [1, 0], extrapolate: 'clamp',
  });

  // ── FAB pulse ───────────────────────────────────────────────────────────────
  const fabScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const p = Animated.loop(Animated.sequence([
      Animated.timing(fabScale, { toValue: 1.08, duration: 900, useNativeDriver: true }),
      Animated.timing(fabScale, { toValue: 1,    duration: 900, useNativeDriver: true }),
    ]));
    p.start();
    return () => p.stop();
  }, []);

  /* ── GET — Supabase SELECT ──────────────────────────────────────────────── */
  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setHospitals(data ?? []);
    } catch (err) {
      Alert.alert('❌ Gagal Memuat', String(err?.message ?? 'Tidak dapat mengambil data RS.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchHospitals(); }, []);

  /* ── POST — Supabase INSERT ─────────────────────────────────────────────── */
  const handleCreate = async (form) => {
    if (!form.name.trim() || !form.city.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama RS dan Kota wajib diisi.');
      return;
    }
    setFormLoading(true);
    try {
      // Get current logged-in user to attach user_id (for RLS)
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from(TABLE)
        .insert([{
          name:    form.name.trim(),
          city:    form.city.trim(),
          type:    form.type.trim()   || 'RS Umum',
          phone:   form.phone.trim()  || '-',
          rating:  parseFloat(form.rating) || 4.5,
          user_id: user?.id ?? null,
        }])
        .select()
        .single();
      if (error) throw error;
      setHospitals((prev) => [data, ...prev]);
      setModalVisible(false);
      Alert.alert('✅ Berhasil', String(form.name) + ' berhasil ditambahkan!');
    } catch (err) {
      Alert.alert('❌ Gagal Tambah', String(err?.message ?? 'Terjadi kesalahan.'));
    } finally {
      setFormLoading(false);
    }
  };

  /* ── PUT — Supabase UPDATE ──────────────────────────────────────────────── */
  const handleUpdate = async (form) => {
    if (!form.name.trim() || !form.city.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama RS dan Kota wajib diisi.');
      return;
    }
    setFormLoading(true);
    try {
      const { data, error } = await supabase
        .from(TABLE)
        .update({
          name:   form.name.trim(),
          city:   form.city.trim(),
          type:   form.type.trim()   || 'RS Umum',
          phone:  form.phone.trim()  || '-',
          rating: parseFloat(form.rating) || 4.5,
        })
        .eq('id', editItem.id)
        .select()
        .single();
      if (error) throw error;
      setHospitals((prev) => prev.map((h) => h.id === editItem.id ? data : h));
      setModalVisible(false);
      setEditItem(null);
      Alert.alert('✅ Berhasil', String(form.name) + ' berhasil diperbarui!');
    } catch (err) {
      Alert.alert('❌ Gagal Update', String(err?.message ?? 'Terjadi kesalahan.'));
    } finally {
      setFormLoading(false);
    }
  };

  /* ── DELETE — Supabase DELETE ───────────────────────────────────────────── */
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from(TABLE)
        .delete()
        .eq('id', String(id));
      if (error) throw error;
      setHospitals((prev) => prev.filter((h) => h.id !== id));
      Alert.alert('🗑️ Dihapus', 'Rumah sakit berhasil dihapus.');
    } catch (err) {
      Alert.alert('❌ Gagal Hapus', String(err?.message ?? 'Terjadi kesalahan.'));
    }
  };

  const openEdit   = (item) => { setEditItem(item); setModalVisible(true); };
  const openCreate = ()     => { setEditItem(null);  setModalVisible(true); };
  const closeModal = ()     => { setModalVisible(false); setEditItem(null); };

  const filtered = hospitals.filter((h) => {
    const q = search.toLowerCase();
    return (
      String(h.name ?? '').toLowerCase().includes(q) ||
      String(h.city ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={s.safe} edges={['top']}>

      {/* ── DiffClamp animated header ───────────────────────────────────── */}
      <Animated.View style={[
        s.header,
        { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity },
      ]}>
        <View>
          <Text style={s.headerTitle}>{'🏥 Kelola RS'}</Text>
          <Text style={s.headerSub}>{String(filtered.length) + ' rumah sakit terdaftar'}</Text>
        </View>
        <TouchableOpacity onPress={fetchHospitals} activeOpacity={0.7} style={s.refreshBtn}>
          <Text style={{ fontSize: 18 }}>{'🔄'}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── Search bar ──────────────────────────────────────────────────── */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>{'🔍'}</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Cari nama RS atau kota..."
          placeholderTextColor="#8FA3B1"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableWithoutFeedback onPress={() => setSearch('')}>
            <View style={s.clearBtn}>
              <Text style={{ color: '#5A7184', fontSize: 14 }}>{'✕'}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {/* ── List ────────────────────────────────────────────────────────── */}
      {loading === true ? (
        <View style={s.loaderBox}>
          <ActivityIndicator size="large" color={C.teal} />
          <Text style={s.loaderTxt}>{'Memuat data dari Supabase...'}</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <HospitalCard item={item} index={index} onEdit={openEdit} onDelete={handleDelete} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={
            <View style={s.emptyBox}>
              <Text style={{ fontSize: 40 }}>{'🏥'}</Text>
              <Text style={s.emptyTxt}>{'Belum ada rumah sakit'}</Text>
              <Text style={s.emptySub}>{'Tekan ＋ untuk menambahkan RS baru'}</Text>
            </View>
          }
        />
      )}

      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <Animated.View style={[s.fab, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity onPress={openCreate} activeOpacity={0.85} style={s.fabInner}>
          <Text style={s.fabTxt}>{'＋'}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── Form modal ──────────────────────────────────────────────────── */}
      <FormModal
        visible={modalVisible}
        item={editItem}
        onClose={closeModal}
        onSubmit={editItem !== null ? handleUpdate : handleCreate}
        loading={formLoading}
      />

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    height: HEADER_H, backgroundColor: C.navy,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: C.white },
  headerSub:   { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  refreshBtn:  { width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  searchWrap:  { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 16, marginTop: HEADER_H + 12, marginBottom: 8, borderRadius: 14, paddingHorizontal: 14, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  searchIcon:  { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 13, fontSize: 14, color: C.navy },
  clearBtn:    { padding: 6 },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  loaderBox:   { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loaderTxt:   { fontSize: 13, color: C.sub },
  card:        { backgroundColor: C.white, borderRadius: 16, flexDirection: 'row', overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  cardStrip:   { width: 5 },
  cardBody:    { flex: 1, padding: 14 },
  cardTop:     { flexDirection: 'row', marginBottom: 12 },
  cardName:    { fontSize: 14, fontWeight: '700', color: C.navy, marginBottom: 4 },
  cardCity:    { fontSize: 12, color: C.sub, marginBottom: 2 },
  cardPhone:   { fontSize: 12, color: C.sub },
  cardRight:   { alignItems: 'flex-end', gap: 6 },
  ratingBox:   { backgroundColor: '#FFF8E1', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  ratingTxt:   { fontSize: 11, fontWeight: '700', color: '#F57F17' },
  cardType:    { fontSize: 10, fontWeight: '600', color: '#1565C0', backgroundColor: C.lightBlue, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  cardActions: { flexDirection: 'row', gap: 10 },
  btnEdit:     { flex: 1, backgroundColor: C.lightBlue, borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  btnEditTxt:  { fontSize: 12, fontWeight: '700', color: '#1565C0' },
  btnDelete:   { flex: 1, backgroundColor: '#FFEBEE', borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  btnDeleteTxt:{ fontSize: 12, fontWeight: '700', color: C.red },
  emptyBox:    { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyTxt:    { fontSize: 16, fontWeight: '700', color: C.navy },
  emptySub:    { fontSize: 12, color: C.sub, textAlign: 'center' },
  fab:         { position: 'absolute', bottom: 28, right: 24, width: 58, height: 58, borderRadius: 29, elevation: 8, shadowColor: C.teal, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  fabInner:    { width: 58, height: 58, borderRadius: 29, backgroundColor: C.teal, justifyContent: 'center', alignItems: 'center' },
  fabTxt:      { fontSize: 28, color: C.white, fontWeight: '300', lineHeight: 32 },
  backdrop:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet:       { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36, elevation: 20 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: C.border, alignSelf: 'center', marginBottom: 16 },
  sheetTitle:  { fontSize: 18, fontWeight: '800', color: C.navy, marginBottom: 16 },
  fieldBox:    { marginBottom: 14 },
  fieldLabel:  { fontSize: 12, fontWeight: '600', color: C.navy, marginBottom: 6 },
  fieldInput:  { backgroundColor: C.bg, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: C.navy, borderWidth: 1.5, borderColor: C.border },
  submitBtn:   { backgroundColor: C.teal, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  submitTxt:   { fontSize: 15, fontWeight: '800', color: C.white },
});