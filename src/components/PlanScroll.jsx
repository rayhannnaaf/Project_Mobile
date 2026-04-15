import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { planList } from '../data/data';

export default function PlanScroll() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (plan) => {
    setSelectedPlan(plan.id);
    Alert.alert(
      `Paket ${plan.name} Dipilih `,
      `Harga: ${plan.price}/bulan\n\nLanjutkan ke pembayaran?`,
      [
        { text: 'Batal', style: 'cancel', onPress: () => setSelectedPlan(null) },
        { text: 'Lanjutkan', style: 'default' },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>
        {' Pilih Paket Perlindungan'}
      </Text>

      <Text style={styles.sectionSubtitle}>
        {'Scroll ke kanan untuk melihat semua paket'}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {planList.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <View
              key={String(plan.id)}
              style={[
                styles.planCard,
                { backgroundColor: plan.color },
                isSelected && {
                  borderColor: plan.borderColor,
                  borderWidth: 2.5,
                },
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>
                    {'⭐ Terpopuler'}
                  </Text>
                </View>
              )}

              <Text style={styles.planIcon}>
                {String(plan.icon)}
              </Text>

              <Text style={styles.planName}>
                {String(plan.name)}
              </Text>

              <Text style={styles.planPrice}>
                {String(plan.price)}
              </Text>

              <Text style={styles.planPeriod}>
                {'per bulan'}
              </Text>

              <View style={styles.benefitList}>
                {plan.benefits.map((benefit, idx) => (
                  <Text key={idx.toString()} style={styles.benefitItem}>
                    {'✓ ' + String(benefit)}
                  </Text>
                ))}
              </View>

              <Button
                title={
                  isSelected
                    ? '✓ Dipilih'
                    : `Pilih ${String(plan.name)}`
                }
                onPress={() => handleSelect(plan)}
                color={plan.borderColor}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#5A7184',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  planCard: {
    width: 220,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  popularBadge: {
    backgroundColor: '#00C8A0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0A2540',
  },
  planIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A2540',
    marginBottom: 2,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0A2540',
    marginBottom: 0,
  },
  planPeriod: {
    fontSize: 11,
    color: '#5A7184',
    marginBottom: 12,
  },
  benefitList: {
    gap: 5,
    marginBottom: 14,
  },
  benefitItem: {
    fontSize: 11,
    color: '#0A2540',
    lineHeight: 17,
  },
});