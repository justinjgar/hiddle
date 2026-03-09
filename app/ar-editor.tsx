import {
  View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

const TOOLS = [
  { icon: 'undo', lib: 'ionicon' },
  { icon: 'layers-outline', lib: 'ionicon' },
  { icon: 'gift-outline', lib: 'ionicon' },
  { icon: 'layers-triple-outline', lib: 'material' },
  { icon: 'checkmark', lib: 'ionicon', active: true },
];

export default function AREditorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Photo background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' }}
        style={styles.background}
        contentFit="cover"
      />

      {/* AR overlay gift */}
      <View style={styles.arOverlay}>
        <View style={styles.giftContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&q=80' }}
            style={styles.giftImage}
            contentFit="cover"
          />
        </View>
      </View>

      {/* Exposure slider */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderTrack}>
          <View style={styles.sliderThumb} />
        </View>
        <TouchableOpacity style={styles.exposureBtn}>
          <Ionicons name="water-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top bar */}
      <SafeAreaView style={styles.topSafe}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="more-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom toolbar */}
      <View style={styles.toolbar}>
        {TOOLS.map((tool, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.toolBtn, tool.active && styles.toolBtnActive]}
            activeOpacity={0.8}
            onPress={tool.active ? () => router.push('/event-details') : undefined}
          >
            {tool.lib === 'material' ? (
              <MaterialCommunityIcons name={tool.icon as any} size={22} color={tool.active ? '#fff' : 'rgba(255,255,255,0.8)'} />
            ) : (
              <Ionicons name={tool.icon as any} size={22} color={tool.active ? '#fff' : 'rgba(255,255,255,0.8)'} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  background: { position: 'absolute', width, height: height * 0.55, top: 0 },
  arOverlay: { position: 'absolute', top: height * 0.15, left: 0, right: 0, alignItems: 'center' },
  giftContainer: { width: 120, height: 120, borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#F5C518' },
  giftImage: { width: '100%', height: '100%' },
  sliderContainer: { position: 'absolute', right: 16, top: height * 0.15, height: height * 0.25, alignItems: 'center', justifyContent: 'space-between' },
  sliderTrack: { flex: 1, width: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 8, alignItems: 'center', justifyContent: 'center' },
  sliderThumb: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#fff' },
  exposureBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  topSafe: { position: 'absolute', top: 0, left: 0, right: 0 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  toolbar: {
    position: 'absolute', bottom: 40, left: 24, right: 24,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(30,30,30,0.85)',
    borderRadius: 40, paddingVertical: 10, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: '#F5C518',
  },
  toolBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  toolBtnActive: { backgroundColor: '#2563EB' },
});
