import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const RECENT = ['Rooftop parties', 'Jazz nights', 'Art shows', 'Food trucks'];

const TRENDING = [
  { id: '1', title: 'Thirsty Thursdays', location: 'Downtown', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400' },
  { id: '2', title: 'Weekend Market', location: 'Midtown', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400' },
  { id: '3', title: 'Jazz at the Park', location: 'Central Park', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400' },
];

const CATEGORIES = [
  { label: 'Music', emoji: '🎵' },
  { label: 'Sports', emoji: '⚽' },
  { label: 'Food', emoji: '🍔' },
  { label: 'Art', emoji: '🎨' },
  { label: 'Fitness', emoji: '💪' },
  { label: 'Nightlife', emoji: '🌙' },
  { label: 'Outdoors', emoji: '🏕️' },
  { label: 'Gaming', emoji: '🎮' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.4)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, people..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={16} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Recent searches */}
        {query.length === 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent</Text>
              {RECENT.map((item) => (
                <TouchableOpacity key={item} style={styles.recentRow} onPress={() => setQuery(item)}>
                  <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.4)" />
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Browse by Category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity key={cat.label} style={styles.categoryCard}>
                    <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Near You</Text>
              {TRENDING.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventRow}
                  onPress={() => router.push('/event-details')}
                >
                  <Image source={{ uri: event.img }} style={styles.eventThumb} contentFit="cover" />
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Search results */}
        {query.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Results for "{query}"</Text>
            {TRENDING.filter((e) =>
              e.title.toLowerCase().includes(query.toLowerCase())
            ).map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventRow}
                onPress={() => router.push('/event-details')}
              >
                <Image source={{ uri: event.img }} style={styles.eventThumb} contentFit="cover" />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            ))}
            {TRENDING.filter((e) =>
              e.title.toLowerCase().includes(query.toLowerCase())
            ).length === 0 && (
              <Text style={styles.noResults}>No events found for "{query}"</Text>
            )}
          </View>
        )}
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
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.2)',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  recentText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  eventThumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: '#F5C518',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  eventLocation: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  noResults: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 32,
  },
});
