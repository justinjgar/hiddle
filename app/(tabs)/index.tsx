import { Image } from 'expo-image';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  useWindowDimensions, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import HiddleHeader from '@/components/hiddle-header';

const MAX_CONTENT_WIDTH = 960;
const COLUMN_BREAKPOINT = 600;
const GUTTER = 16;
const CARD_GAP = 12;

const NEARBY_EVENTS = [
  {
    id: '1',
    title: 'Thirsty Thursdays',
    description: 'Join us every Thursday for "Thirsty Thursdays" and quench your thirst with our unbeatable drink specials!',
    imageMain: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80',
    imageSecondary: 'https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=300&q=80',
  },
];

const NEW_EVENTS = [
  {
    id: '2',
    title: 'House Party Saturdays',
    description: 'Join us every Saturday night for "House Party Saturdays" and dance the night to the best house music in town!',
    imageMain: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    imageSecondary: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80',
  },
];

export default function NearMeScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const isWide = width >= COLUMN_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06093B" />
      <HiddleHeader activeTab="Near Me" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.centered, { maxWidth: MAX_CONTENT_WIDTH }]}>
          <Section title="Nearby Events" events={NEARBY_EVENTS} contentWidth={contentWidth} isWide={isWide} />
          <Section title="New Events" events={NEW_EVENTS} contentWidth={contentWidth} isWide={isWide} />
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <FAB />
    </SafeAreaView>
  );
}

function Section({ title, events, contentWidth, isWide }: {
  title: string; events: typeof NEARBY_EVENTS; contentWidth: number; isWide: boolean;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, isWide && styles.sectionTitleWide]}>{title}</Text>
      <View style={[styles.cardGrid, isWide && styles.cardGridWide]}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} cardWidth={cardWidth(contentWidth, isWide)} isWide={isWide} />
        ))}
      </View>
    </View>
  );
}

function cardWidth(contentWidth: number, isWide: boolean) {
  const inner = contentWidth - GUTTER * 2;
  return isWide ? (inner - CARD_GAP) / 2 : inner;
}

function EventCard({ event, cardWidth: cw, isWide }: { event: typeof NEARBY_EVENTS[0]; cardWidth: number; isWide: boolean }) {
  const imageHeight = isWide ? Math.round(cw * 0.5) : 180;
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.card, { width: cw },
      Platform.select({ web: { boxShadow: '0 4px 16px rgba(0,0,0,0.4)' } }) ?? {}]}>
      <View style={[styles.cardImages, { height: imageHeight }]}>
        <Image source={{ uri: event.imageMain }} style={styles.cardImageMain} contentFit="cover" />
        <Image source={{ uri: event.imageSecondary }} style={styles.cardImageSecondary} contentFit="cover" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.cardTitle, isWide && styles.cardTitleWide]}>{event.title}</Text>
        <Text style={[styles.cardDescription, isWide && styles.cardDescWide]} numberOfLines={3}>{event.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

function FAB() {
  const router = useRouter();
  return (
    <View style={styles.fabContainer}>
      <View style={styles.fabRing} />
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => router.push('/camera')}>
        <Ionicons name="camera" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#06093B' },
  centered: { width: '100%', alignSelf: 'center', paddingHorizontal: GUTTER },
  scroll: { flex: 1 },
  scrollContent: { alignItems: 'center' },
  section: { marginTop: 12, marginBottom: 4, width: '100%' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 12 },
  sectionTitleWide: { fontSize: 22, marginBottom: 16 },
  cardGrid: { flexDirection: 'column', gap: CARD_GAP },
  cardGridWide: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#0B0E4E', marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 8 },
  cardImages: { flexDirection: 'row' },
  cardImageMain: { flex: 2 },
  cardImageSecondary: { flex: 1, marginLeft: 2 },
  cardInfo: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#F5C518', marginBottom: 4 },
  cardTitleWide: { fontSize: 18 },
  cardDescription: { fontSize: 13, color: '#fff', lineHeight: 18, opacity: 0.9 },
  cardDescWide: { fontSize: 15, lineHeight: 22 },
  fabContainer: { position: 'absolute', bottom: 28, right: 20, width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  fabRing: { position: 'absolute', width: 72, height: 72, borderRadius: 36, borderWidth: 2.5, borderColor: '#D4A017', opacity: 0.7 },
  fab: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', elevation: 8 },
});
