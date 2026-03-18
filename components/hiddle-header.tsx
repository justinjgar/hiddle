import { Image } from 'expo-image';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TABS = ['Near Me', 'My Events', 'Friends'] as const;
export type HiddleTab = typeof TABS[number];

const TAB_ROUTES: Record<HiddleTab, string> = {
  'Near Me': '/',
  'My Events': '/my-events',
  'Friends': '/friends',
};

export default function HiddleHeader({ activeTab }: { activeTab: HiddleTab }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarWrap} onPress={() => router.push('/profile')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/80?img=12' }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.onlineDot} />
        </TouchableOpacity>

        <Text style={styles.logo}>Hiddle<Text style={styles.logoDot}>•</Text></Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Ionicons name="search-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Feather name="more-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => router.push(TAB_ROUTES[tab] as any)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              {isActive && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#06093B',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
  },
  avatarWrap: { position: 'relative' },
  avatar: { width: 38, height: 38, borderRadius: 19 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F5C518',
    borderWidth: 1.5,
    borderColor: '#06093B',
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logo: { fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  logoDot: { color: '#F5C518' },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 8,
  },
  tab: { paddingBottom: 6, alignItems: 'center' },
  tabText: { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#F5C518',
    borderRadius: 1,
  },
});
