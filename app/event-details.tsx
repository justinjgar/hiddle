import { Image } from 'expo-image';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Switch,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ATTENDEES = [
  'https://i.pravatar.cc/80?img=3',
  'https://i.pravatar.cc/80?img=5',
  'https://i.pravatar.cc/80?img=7',
  'https://i.pravatar.cc/80?img=9',
  'https://i.pravatar.cc/80?img=11',
];

const INFO_ROWS = [
  { icon: 'list', label: "Title: Diana's Birthday Bash" },
  { icon: 'map-pin', label: 'Location: 43.070231, -89.411893' },
  { icon: 'calendar', label: 'Date: 06/21/2023' },
  { icon: 'clock', label: 'Time: 4:30pm CT - 9:30pm CT' },
];

export default function EventDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#06093B" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero image */}
        <View style={styles.heroCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.giftOverlay}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&q=80' }}
              style={styles.giftImage}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Event Info */}
        <Text style={styles.sectionTitle}>Event Information</Text>
        {INFO_ROWS.map((row, i) => (
          <View key={i} style={styles.infoRow}>
            <Feather name={row.icon as any} size={16} color="rgba(255,255,255,0.6)" style={styles.infoIcon} />
            <View style={styles.infoField}>
              <Text style={styles.infoText}>{row.label}</Text>
            </View>
          </View>
        ))}

        {/* Notes */}
        <View style={[styles.infoField, styles.notesField]}>
          <Text style={styles.infoText}>{"Notes: Don't forget!"}</Text>
          <Text style={[styles.infoText, { opacity: 0.8, marginTop: 4 }]}>
            {'"We\'ll have a photo booth set up, so come ready to strike a pose and snap some memories with the birthday girl." + Many more surprises!'}
          </Text>
        </View>

        {/* Make Public */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Make Public</Text>
          <Switch
            trackColor={{ false: '#444', true: '#F5C518' }}
            thumbColor="#fff"
            ios_backgroundColor="#444"
          />
        </View>

        {/* Invite Attendees */}
        <Text style={styles.sectionTitle}>Invite Attendees</Text>
        <View style={styles.attendeesRow}>
          <TouchableOpacity style={styles.addAttendee}>
            <Ionicons name="add" size={22} color="#F5C518" />
          </TouchableOpacity>
          {ATTENDEES.map((uri, i) => (
            <Image key={i} source={{ uri }} style={[styles.attendeeAvatar, { marginLeft: i === 0 ? 0 : -10 }]} contentFit="cover" />
          ))}
        </View>

        <View style={{ height: 32 }} />

        {/* Slide to Send */}
        <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85}>
          <View style={styles.sendSlider}>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </View>
          <Text style={styles.sendText}>Slide to send event</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#06093B' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8 },
  heroCard: { borderRadius: 16, overflow: 'hidden', height: 200, marginBottom: 24, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  giftOverlay: { position: 'absolute', bottom: 16, left: '50%', transform: [{ translateX: -40 }], width: 80, height: 80, borderRadius: 12, overflow: 'hidden' },
  giftImage: { width: '100%', height: '100%' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoIcon: { marginRight: 8 },
  infoField: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  infoText: { color: '#fff', fontSize: 13 },
  notesField: { marginBottom: 20, marginTop: 4 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  toggleLabel: { fontSize: 16, fontWeight: '700', color: '#fff' },
  attendeesRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  addAttendee: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#F5C518', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  attendeeAvatar: { width: 38, height: 38, borderRadius: 19, borderWidth: 2, borderColor: '#06093B' },
  sendBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5C518', borderRadius: 30, paddingVertical: 8, paddingHorizontal: 8, gap: 12 },
  sendSlider: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  sendText: { flex: 1, textAlign: 'center', color: '#06093B', fontWeight: '700', fontSize: 14 },
});
