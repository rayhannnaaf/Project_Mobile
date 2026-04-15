import React, { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { faqSections } from '../data/data';

const FAQItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.easeInEaseOut();
    setIsOpen(!isOpen);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleOpen}>
      <View style={styles.faqItem}>
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>
            {String(item.question)}
          </Text>

          <Text style={[styles.arrowIcon, isOpen && styles.arrowOpen]}>
            {'▼'}
          </Text>
        </View>

        {isOpen && (
          <View style={styles.answerBox}>
            <Text style={styles.answerText}>
              {String(item.answer)}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function FAQSection() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>
        {'❓ FAQ — Pertanyaan Umum'}
      </Text>

      <SectionList
        sections={faqSections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FAQItem item={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {String(section.title)}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
        stickySectionHeadersEnabled
        scrollEnabled={false}
      />
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
    marginBottom: 12,
  },
  sectionHeader: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#0A2540',
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0A2540',
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0A2540',
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 11,
    color: '#5A7184',
    marginTop: 3,
    transform: [{ rotate: '0deg' }],
  },
  arrowOpen: {
    transform: [{ rotate: '180deg' }],
    color: '#00C8A0',
  },
  answerBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFF6FF',
  },
  answerText: {
    fontSize: 12,
    color: '#5A7184',
    lineHeight: 19,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginHorizontal: 16,
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: '#F0F4F8',
  },
});