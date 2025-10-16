import { Stack } from "expo-router";
import React from "react";

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="saved" />
    </Stack>
  );
}
