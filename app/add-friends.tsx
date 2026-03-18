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

const SUGGESTED = [
  { id: '1', name: 'Alex Chen', username: 'alexc', img: 'https://i.pravatar.cc/80?img=1', mutual: 3 },
  { id: '2', name: 'Jamie Lee', username: 'jamielee', img: 'https://i.pravatar.cc/80?img=2', mutual: 7 },
  { id: '3', name: 'Taylor Kim', username: 'tkim', img: 'https://i.pravatar.cc/80?img=3', mutual: 1 },
  { id: '4', name: 'Riley Park', username: 'rileyp', img: 'https://i.pravatar.cc/80?img=4', mutual: 5 },
];

export default function AddFriendsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [requested, setRequested] = useState<string[]>([]);

  function sendRequest(id: string) {
    setRequested((prev) => [...prev, id]);
  }

  const filtered = SUGGESTED.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Friends</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.4)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or @username"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* QR / Share */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn}>
            <Ionicons name="qr-code-outline" size={22} color="#F5C518" />
            <Text style={styles.quickLabel}>My QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn}>
            <Ionicons name="share-outline" size={22} color="#F5C518" />
            <Text style={styles.quickLabel}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn}>
            <Ionicons name="people-outline" size={22} color="#F5C518" />
            <Text style={styles.quickLabel}>Contacts</Text>
          </TouchableOpacity>
        </View>

        {/* Suggested */}
        <Text style={styles.sectionTitle}>Suggested</Text>
        {filtered.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <Image source={{ uri: user.img }} style={styles.avatar} contentFit="cover" />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userSub}>@{user.username} · {user.mutual} mutual friends</Text>
            </View>
            <TouchableOpacity
              style={[styles.addBtn, requested.includes(user.id) && styles.addBtnSent]}
              onPress={() => sendRequest(user.id)}
            >
              <Text style={[styles.addBtnText, requested.includes(user.id) && styles.addBtnTextSent]}>
                {requested.includes(user.id) ? 'Sent' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  quickBtn: {
    flex: 1,
    height: 72,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.2)',
  },
  quickLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#F5C518',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  userSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  addBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#2563EB',
  },
  addBtnSent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  addBtnTextSent: {
    color: 'rgba(255,255,255,0.5)',
  },
});
