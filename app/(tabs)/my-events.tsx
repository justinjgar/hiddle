import { Image } from 'expo-image';
import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HiddleHeader from '@/components/hiddle-header';

type Tab = 'Going' | 'Hosting' | 'Past';

const GOING_EVENTS = [
  {
    id: '1',
    title: 'Thirsty Thursdays',
    date: 'Thu, Mar 20 · 8pm',
    location: 'The Pourhouse',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
    rsvpCount: 42,
  },
  {
    id: '2',
    title: 'House Party Saturdays',
    date: 'Sat, Mar 22 · 9pm',
    location: 'Wicker Park',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80',
    rsvpCount: 18,
  },
];

const HOSTING_EVENTS = [
  { id: '3', title: 'Record Night', image: 'https://images.unsplash.com/photo-1481276436927-f3058cba60b8?w=400&q=80', rsvpCount: 12 },
  { id: '4', title: "Crow's Peak", image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', rsvpCount: 7 },
];

const PAST_EVENTS = [
  { id: '5', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&q=80' },
  { id: '6', image: 'https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?w=300&q=80' },
  { id: '7', image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=300&q=80' },
  { id: '8', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80' },
  { id: '9', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80' },
  { id: '10', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80' },
];

export default function MyEventsScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Going');

  const GUTTER = 16;
  const GAP = 8;
  const cols = width > 600 ? 4 : 3;
  const pastCardSize = (Math.min(width, 960) - GUTTER * 2 - GAP * (cols - 1)) / cols;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06093B" />
      <HiddleHeader activeTab="My Events" />

      {/* Sub-tabs: Going / Hosting / Past */}
      <View style={styles.subTabs}>
        {(['Going', 'Hosting', 'Past'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.subTab}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.subTabText, activeTab === tab && styles.subTabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.subTabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingHorizontal: GUTTER }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Going tab */}
        {activeTab === 'Going' && (
          <>
            {GOING_EVENTS.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.goingCard}
                onPress={() => router.push('/event-details')}
                activeOpacity={0.85}
              >
                <Image source={{ uri: event.image }} style={styles.goingCardImage} contentFit="cover" />
                <View style={styles.goingCardBody}>
                  <Text style={styles.goingCardTitle} numberOfLines={1}>{event.title}</Text>
                  <View style={styles.goingCardRow}>
                    <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.5)" />
                    <Text style={styles.goingCardMeta}>{event.date}</Text>
                  </View>
                  <View style={styles.goingCardRow}>
                    <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.5)" />
                    <Text style={styles.goingCardMeta}>{event.location}</Text>
                  </View>
                  <View style={styles.goingBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#F5C518" />
                    <Text style={styles.goingBadgeText}>Going</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Hosting tab */}
        {activeTab === 'Hosting' && (
          <>
            <TouchableOpacity
              style={styles.createEventBtn}
              onPress={() => router.push('/create-event')}
            >
              <Ionicons name="add-circle-outline" size={20} color="#F5C518" />
              <Text style={styles.createEventText}>Create New Event</Text>
            </TouchableOpacity>

            {HOSTING_EVENTS.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.hostingCard}
                onPress={() => router.push('/event-details')}
                activeOpacity={0.85}
              >
                <Image source={{ uri: event.image }} style={styles.hostingCardImage} contentFit="cover" />
                <View style={styles.hostingCardBody}>
                  <Text style={styles.hostingCardTitle}>{event.title}</Text>
                  <Text style={styles.hostingCardMeta}>{event.rsvpCount} RSVPs</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Past tab */}
        {activeTab === 'Past' && (
          <>
            <Text style={styles.sectionTitle}>Event History</Text>
            <View style={[styles.pastGrid, { gap: GAP }]}>
              {PAST_EVENTS.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={{ width: pastCardSize, height: pastCardSize, position: 'relative' }}
                  onPress={() => router.push('/event-memories')}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: event.image }} style={styles.pastCardImage} contentFit="cover" />
                  <View style={styles.pastEyeIcon}>
                    <Ionicons name="images-outline" size={14} color="#F5C518" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

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
  subTabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    gap: 32,
  },
  subTab: {
    paddingVertical: 12,
    position: 'relative',
  },
  subTabText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
  subTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subTabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#F5C518',
    borderRadius: 1,
  },
  scroll: { flex: 1 },
  content: { paddingTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12 },

  // Going
  goingCard: {
    flexDirection: 'row',
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  goingCardImage: { width: 100, height: 110 },
  goingCardBody: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  goingCardTitle: { color: '#F5C518', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  goingCardRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  goingCardMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  goingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  goingBadgeText: { color: '#F5C518', fontSize: 12, fontWeight: '600' },

  // Hosting
  createEventBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  createEventText: { color: '#F5C518', fontSize: 15, fontWeight: '600' },
  hostingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  hostingCardImage: { width: 56, height: 56, borderRadius: 8 },
  hostingCardBody: { flex: 1 },
  hostingCardTitle: { color: '#F5C518', fontSize: 15, fontWeight: '700', marginBottom: 2 },
  hostingCardMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },

  // Past
  pastGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  pastCardImage: { width: '100%', height: '100%', borderRadius: 8 },
  pastEyeIcon: {
    position: 'absolute', bottom: 6, left: 6,
    backgroundColor: 'rgba(6,9,59,0.7)',
    borderRadius: 12, padding: 3,
    borderWidth: 1, borderColor: '#F5C518',
  },

  // FAB
  fabContainer: { position: 'absolute', bottom: 28, right: 20, width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  fabRing: { position: 'absolute', width: 72, height: 72, borderRadius: 36, borderWidth: 2.5, borderColor: '#D4A017', opacity: 0.7 },
  fab: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', elevation: 8 },
});
