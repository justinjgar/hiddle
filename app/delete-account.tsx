import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [confirm, setConfirm] = useState('');

  const canDelete = confirm === 'DELETE';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="warning" size={48} color="#EF4444" />
        </View>

        <Text style={styles.headline}>Delete your account?</Text>
        <Text style={styles.sub}>
          This will permanently delete your profile, @username, event history, AR captures, and friend list. This cannot be undone.
        </Text>

        <Text style={styles.inputLabel}>Type DELETE to confirm</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          placeholder="DELETE"
          placeholderTextColor="rgba(255,255,255,0.2)"
          autoCapitalize="characters"
        />

        <TouchableOpacity
          style={[styles.deleteBtn, !canDelete && styles.deleteBtnDisabled]}
          onPress={() => canDelete && router.replace('/splash')}
          activeOpacity={canDelete ? 0.8 : 1}
        >
          <Text style={styles.deleteBtnText}>Permanently Delete My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Nevermind, Take Me Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
    paddingHorizontal: 24,
  },
  back: {
    paddingTop: 60,
    paddingBottom: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(239,68,68,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  sub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.4)',
    paddingHorizontal: 16,
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 24,
    textAlign: 'center',
  },
  deleteBtn: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  deleteBtnDisabled: {
    opacity: 0.4,
  },
  deleteBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    height: 52,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#F5C518',
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#F5C518',
    fontSize: 15,
    fontWeight: '600',
  },
});
