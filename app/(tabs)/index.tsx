import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to register screen
    router.push("/(auth)/signup");
  };
  return (
    <SafeAreaView className="bg-[#1141AF]">
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "light-content"}
      />

      {/* Header with Blue Background */}
      <View className="bg-[#1141AF] px-6 pt-4 pb-8 mb-10">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold">Welcome</Text>
            <Text className="text-white/80 text-base mt-1">
              Sign Up to unlock full features.
            </Text>
            <TouchableOpacity
              className="bg-white rounded-xl py-2 px-4 mt-3 w-24"
              onPress={handleSignUp}
            >
              <Text className="text-[#1141AF] font-semibold text-sm text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="p-2">
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Ionicons name="person-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="h-full bg-gray-50 rounded-t-[2rem] mt-[-20px]"
        showsVerticalScrollIndicator={false}
      >
        {/* Promotional Card */}
        <View className="mx-6 mt-6">
          <View className="bg-[#1141AF] rounded-2xl p-6 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white text-2xl font-bold mb-4">
                Order more you get more points
              </Text>
              <TouchableOpacity className="bg-white rounded-xl py-3 px-2 !w-[120px]">
                <Text className="text-[#1141AF] font-semibold text-center">
                  Order Now
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-24 h-24  rounded-full items-center justify-center">
              <Image
                source={require("../../assets/images/order-bg.png")}
                className="w-full h-full rounded-full"
                contentFit="cover"
                style={{ width: 150, height: 140 }}
              />
            </View>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View className="mx-6 mt-6">
          <View className="flex flex-row justify-between">
            <TouchableOpacity className="border border-gray-200 rounded-2xl p-3 py-3 mr-2 h-[100px] flex-1 items-center">
              <View className="size-12 bg-red-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="heart" size={24} color="#EF4444" />
              </View>
              <Text className="text-gray-800 font-semibold text-center text-sm w-[100px]">
                Save Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-200 rounded-2xl p-3 py-3 mr-2 h-[100px] flex-1 items-center">
              <View className="size-12 bg-blue-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="location" size={24} color="#1141AF" />
              </View>
              <Text className="text-gray-800 font-semibold text-center text-sm w-[100px]">
                Track Parcel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-200 rounded-2xl p-3 py-3 mr-2 h-[100px] flex-1 items-center">
              <View className="size-12 bg-green-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="list" size={24} color="#10B981" />
              </View>
              <Text className="text-gray-800 font-semibold text-center text-sm w-[100px]">
                My Orders
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ongoing Deliveries */}
        <View className="mx-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-black text-xl font-bold">
              Ongoing Deliveries
            </Text>
            <TouchableOpacity>
              <Text className="text-[#1141AF] font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <Text className="text-black font-bold text-lg mb-1">
              Order #AB12345
            </Text>
            <Text className="text-gray-500 text-sm mb-4">
              Delivered • Sept 30
            </Text>

            {/* Progress Bar */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="w-6 h-6 bg-[#1141AF] rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <View className="flex-1 h-[1px] bg-[#1141AF] mx-2" />
              <View className="w-6 h-6 bg-[#1141AF] rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <View className="flex-1 h-[1px] bg-[#1141AF] mx-2" />
              <View className="w-6 h-6 bg-[#1141AF] rounded-full items-center justify-center">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <View className="flex-1 border-t border-dashed border-gray-200 mx-2" />
              <View className="w-6 h-6 border-[1px] border-gray-300 rounded-full items-center justify-center" />
              <View className="flex-1 border-t border-dashed border-gray-200 mx-2" />
              <View className="w-6 h-6 rounded-full items-center justify-center">
                <Ionicons name="location" size={20} color="gray" />
              </View>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">From Piassa</Text>
              <Text className="text-gray-600 text-sm">To Bole Medhanilem</Text>
            </View>
          </View>
        </View>

        {/* Recent Orders */}
        <View className="mx-6 mt-8 mb-56">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-black text-xl font-bold">Recent Orders</Text>
            <TouchableOpacity>
              <Text className="text-[#1141AF] font-semibold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
                <FontAwesome6 name="clock-rotate-left" size={16} color="blue" />
              </View>
              <View className="flex-1">
                <Text className="text-black font-bold text-lg">
                  Order #AB12345
                </Text>
                <Text className="text-gray-500 text-sm">
                  Delivered • Sept 30
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
