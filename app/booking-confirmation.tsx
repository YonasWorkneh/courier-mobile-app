import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookingConfirmation } from "../components/place-order/BookingConfirmation";

export default function BookingConfirmationScreen() {
  const insets = useSafeAreaInsets();

  const handleBackToHome = () => {
    router.push("/(tabs)");
  };

  const handleProceedToCompletion = () => {
    router.push("/payment-confirmation");
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
            Booking Confirmed
          </Text>
          <View className="w-8 h-8" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        <BookingConfirmation />
      </View>

      {/* Fixed Button */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={handleProceedToCompletion}
          className="bg-white border-2 border-[#1141AF] rounded-2xl py-4"
        >
          <Text className="text-[#1141AF] font-bold text-lg text-center">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
