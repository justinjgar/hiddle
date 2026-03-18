import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const STEPS = ['Basics', 'When', 'Where', 'Invite'];

const CATEGORIES = [
  { label: 'Music', emoji: '🎵' },
  { label: 'Party', emoji: '🎉' },
  { label: 'Sports', emoji: '⚽' },
  { label: 'Food', emoji: '🍔' },
  { label: 'Art', emoji: '🎨' },
  { label: 'Fitness', emoji: '💪' },
  { label: 'Outdoors', emoji: '🏕️' },
  { label: 'Gaming', emoji: '🎮' },
];

export default function CreateEventScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push('/event-details');
  }

  function back() {
    if (step > 0) setStep(step - 1);
    else router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.steps}>
        {STEPS.map((s, i) => (
          <View key={s} style={styles.stepItem}>
            <View style={[styles.stepDot, i <= step && styles.stepDotActive]}>
              {i < step ? (
                <Ionicons name="checkmark" size={12} color="#06093B" />
              ) : (
                <Text style={[styles.stepNum, i === step && styles.stepNumActive]}>
                  {i + 1}
                </Text>
              )}
            </View>
            <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>{s}</Text>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Step 1 — Basics */}
        {step === 0 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What's the event?</Text>

            {/* Cover photo placeholder */}
            <TouchableOpacity style={styles.coverPlaceholder}>
              <Ionicons name="camera-outline" size={32} color="rgba(245,197,24,0.6)" />
              <Text style={styles.coverLabel}>Add Cover Photo</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Event name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={title}
              onChangeText={setTitle}
              maxLength={60}
            />

            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Description (optional)"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.label}
                  style={[styles.catChip, category === cat.label && styles.catChipActive]}
                  onPress={() => setCategory(cat.label)}
                >
                  <Text style={styles.catEmoji}>{cat.emoji}</Text>
                  <Text style={[styles.catLabel, category === cat.label && styles.catLabelActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 2 — When */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>When is it?</Text>

            <Text style={styles.fieldLabel}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / DD / YYYY"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={date}
              onChangeText={setDate}
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Start Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="6:00 PM"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>End Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10:00 PM"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Recurring</Text>
            <View style={styles.recurringRow}>
              {['Off', 'Weekly', 'Bi-weekly', 'Monthly'].map((opt) => (
                <TouchableOpacity key={opt} style={styles.recurringChip}>
                  <Text style={styles.recurringLabel}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 3 — Where */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Where is it?</Text>

            <Text style={styles.fieldLabel}>Venue Name (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Venue or address"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={location}
              onChangeText={setLocation}
            />

            <TouchableOpacity style={styles.locationBtn}>
              <Ionicons name="locate-outline" size={18} color="#F5C518" />
              <Text style={styles.locationBtnText}>Use My Current Location</Text>
            </TouchableOpacity>

            <Text style={styles.fieldLabel}>Discovery Radius</Text>
            {['Nearby (~1mi)', 'Neighborhood (~3mi)', 'City-wide (~10mi)'].map((opt) => (
              <TouchableOpacity key={opt} style={styles.radiusRow}>
                <View style={styles.radioDot} />
                <Text style={styles.radiusLabel}>{opt}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Private Event</Text>
              <Switch
                value={!isPublic}
                onValueChange={(v) => setIsPublic(!v)}
                trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#F5C518' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        )}

        {/* Step 4 — Invite */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Almost there!</Text>

            <Text style={styles.fieldLabel}>Max Attendees</Text>
            <View style={styles.attendeeRow}>
              <TouchableOpacity style={styles.attendeeChip}>
                <Text style={styles.attendeeLabel}>Unlimited</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Or set a limit"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Make Public</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#F5C518' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Allow guests to bring guests</Text>
              <Switch
                trackColor={{ false: 'rgba(255,255,255,0.15)', true: '#F5C518' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <Text style={styles.fieldLabel}>Invite Friends</Text>
            <TouchableOpacity style={styles.inviteFriendsBtn} onPress={() => router.push('/add-friends')}>
              <Ionicons name="person-add-outline" size={18} color="#F5C518" />
              <Text style={styles.inviteFriendsBtnText}>Select Friends</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={next}>
          <Text style={styles.nextBtnText}>
            {step < STEPS.length - 1 ? 'Continue' : 'Create Event'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: '#F5C518',
  },
  stepNum: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '700',
  },
  stepNumActive: {
    color: '#06093B',
  },
  stepLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
  },
  stepLabelActive: {
    color: '#F5C518',
    fontWeight: '600',
  },
  scroll: {
    paddingBottom: 20,
  },
  stepContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  coverPlaceholder: {
    height: 140,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(245,197,24,0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  coverLabel: {
    color: 'rgba(245,197,24,0.6)',
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 12,
  },
  textarea: {
    height: 100,
    paddingTop: 14,
  },
  fieldLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0B0E4E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  catChipActive: {
    borderColor: '#F5C518',
    backgroundColor: 'rgba(245,197,24,0.1)',
  },
  catEmoji: {
    fontSize: 14,
  },
  catLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  catLabelActive: {
    color: '#F5C518',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  recurringRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  recurringChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0B0E4E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  recurringLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  locationBtnText: {
    color: '#F5C518',
    fontSize: 14,
    fontWeight: '600',
  },
  radiusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  radiusLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  toggleLabel: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  attendeeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  attendeeChip: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#0B0E4E',
    borderWidth: 1,
    borderColor: '#F5C518',
    justifyContent: 'center',
  },
  attendeeLabel: {
    color: '#F5C518',
    fontSize: 13,
    fontWeight: '600',
  },
  inviteFriendsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    backgroundColor: '#0B0E4E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.3)',
    paddingHorizontal: 16,
  },
  inviteFriendsBtnText: {
    color: '#F5C518',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  nextBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
