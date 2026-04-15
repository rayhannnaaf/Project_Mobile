

import React from 'react';
import {
  View,
  Text,
  ScrollView,   // Komponen scroll utama halaman
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Import semua sub-komponen
import Header from './src/components/Header';
import BannerSlider from './src/components/BannerSlider';
import HospitalList from './src/components/HospitalList';
import PlanScroll from './src/components/PlanScroll';
import FAQSection from './src/components/FAQSection';


export default function App() {
  return (
   
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="#0A2540" />
        <Header />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

     
          <View style={styles.policyCard}>
            <View style={styles.policyLeft}>
              <Text style={styles.policyLabel}>Status Polis</Text>
              <Text style={styles.policyName}>Paket Standard</Text>
              <View style={styles.activeBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>Aktif</Text>
              </View>
            </View>
            <View style={styles.policyRight}>
              <Text style={styles.policyExpLabel}>Berlaku hingga</Text>
              <Text style={styles.policyExpDate}>31 Des 2025</Text>
              <Text style={styles.policyNumber}>No: HS-2024-00421</Text>
            </View>
          </View>

      
          <View style={styles.quickActionSection}>
            <Text style={styles.quickActionTitle}>⚡ Aksi Cepat</Text>
            <View style={styles.quickActionRow}>
              <View style={styles.quickActionItem}>
                <Text style={styles.quickActionIcon}>🏥</Text>
                           <View style={styles.btnWrapper}>
                  <Button_Inline label="Cari RS" color="#0A2540" />
                </View>
              </View>
              <View style={styles.quickActionItem}>
                <Text style={styles.quickActionIcon}>📋</Text>
                <View style={styles.btnWrapper}>
                  <Button_Inline label="Klaim" color="#00897B" />
                </View>
              </View>
              <View style={styles.quickActionItem}>
                <Text style={styles.quickActionIcon}>💊</Text>
                <View style={styles.btnWrapper}>
                  <Button_Inline label="Obat" color="#6A1B9A" />
                </View>
              </View>
              <View style={styles.quickActionItem}>
                <Text style={styles.quickActionIcon}>👨‍⚕️</Text>
                <View style={styles.btnWrapper}>
                  <Button_Inline label="Dokter" color="#C62828" />
                </View>
              </View>
            </View>
          </View>

          <BannerSlider />
          <HospitalList />
          <PlanScroll />

          <FAQSection />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2026 Connext Indonesia
            </Text>
            <Text style={styles.footerSub}>
              Terdaftar & diawasi OJK(anjai) · KEP-123/KMK.17/2018
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

import { Button, Alert } from 'react-native';
function Button_Inline({ label, color }) {
  return (
    <Button
      title={label}
      color={color}
      onPress={() => Alert.alert(`${label} 🔍`, `Membuka fitur ${label}...`)}
    />
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A2540',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContent: {
    paddingBottom: 32,
    gap: 16,
  },


  policyCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#0A2540',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#0A2540',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  policyLeft: { gap: 4 },
  policyLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  policyName: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,200,160,0.15)',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  activeDot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: '#00C8A0',
  },
  activeText: { fontSize: 11, color: '#00C8A0', fontWeight: '700' },
  policyRight: { alignItems: 'flex-end', gap: 4 },
  policyExpLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  policyExpDate: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  policyNumber: { fontSize: 10, color: 'rgba(255,255,255,0.4)' },


  quickActionSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 12,
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  quickActionIcon: { fontSize: 24 },
  btnWrapper: { width: '100%' },


  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#5A7184',
    fontWeight: '600',
  },
  footerSub: {
    fontSize: 10,
    color: '#8FA3B1',
  },
});
