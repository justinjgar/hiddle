import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CODE_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(45);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleChange(val: string, index: number) {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-submit on last digit
    if (index === CODE_LENGTH - 1 && digit) {
      const full = [...next].join('');
      if (full.length === CODE_LENGTH) {
        router.push('/profile-setup');
      }
    }
  }

  function handleBackspace(key: string, index: number) {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      const next = [...code];
      next[index - 1] = '';
      setCode(next);
    }
  }

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headline}>Enter the code</Text>
      <Text style={styles.sub}>Sent to +1 (555) 123-4567</Text>

      {/* OTP boxes */}
      <View style={styles.codeRow}>
        {Array(CODE_LENGTH).fill(null).map((_, i) => (
          <TextInput
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            style={[styles.box, code[i] ? styles.boxFilled : null]}
            value={code[i]}
            onChangeText={(v) => handleChange(v, i)}
            onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectionColor="#F5C518"
          />
        ))}
      </View>

      {/* Resend */}
      <TouchableOpacity
        onPress={() => countdown === 0 && setCountdown(45)}
        disabled={countdown > 0}
      >
        <Text style={[styles.resend, countdown > 0 && styles.resendDisabled]}>
          {countdown > 0
            ? `Resend code in 0:${String(countdown).padStart(2, '0')}`
            : 'Resend code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  back: {
    position: 'absolute',
    top: 56,
    left: 16,
    padding: 8,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 40,
  },
  sub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 40,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
    justifyContent: 'center',
  },
  box: {
    width: 48,
    height: 56,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  boxFilled: {
    borderBottomColor: '#F5C518',
  },
  resend: {
    color: '#F5C518',
    fontSize: 13,
    textAlign: 'center',
  },
  resendDisabled: {
    color: 'rgba(255,255,255,0.4)',
  },
});
