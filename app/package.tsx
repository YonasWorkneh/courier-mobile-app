import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PackageItem {
  id: string;
  orderNumber: string;
  status: string;
  date: string;
}

export default function PackageScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<"Send" | "Received">("Send");

  const sendPackages: PackageItem[] = [
    {
      id: "1",
      orderNumber: "Order #AB12345",
      status: "Delivered",
      date: "Sept 30",
    },
    {
      id: "2",
      orderNumber: "Order #AB12346",
      status: "Delivered",
      date: "Oct 2",
    },
    {
      id: "3",
      orderNumber: "Order #AB12347",
      status: "Delivered",
      date: "Oct 5",
    },
  ];

  const receivedPackages: PackageItem[] = [
    {
      id: "4",
      orderNumber: "Order #CD67890",
      status: "Delivered",
      date: "Sept 28",
    },
    {
      id: "5",
      orderNumber: "Order #CD67891",
      status: "In Transit",
      date: "Oct 3",
    },
    {
      id: "6",
      orderNumber: "Order #CD67892",
      status: "Delivered",
      date: "Oct 6",
    },
  ];

  const currentPackages =
    selectedTab === "Send" ? sendPackages : receivedPackages;

  const renderSegmentedControl = () => (
    <View className="flex-row mx-6 mb-6 bg-gray-100 rounded-full p-2">
      <TouchableOpacity
        onPress={() => setSelectedTab("Send")}
        className={`flex-1 py-3 rounded-full ${
          selectedTab === "Send" ? "bg-[#1141AF]" : "bg-transparent"
        }`}
      >
        <Text
          className={`text-center font-medium text-sm ${
            selectedTab === "Send" ? "text-white" : "text-[#1141AF]"
          }`}
        >
          Send
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedTab("Received")}
        className={`flex-1 py-3 rounded-full ${
          selectedTab === "Received" ? "bg-[#1141AF]" : "bg-transparent"
        }`}
      >
        <Text
          className={`text-center font-medium text-sm ${
            selectedTab === "Received" ? "text-white" : "text-[#1141AF]"
          }`}
        >
          Received
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPackageItem = ({ item }: { item: PackageItem }) => (
    <TouchableOpacity
      onPress={() => {
        // Navigate to package details
        console.log(`Package ${item.orderNumber} pressed`);
      }}
      className="bg-white rounded-xl p-4 mb-3 mx-6 border border-gray-200 flex-row items-center"
    >
      {/* Left Icon */}
      <View className="w-12 h-12 rounded-full items-center justify-center mr-4">
        <FontAwesome6 name="clock-rotate-left" size={20} color="#1141af" />
      </View>

      {/* Middle Content */}
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-base mb-1">
          Order {item.orderNumber}
        </Text>
        <Text className="text-gray-500 text-sm">
          {item.status} • {item.date}
        </Text>
      </View>

      {/* Right Arrow */}
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="px-6 py-4 bg-white"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-2xl font-bold">Package</Text>
          <TouchableOpacity className="p-[8px] border border-gray-200 rounded-full">
            <Feather name="search" size={20} color="#1141af" />
          </TouchableOpacity>
        </View>

        {/* Segmented Control */}
        {renderSegmentedControl()}
      </View>

      {/* Package List */}
      <FlatList
        data={currentPackages}
        renderItem={renderPackageItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: insets.bottom + 100,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="cube-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4">
              No {selectedTab.toLowerCase()} packages
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Your {selectedTab.toLowerCase()} packages will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}
