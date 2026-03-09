import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hiddle<Text style={styles.dot}>•</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#06093B', alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 42, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  dot: { color: '#F5C518' },
});
