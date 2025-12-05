import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/newConversationModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};
const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default RootLayout;
