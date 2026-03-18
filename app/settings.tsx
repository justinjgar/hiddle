import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

type Row = {
  label: string;
  icon: string;
  route?: string;
  danger?: boolean;
};

const ROWS: Row[] = [
  { label: 'Account', icon: 'person-outline', route: '/edit-profile' },
  { label: 'Notifications', icon: 'notifications-outline', route: '/notification-settings' },
  { label: 'Privacy', icon: 'lock-closed-outline', route: '/privacy-settings' },
  { label: 'Location', icon: 'location-outline' },
  { label: 'Help', icon: 'help-circle-outline' },
  { label: 'About', icon: 'information-circle-outline' },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {ROWS.map((row) => (
          <TouchableOpacity
            key={row.label}
            style={styles.row}
            onPress={() => row.route && router.push(row.route as any)}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={row.icon as any} size={20} color="#F5C518" />
            </View>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
          </TouchableOpacity>
        ))}

        <View style={styles.divider} />

        {/* Log out */}
        <TouchableOpacity style={styles.row} onPress={() => router.replace('/phone-auth')}>
          <View style={styles.iconWrap}>
            <Ionicons name="log-out-outline" size={20} color="rgba(255,255,255,0.5)" />
          </View>
          <Text style={[styles.rowLabel, { color: 'rgba(255,255,255,0.7)' }]}>Log Out</Text>
        </TouchableOpacity>

        {/* Delete account */}
        <TouchableOpacity style={styles.row} onPress={() => router.push('/delete-account')}>
          <View style={styles.iconWrap}>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </View>
          <Text style={[styles.rowLabel, { color: '#EF4444' }]}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    gap: 14,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  divider: {
    height: 24,
  },
});
