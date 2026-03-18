import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PhoneAuthScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const isValid = phone.replace(/\D/g, '').length === 10;

  function formatPhone(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Logo */}
      <Text style={styles.logo}>
        Hiddle<Text style={styles.dot}>•</Text>
      </Text>

      {/* Headline */}
      <View style={styles.content}>
        <Text style={styles.headline}>What's your number?</Text>
        <Text style={styles.sub}>
          We'll send you a verification code. No spam ever.
        </Text>

        {/* Phone input */}
        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryText}>🇺🇸 +1</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="(555) 000-0000"
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(t) => setPhone(formatPhone(t))}
            maxLength={14}
          />
        </View>

        {/* Send Code */}
        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={() => isValid && router.push('/otp')}
          activeOpacity={isValid ? 0.8 : 1}
        >
          <Text style={styles.btnText}>Send Code</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy note */}
      <Text style={styles.privacy}>
        By continuing you agree to our Terms & Privacy Policy
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06093B',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 60,
  },
  dot: {
    color: '#F5C518',
  },
  content: {
    flex: 1,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  sub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  countryCode: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    justifyContent: 'center',
  },
  countryText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
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
  privacy: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    textAlign: 'center',
  },
});
