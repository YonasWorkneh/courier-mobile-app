import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderTab() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 items-center justify-center">
        <Ionicons name="list" size={64} color="#1141AF" />
        <Text className="text-2xl font-bold text-gray-800 mt-4">Order Tab</Text>
        <Text className="text-gray-500 text-center mt-2 px-8">
          View and manage your orders
        </Text>
      </View>
    </SafeAreaView>
  );
}
