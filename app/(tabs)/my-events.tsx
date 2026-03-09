import { Image } from 'expo-image';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HiddleHeader from '@/components/hiddle-header';

const CURRENT_EVENTS = [
  { id: '1', title: 'Record Night', image: 'https://images.unsplash.com/photo-1481276436927-f3058cba60b8?w=400&q=80' },
  { id: '2', title: "Crow's Peak", image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
];

const RECENT_EVENTS = [
  { id: '3', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&q=80' },
  { id: '4', image: 'https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?w=300&q=80' },
  { id: '5', image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=300&q=80' },
  { id: '6', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80' },
  { id: '7', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80' },
  { id: '8', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80' },
];

export default function MyEventsScreen() {
  const { width } = useWindowDimensions();
  const GUTTER = 16;
  const GAP = 8;
  const cols = width > 600 ? 4 : 3;
  const recentCardSize = (Math.min(width, 960) - GUTTER * 2 - GAP * (cols - 1)) / cols;
  const currentCardWidth = (Math.min(width, 960) - GUTTER * 2 - GAP) / 2;
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06093B" />
      <HiddleHeader activeTab="My Events" />

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingHorizontal: GUTTER }]} showsVerticalScrollIndicator={false}>

        {/* My Current Events */}
        <Text style={styles.sectionTitle}>My Current Events</Text>
        <View style={styles.currentGrid}>
          {CURRENT_EVENTS.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.currentCard, { width: currentCardWidth }]}
              activeOpacity={0.85}
              onPress={() => router.push('/event-details')}
            >
              <Image source={{ uri: event.image }} style={styles.currentCardImage} contentFit="cover" />
              <View style={styles.currentCardLabel}>
                <Text style={styles.currentCardTitle} numberOfLines={1}>{event.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Recent Events */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>My Recent Events</Text>
        <View style={[styles.recentGrid, { gap: GAP }]}>
          {RECENT_EVENTS.map((event) => (
            <TouchableOpacity key={event.id} style={{ position: 'relative', width: recentCardSize, height: recentCardSize }} activeOpacity={0.85}>
              <Image source={{ uri: event.image }} style={styles.recentCardImage} contentFit="cover" />
              <View style={styles.recentEyeIcon}>
                <Ionicons name="eye-outline" size={16} color="#F5C518" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
  content: { paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12 },
  currentGrid: { flexDirection: 'row', gap: 8 },
  currentCard: { borderRadius: 12, overflow: 'hidden', height: 160 },
  currentCardImage: { width: '100%', height: '100%' },
  currentCardLabel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(212, 160, 23, 0.85)',
    paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 8, margin: 6,
  },
  currentCardTitle: { color: '#fff', fontWeight: '700', fontSize: 13, textAlign: 'center' },
  recentGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  recentCardImage: { width: '100%', height: '100%', borderRadius: 8 },
  recentEyeIcon: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(6,9,59,0.7)',
    borderRadius: 12, padding: 3,
    borderWidth: 1, borderColor: '#F5C518',
  },
  fabContainer: { position: 'absolute', bottom: 28, right: 20, width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  fabRing: { position: 'absolute', width: 72, height: 72, borderRadius: 36, borderWidth: 2.5, borderColor: '#D4A017', opacity: 0.7 },
  fab: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', elevation: 8 },
});
