import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';

const STATS = [
  { label: 'Attended', value: '24' },
  { label: 'Hosted', value: '8' },
  { label: 'Friends', value: '61' },
];

const EVENT_PHOTOS = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300',
  'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=300',
  'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300',
];

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const photoSize = (width - 32 - 4) / 3;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Feather name="settings" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          <Text style={styles.name}>Justin Garcia</Text>
          <Text style={styles.username}>@justinjgar</Text>

          {/* Stats */}
          <View style={styles.stats}>
            {STATS.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Edit Profile */}
          <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/edit-profile')}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* My Events grid */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>My Events</Text>
          <View style={styles.grid}>
            {EVENT_PHOTOS.map((uri, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => router.push('/event-details')}
              >
                <Image
                  source={{ uri }}
                  style={{ width: photoSize, height: photoSize, borderRadius: 4 }}
                  contentFit="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  avatarWrap: {
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#F5C518',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    color: '#F5C518',
    fontSize: 14,
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#F5C518',
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  editBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  gridSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
});
