import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsPermissionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="notifications" size={48} color="#F5C518" />
      </View>
      <Text style={styles.headline}>Turn On Notifications</Text>
      <Text style={styles.sub}>
        Get notified when events start near you, when friends RSVP, and when your crew is heading out.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.btnText}>Turn On Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.skipText}>Maybe Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(245,197,24,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  sub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  skipBtn: {
    padding: 12,
  },
  skipText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
  },
});
