import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INTERESTS = [
  'Music', 'Sports', 'Food & Drink', 'Art', 'Fitness',
  'Nightlife', 'Outdoors', 'Gaming', 'Culture', 'Comedy',
];

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  function toggleInterest(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  const isValid = firstName.trim() && username.trim();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.headline}>Set up your profile</Text>

        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="camera" size={28} color="rgba(255,255,255,0.5)" />
          </View>
          <Text style={styles.avatarLabel}>Add photo</Text>
        </View>

        {/* Name row */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="First name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Username */}
        <View style={styles.usernameRow}>
          <Text style={styles.at}>@</Text>
          <TextInput
            style={styles.usernameInput}
            placeholder="username"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={username}
            onChangeText={(t) => setUsername(t.toLowerCase().replace(/\s/g, ''))}
            autoCapitalize="none"
          />
        </View>

        {/* Interests */}
        <Text style={styles.sectionLabel}>What are you into? (optional)</Text>
        <View style={styles.chips}>
          {INTERESTS.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, selected.includes(item) && styles.chipActive]}
              onPress={() => toggleInterest(item)}
            >
              <Text style={[styles.chipText, selected.includes(item) && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={() => isValid && router.replace('/location-permission')}
          activeOpacity={isValid ? 0.8 : 1}
        >
          <Text style={styles.btnText}>Let's Go</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
  },
  back: {
    position: 'absolute',
    top: 56,
    left: 16,
    padding: 8,
    zIndex: 10,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 48,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0B0E4E',
    borderWidth: 2,
    borderColor: '#F5C518',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarLabel: {
    color: '#F5C518',
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  input: {
    height: 52,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 15,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    marginBottom: 32,
    height: 52,
    paddingHorizontal: 16,
  },
  at: {
    color: '#F5C518',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 4,
  },
  usernameInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 40,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0B0E4E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipActive: {
    backgroundColor: 'rgba(245,197,24,0.15)',
    borderColor: '#F5C518',
  },
  chipText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#F5C518',
    fontWeight: '600',
  },
  btn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
