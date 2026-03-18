import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const EVENT_PHOTOS = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300',
  'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=300',
  'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300',
];

export default function FriendProfileScreen() {
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
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile info */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/200?img=5' }}
            style={styles.avatar}
            contentFit="cover"
          />
          <Text style={styles.name}>Mike Johnson</Text>
          <Text style={styles.username}>@mikej</Text>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Attended</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Hosted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Mutual</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.inviteBtn} onPress={() => router.push('/event-details')}>
              <Text style={styles.inviteBtnText}>Invite to Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageBtn}>
              <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Events grid */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>Events</Text>
          <View style={styles.grid}>
            {EVENT_PHOTOS.map((uri, i) => (
              <TouchableOpacity key={i} onPress={() => router.push('/event-details')}>
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
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#F5C518',
    marginBottom: 16,
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
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  inviteBtn: {
    height: 44,
    paddingHorizontal: 28,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  messageBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
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
