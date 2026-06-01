import React, { useState } from 'react';
import {
  View, Text, SectionList, TouchableWithoutFeedback,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MUTASI_DATA = [
  {
    title: 'Oktober 2024',
    total: '-Rp 199.000',
    data: [
      {
        id: 'm1', type: 'Pembayaran Premi', date: '31 Okt 2024',
        amount: '-Rp 199.000', status: 'Berhasil', icon: '💳',
        detail: 'Pembayaran premi bulan November via GoPay',
      },
      {
        id: 'm2', type: 'Klaim Rawat Jalan', date: '22 Okt 2024',
        amount: '+Rp 350.000', status: 'Cair', icon: '🏥',
        detail: 'Klaim konsultasi dokter spesialis penyakit dalam',
      },
      {
        id: 'm3', type: 'Klaim Obat', date: '22 Okt 2024',
        amount: '+Rp 125.000', status: 'Cair', icon: '💊',
        detail: 'Reimburse pembelian obat resep dokter',
      },
    ],
  },
  {
    title: 'September 2024',
    total: '-Rp 199.000',
    data: [
      {
        id: 'm4', type: 'Pembayaran Premi', date: '30 Sep 2024',
        amount: '-Rp 199.000', status: 'Berhasil', icon: '💳',
        detail: 'Pembayaran premi bulan Oktober via BCA',
      },
      {
        id: 'm5', type: 'Klaim Rawat Inap', date: '15 Sep 2024',
        amount: '+Rp 2.500.000', status: 'Cair', icon: '🏥',
        detail: 'Klaim rawat inap 2 hari karena demam berdarah',
      },
    ],
  },
  {
    title: 'Agustus 2024',
    total: '-Rp 199.000',
    data: [
      {
        id: 'm6', type: 'Pembayaran Premi', date: '31 Agt 2024',
        amount: '-Rp 199.000', status: 'Berhasil', icon: '💳',
        detail: 'Pembayaran premi bulan September via OVO',
      },
      {
        id: 'm7', type: 'Cashback Promo', date: '10 Agt 2024',
        amount: '+Rp 50.000', status: 'Cair', icon: '🎁',
        detail: 'Cashback program referral teman',
      },
      {
        id: 'm8', type: 'Klaim Ditolak', date: '5 Agt 2024',
        amount: 'Rp 0', status: 'Ditolak', icon: '❌',
        detail: 'Klaim gigi ditolak — tidak termasuk cakupan paket',
      },
    ],
  },
];

// Warna dan label per status transaksi
const STATUS_CONFIG = {
  Berhasil: { bg: '#E3F2FD', text: '#1565C0' },
  Cair: { bg: '#E8F5E9', text: '#2E7D32' },
  Ditolak: { bg: '#FFEBEE', text: '#C62828' },
  Proses: { bg: '#FFF3E0', text: '#E65100' },
};

export default function MutasiScreen() {
  const [expanded, setExpanded] = useState(null);

  const handlePress = (item) => {
    setExpanded(expanded === item.id ? null : item.id);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Riwayat Mutasi 📋</Text>
        <Text style={s.headerSub}>Transaksi premi dan pencairan klaim</Text>
      </View>

      {/* Ringkasan */}
      <View style={s.summaryRow}>
        <View style={[s.summaryCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={s.summaryIcon}>💰</Text>
          <Text style={s.summaryVal}>Rp 2.975.000</Text>
          <Text style={s.summaryLabel}>Total Klaim Cair</Text>
        </View>
        <View style={[s.summaryCard, { backgroundColor: '#FFEBEE' }]}>
          <Text style={s.summaryIcon}>💳</Text>
          <Text style={s.summaryVal}>Rp 597.000</Text>
          <Text style={s.summaryLabel}>Total Premi Dibayar</Text>
        </View>
      </View>

      {/* SectionList mutasi */}
      <SectionList
        sections={MUTASI_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderSectionHeader={({ section }) => (
          <View style={s.sectionHead}>
            <Text style={s.sectionMonth}>{section.title}</Text>
            <Text style={[
              s.sectionTotal,
              { color: section.total.startsWith('+') ? '#2E7D32' : '#C62828' }
            ]}>
              {section.total}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handlePress(item)}>
            <View style={s.mutasiItem}>
              <View style={s.mutasiRow}>
                {/* Ikon */}
                <View style={s.mutasiIcon}>
                  <Text style={{ fontSize: 20 }}>{item.icon}</Text>
                </View>
                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text style={s.mutasiType}>{item.type}</Text>
                  <Text style={s.mutasiDate}>{item.date}</Text>
                </View>
                {/* Nominal & Status */}
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={[
                    s.mutasiAmount,
                    { color: item.amount.startsWith('+') ? '#2E7D32' : item.amount === 'Rp 0' ? '#8FA3B1' : '#C62828' }
                  ]}>
                    {item.amount}
                  </Text>
                  <View style={[s.statusBadge, { backgroundColor: STATUS_CONFIG[item.status]?.bg }]}>
                    <Text style={[s.statusTxt, { color: STATUS_CONFIG[item.status]?.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Detail expandable */}
              {expanded === item.id && (
                <View style={s.detailBox}>
                  <Text style={s.detailTxt}>📝 {item.detail}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#F0F4F8' }} />}
        SectionSeparatorComponent={() => <View style={{ height: 12 }} />}
        stickySectionHeadersEnabled={true}
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
  summaryRow: {
    flexDirection: 'row', gap: 12,
    marginHorizontal: 16, marginVertical: 16,
  },
  summaryCard: {
    flex: 1, borderRadius: 14, padding: 14, alignItems: 'center', gap: 4,
  },
  summaryIcon: { fontSize: 24 },
  summaryVal: { fontSize: 15, fontWeight: '800', color: '#0A2540' },
  summaryLabel: { fontSize: 11, color: '#5A7184', textAlign: 'center' },
  sectionHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F0F4F8', paddingVertical: 8,
  },
  sectionMonth: { fontSize: 13, fontWeight: '700', color: '#0A2540' },
  sectionTotal: { fontSize: 13, fontWeight: '700' },
  mutasiItem: {
    backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 12,
  },
  mutasiRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mutasiIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center',
  },
  mutasiType: { fontSize: 13, fontWeight: '600', color: '#0A2540', marginBottom: 2 },
  mutasiDate: { fontSize: 11, color: '#8FA3B1' },
  mutasiAmount: { fontSize: 14, fontWeight: '700' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  statusTxt: { fontSize: 10, fontWeight: '700' },
  detailBox: {
    marginTop: 10, backgroundColor: '#F0F4F8',
    borderRadius: 8, padding: 10,
  },
  detailTxt: { fontSize: 12, color: '#5A7184', lineHeight: 18 },
});