import { Image } from 'expo-image';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const MAX_CONTENT_WIDTH = 960;
const COLUMN_BREAKPOINT = 600;
const GUTTER = 16;
const CARD_GAP = 12;

const NEARBY_EVENTS = [
  {
    id: '1',
    title: 'Thirsty Thursdays',
    description:
      'Join us every Thursday for "Thirsty Thursdays" and quench your thirst with our unbeatable drink specials!',
    imageMain: 'https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80',
    imageSecondary: 'https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=300&q=80',
  },
];

const NEW_EVENTS = [
  {
    id: '2',
    title: 'House Party Saturdays',
    description:
      'Join us every Saturday night for "House Party Saturdays" and dance the night to the best house music in town!',
    imageMain: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    imageSecondary: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80',
  },
];

const TABS = ['Near Me', 'My Events', 'Friends'] as const;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const isWide = width >= COLUMN_BREAKPOINT;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <View style={[styles.centered, { maxWidth: MAX_CONTENT_WIDTH }]}>
        {/* Header */}
        <View style={[styles.header, isWide && styles.headerWide]}>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://i.pravatar.cc/80?img=12' }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.onlineDot} />
          </TouchableOpacity>

          <Text style={[styles.logo, isWide && styles.logoWide]}>
            Hiddle<Text style={styles.logoDot}>•</Text>
          </Text>

          <TouchableOpacity>
            <Feather name="more-vertical" size={isWide ? 26 : 22} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={[styles.tabRow, isWide && styles.tabRowWide]}>
          {TABS.map((tab, i) => (
            <TouchableOpacity key={tab} style={styles.tab}>
              <Text style={[styles.tabText, isWide && styles.tabTextWide, i === 0 && styles.tabTextActive]}>
                {tab}
              </Text>
              {i === 0 && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.centered, { maxWidth: MAX_CONTENT_WIDTH }]}>
          <Section
            title="Nearby Events"
            events={NEARBY_EVENTS}
            contentWidth={contentWidth}
            isWide={isWide}
          />
          <Section
            title="New Events"
            events={NEW_EVENTS}
            contentWidth={contentWidth}
            isWide={isWide}
          />
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Camera FAB */}
      <View style={[styles.fabContainer, isWide && styles.fabContainerWide]}>
        <View style={styles.fabRing} />
        <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
          <Ionicons name="camera" size={isWide ? 28 : 24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Section({
  title,
  events,
  contentWidth,
  isWide,
}: {
  title: string;
  events: typeof NEARBY_EVENTS;
  contentWidth: number;
  isWide: boolean;
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, isWide && styles.sectionTitleWide]}>{title}</Text>
      <View style={[styles.cardGrid, isWide && styles.cardGridWide]}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            cardWidth={cardWidth(contentWidth, isWide)}
            isWide={isWide}
          />
        ))}
      </View>
    </View>
  );
}

function cardWidth(contentWidth: number, isWide: boolean) {
  const inner = contentWidth - GUTTER * 2;
  if (!isWide) return inner;
  return (inner - CARD_GAP) / 2;
}

function EventCard({
  event,
  cardWidth: width,
  isWide,
}: {
  event: (typeof NEARBY_EVENTS)[0];
  cardWidth: number;
  isWide: boolean;
}) {
  const imageHeight = isWide ? Math.round(width * 0.5) : 180;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, { width }, Platform.select({ web: { boxShadow: '0 4px 16px rgba(0,0,0,0.4)' } }) ?? {}]}
    >
      <View style={[styles.cardImages, { height: imageHeight }]}>
        <Image source={{ uri: event.imageMain }} style={styles.cardImageMain} contentFit="cover" />
        <Image source={{ uri: event.imageSecondary }} style={styles.cardImageSecondary} contentFit="cover" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.cardTitle, isWide && styles.cardTitleWide]}>{event.title}</Text>
        <Text style={[styles.cardDescription, isWide && styles.cardDescriptionWide]} numberOfLines={3}>
          {event.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const colors = {
  navy: '#06093B',
  navyCard: '#0B0E4E',
  yellow: '#F5C518',
  white: '#FFFFFF',
  grey: 'rgba(255,255,255,0.65)',
  fabBlue: '#2563EB',
  fabRing: '#D4A017',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  centered: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: GUTTER,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerWide: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    borderWidth: 1.5,
    borderColor: colors.navy,
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
  },
  logoWide: {
    fontSize: 28,
  },
  logoDot: {
    color: colors.yellow,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 24,
  },
  tabRowWide: {
    gap: 36,
    marginBottom: 16,
  },
  tab: {
    paddingBottom: 6,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: colors.grey,
    fontWeight: '500',
  },
  tabTextWide: {
    fontSize: 16,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: colors.yellow,
    borderRadius: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  section: {
    marginTop: 12,
    marginBottom: 4,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
  },
  sectionTitleWide: {
    fontSize: 22,
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: 'column',
    gap: CARD_GAP,
  },
  cardGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.navyCard,
    marginBottom: 4,
    // native shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImages: {
    flexDirection: 'row',
  },
  cardImageMain: {
    flex: 2,
  },
  cardImageSecondary: {
    flex: 1,
    marginLeft: 2,
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.yellow,
    marginBottom: 4,
  },
  cardTitleWide: {
    fontSize: 18,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 18,
    opacity: 0.9,
  },
  cardDescriptionWide: {
    fontSize: 15,
    lineHeight: 22,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContainerWide: {
    bottom: 36,
    right: 36,
  },
  fabRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: colors.fabRing,
    opacity: 0.7,
  },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.fabBlue,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});
