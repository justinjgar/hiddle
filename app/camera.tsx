import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Camera viewfinder background */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' }}
        style={styles.viewfinder}
        contentFit="cover"
      />

      {/* Overlay */}
      <View style={styles.overlay}>

        {/* Top bar */}
        <SafeAreaView>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.topRightBtns}>
              <TouchableOpacity style={styles.iconBtn}>
                <Feather name="zap" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="water-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* Focus reticle */}
        <View style={styles.reticleContainer}>
          <View style={styles.reticle}>
            <View style={[styles.reticleCorner, styles.reticleTL]} />
            <View style={[styles.reticleCorner, styles.reticleTR]} />
            <View style={[styles.reticleCorner, styles.reticleBL]} />
            <View style={[styles.reticleCorner, styles.reticleBR]} />
          </View>
        </View>

        {/* Bottom capture button */}
        <View style={styles.bottomBar}>
          <View style={styles.captureRing}>
            <TouchableOpacity style={styles.captureBtn} activeOpacity={0.8} onPress={() => router.push('/ar-editor')}>
              <Ionicons name="camera" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}

const CORNER = 20;
const BORDER = 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  viewfinder: { position: 'absolute', width, height },
  overlay: { flex: 1, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  topRightBtns: { gap: 10 },
  reticleContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  reticle: { width: 180, height: 180 },
  reticleCorner: { position: 'absolute', width: CORNER, height: CORNER },
  reticleTL: { top: 0, left: 0, borderTopWidth: BORDER, borderLeftWidth: BORDER, borderColor: '#fff' },
  reticleTR: { top: 0, right: 0, borderTopWidth: BORDER, borderRightWidth: BORDER, borderColor: '#fff' },
  reticleBL: { bottom: 0, left: 0, borderBottomWidth: BORDER, borderLeftWidth: BORDER, borderColor: '#fff' },
  reticleBR: { bottom: 0, right: 0, borderBottomWidth: BORDER, borderRightWidth: BORDER, borderColor: '#fff' },
  bottomBar: { paddingBottom: 48, alignItems: 'center' },
  captureRing: { width: 72, height: 72, borderRadius: 36, borderWidth: 2.5, borderColor: '#F5C518', alignItems: 'center', justifyContent: 'center' },
  captureBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
});
