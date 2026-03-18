import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        {/* Core */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Auth flow */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="phone-auth" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
        <Stack.Screen name="location-permission" options={{ headerShown: false }} />
        <Stack.Screen name="notifications-permission" options={{ headerShown: false }} />

        {/* Events */}
        <Stack.Screen name="event-details" options={{ headerShown: false }} />
        <Stack.Screen name="create-event" options={{ headerShown: false }} />
        <Stack.Screen name="event-memories" options={{ headerShown: false }} />

        {/* Camera & AR */}
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="ar-editor" options={{ headerShown: false }} />

        {/* Social */}
        <Stack.Screen name="friend-profile" options={{ headerShown: false }} />
        <Stack.Screen name="add-friends" options={{ headerShown: false }} />

        {/* Search */}
        <Stack.Screen name="search" options={{ headerShown: false }} />

        {/* Profile & Settings */}
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="notification-settings" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-settings" options={{ headerShown: false }} />
        <Stack.Screen name="delete-account" options={{ headerShown: false }} />

        {/* Legacy */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
