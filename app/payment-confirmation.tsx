import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaymentConfirmation } from "../components/place-order/PaymentConfirmation";

export default function PaymentConfirmationScreen() {
  const insets = useSafeAreaInsets();

  const handleTrackOrder = () => {
    router.push("/(tabs)/track");
  };

  const handleBackToHome = () => {
    router.push("/(tabs)");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-3xl font-bold">
            Payment Complete
          </Text>
          <View className="w-8 h-8" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        <PaymentConfirmation />
      </View>

      {/* Fixed Buttons */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex gap-4">
          {/* Track Your Order Button */}
          <TouchableOpacity
            onPress={handleTrackOrder}
            className="bg-[#1141AF] rounded-2xl py-4"
          >
            <Text className="text-white font-bold text-lg text-center">
              Track Your Order
            </Text>
          </TouchableOpacity>

          {/* Back to Home Button */}
          <TouchableOpacity
            onPress={handleBackToHome}
            className="bg-white border-2 border-gray-300 rounded-2xl py-4"
          >
            <Text className="text-[#1141AF] font-bold text-lg text-center">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
