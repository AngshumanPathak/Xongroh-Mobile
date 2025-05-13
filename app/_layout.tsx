// app/_layout.tsx
import { Stack } from "expo-router";
import "./globals.css";
import { QueryProvider } from "@/lib/tanstack/QueryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "@/context/AuthContext";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
