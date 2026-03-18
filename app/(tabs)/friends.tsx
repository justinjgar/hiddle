import { Image } from 'expo-image';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HiddleHeader from '@/components/hiddle-header';

const FRIENDS = [
  { id: '1', name: 'Mike', avatar: 'https://i.pravatar.cc/80?img=3' },
  { id: '2', name: 'Chris', avatar: 'https://i.pravatar.cc/80?img=5' },
  { id: '3', name: 'Connor', avatar: 'https://i.pravatar.cc/80?img=7' },
  { id: '4', name: 'Hannah', avatar: 'https://i.pravatar.cc/80?img=9' },
  { id: '5', name: 'Sara', avatar: 'https://i.pravatar.cc/80?img=11' },
];

const FEED_EVENTS = [
  {
    id: '1',
    imageMain: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
    imageSecondary: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80',
    title: 'Night at the Museum',
    description: 'Friends night out at the contemporary art museum with live music and cocktails.',
  },
];

export default function FriendsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06093B" />
      <HiddleHeader activeTab="Friends" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Location Map */}
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.mapCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80' }}
            style={styles.map}
            contentFit="cover"
            // Fallback map placeholder
          />
          <View style={styles.mapOverlay}>
            <View style={styles.mapPin}>
              <Ionicons name="location" size={20} color="#F5C518" />
            </View>
            <Text style={styles.mapLabel}>Nicollet Island</Text>
          </View>
        </View>

        {/* My Friends */}
        <View style={styles.friendsHeader}>
          <Text style={styles.sectionTitle}>My Friends</Text>
          <TouchableOpacity onPress={() => router.push('/add-friends')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendsScroll}>
          {FRIENDS.map((friend) => (
            <TouchableOpacity key={friend.id} style={styles.friendItem} activeOpacity={0.8} onPress={() => router.push('/friend-profile')}>
              <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} contentFit="cover" />
              <Text style={styles.friendName}>{friend.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Friends Feed */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Friends New Feed</Text>
        {FEED_EVENTS.map((event) => (
          <TouchableOpacity key={event.id} style={styles.feedCard} activeOpacity={0.9} onPress={() => router.push('/event-details')}>
            <View style={styles.feedImages}>
              <Image source={{ uri: event.imageMain }} style={styles.feedImageMain} contentFit="cover" />
              <Image source={{ uri: event.imageSecondary }} style={styles.feedImageSecondary} contentFit="cover" />
            </View>
            <View style={styles.feedInfo}>
              <Text style={styles.feedTitle}>{event.title}</Text>
              <Text style={styles.feedDesc} numberOfLines={2}>{event.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <View style={styles.fabContainer}>
        <View style={styles.fabRing} />
        <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => router.push('/camera')}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#06093B' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12 },
  mapCard: { borderRadius: 12, overflow: 'hidden', height: 160, marginBottom: 24, backgroundColor: '#0B0E4E' },
  map: { width: '100%', height: '100%' },
  mapOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(6,9,59,0.5)' },
  mapPin: {},
  mapLabel: { color: '#fff', fontWeight: '600', fontSize: 13 },
  friendsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  seeAll: { color: '#F5C518', fontWeight: '600', fontSize: 13 },
  friendsScroll: { marginBottom: 24 },
  friendItem: { alignItems: 'center', marginRight: 16 },
  friendAvatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#F5C518' },
  friendName: { color: '#fff', fontSize: 12, marginTop: 4, fontWeight: '500' },
  feedCard: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#0B0E4E', marginBottom: 16 },
  feedImages: { flexDirection: 'row', height: 180 },
  feedImageMain: { flex: 2 },
  feedImageSecondary: { flex: 1, marginLeft: 2 },
  feedInfo: { padding: 12 },
  feedTitle: { fontSize: 16, fontWeight: '700', color: '#F5C518', marginBottom: 4 },
  feedDesc: { fontSize: 13, color: '#fff', lineHeight: 18, opacity: 0.9 },
  fabContainer: { position: 'absolute', bottom: 28, right: 20, width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  fabRing: { position: 'absolute', width: 72, height: 72, borderRadius: 36, borderWidth: 2.5, borderColor: '#D4A017', opacity: 0.7 },
  fab: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', elevation: 8 },
});
