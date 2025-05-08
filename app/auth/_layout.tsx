// app/auth/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="EnterOtp" />
    </Stack>
  );
};

export default AuthLayout;
