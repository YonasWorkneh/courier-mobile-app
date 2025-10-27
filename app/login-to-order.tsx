import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginToOrderScreen() {
  const insets = useSafeAreaInsets();

  const handleSignIn = () => {
    router.push("/(auth)/signin");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={handleGoBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-2xl font-bold">Login Required</Text>
          <View className="w-8" />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Main Illustration */}
        <View className="items-center mb-8">
          <View className="w-48 h-48 bg-blue-50 rounded-full items-center justify-center mb-6">
            <Ionicons name="lock-closed" size={80} color="#1141AF" />
          </View>

          <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
            Login to Place Order
          </Text>

          <Text className="text-lg text-gray-600 text-center leading-6 px-4">
            You need to be signed in to place an order. Create an account or
            sign in to continue.
          </Text>
        </View>

        {/* Benefits Section */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-8">
          <Text className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Why Sign Up?
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-gray-700 flex-1">
                Place your orders faster and easier
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-gray-700 flex-1">
                Track your orders in real-time
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-gray-700 flex-1">
                Save your addresses for faster checkout
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="checkmark" size={16} color="#10B981" />
              </View>
              <Text className="text-gray-700 flex-1">
                Access your order history and receipts
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex gap-4">
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-[#1141AF] rounded-2xl py-4"
          >
            <Text className="text-white font-bold text-lg text-center">
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignIn}
            className="border-2 border-[#1141AF] rounded-2xl py-4"
          >
            <Text className="text-[#1141AF] font-bold text-lg text-center">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View className="mt-8 p-4 bg-blue-50 rounded-xl">
          <Text className="text-blue-800 text-center text-sm">
            <Ionicons name="information-circle" size={16} color="#1E40AF" />{" "}
            Don&apos;t worry, creating an account is quick and free!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
