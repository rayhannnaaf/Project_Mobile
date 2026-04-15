import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';

export default function Header() {
  const handleNotification = () => {
    Alert.alert(
      'Notifikasi ',
      'Kamu punya 3 notifikasi baru:\n\n• Klaim #A123 disetujui\n• Premi jatuh tempo 7 hari lagi\n• Promo spesial untukmu!'
    );
  };

  const handleProfile = () => {
    Alert.alert(
      'Profil Saya ',
      'Nama: Rayhan Ainurron \nPaket: Standard\nStatus: Aktif '
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableWithoutFeedback onPress={handleProfile}>
          <View>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
              }}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View style={styles.onlineDot} />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>
            {'Selamat Pagi 👋'}
          </Text>
          <Text style={styles.nameText}>
            {'Rayhan Ainurron'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableWithoutFeedback onPress={handleNotification}>
          <View style={styles.notifBtn}>
            <Text style={styles.notifIcon}>
              {'🔔'}
            </Text>

            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>
                {'3'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0A2540',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00C8A0',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#0A2540',
  },
  greetingBox: {
    gap: 1,
  },
  greetingText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifIcon: {
    fontSize: 18,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    fontSize: 9,
    color: '#FFF',
    fontWeight: '800',
  },
});