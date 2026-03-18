import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView } from 'react-native';

const MEMORIES = [
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
  'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400',
  'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
];

export default function EventMemoriesScreen() {
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
        <Text style={styles.headerTitle}>Memories</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Event info */}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>Diana's Birthday Bash</Text>
        <Text style={styles.eventDate}>June 21, 2023 · {MEMORIES.length} captures</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.grid}>
          {MEMORIES.map((uri, i) => (
            <TouchableOpacity key={i} activeOpacity={0.85}>
              <Image
                source={{ uri }}
                style={{ width: photoSize, height: photoSize, borderRadius: 4 }}
                contentFit="cover"
              />
            </TouchableOpacity>
          ))}
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
  eventInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  eventTitle: {
    color: '#F5C518',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  eventDate: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
});
